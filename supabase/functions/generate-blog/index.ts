import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get request body or auto-select town/keyword
    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    let { town_id, keyword_id } = body;

    // Auto-select: pick a town that has the fewest blog posts
    if (!town_id) {
      const { data: towns } = await supabase.from("dr_towns").select("id, name, slug, province, is_tourist_zone").order("hotel_count", { ascending: false });
      if (!towns?.length) throw new Error("No towns found");

      // Count posts per town
      const { data: postCounts } = await supabase.from("blog_posts").select("town_id");
      const countMap: Record<string, number> = {};
      postCounts?.forEach((p: any) => { if (p.town_id) countMap[p.town_id] = (countMap[p.town_id] || 0) + 1; });

      // Pick town with fewest posts, prioritizing tourist zones
      const sorted = towns.sort((a: any, b: any) => {
        const aCount = countMap[a.id] || 0;
        const bCount = countMap[b.id] || 0;
        if (aCount !== bCount) return aCount - bCount;
        return (b.is_tourist_zone ? 1 : 0) - (a.is_tourist_zone ? 1 : 0);
      });
      town_id = sorted[0].id;
    }

    // Get town details
    const { data: town } = await supabase.from("dr_towns").select("*").eq("id", town_id).single();
    if (!town) throw new Error("Town not found");

    // Get an unused keyword for this town, or generate a topic
    let keyword = null;
    if (keyword_id) {
      const { data } = await supabase.from("seo_keywords").select("*").eq("id", keyword_id).single();
      keyword = data;
    } else {
      const { data } = await supabase.from("seo_keywords").select("*").eq("town_id", town_id).eq("is_used", false).order("search_volume", { ascending: false }).limit(1);
      keyword = data?.[0] || null;
    }

    const primaryKeyword = keyword?.keyword || `aceite vegetal para hoteles en ${town.name}`;

    // Get existing post titles to avoid duplicates
    const { data: existingPosts } = await supabase.from("blog_posts").select("title").eq("town_id", town_id);
    const existingTitles = existingPosts?.map((p: any) => p.title).join(", ") || "ninguno";

    const systemPrompt = `Eres un experto en SEO y marketing de contenidos para la industria hotelera en República Dominicana. Escribes blogs en español profesional para Bonlife Oil, una empresa que vende aceite vegetal premium de 99.9% pureza para hoteles y restaurantes.

REGLAS:
- Escribe en español dominicano profesional
- El blog debe ser de 1500-2500 palabras
- Incluye datos específicos sobre ${town.name}, ${town.province}
- Menciona hoteles y la industria turística local
- El keyword principal es: "${primaryKeyword}"
- Úsalo naturalmente 3-5 veces en el contenido
- Incluye subtítulos H2 y H3 con keywords relacionados
- Incluye una sección de beneficios de Bonlife Oil
- Menciona: 99.9% pureza, 20% ahorro, entrega en 24 horas, menor absorción
- Incluye un CTA para contactar por WhatsApp: +1 829 987 6764
- NO repitas estos títulos existentes: ${existingTitles}
- Formato: devuelve SOLO un JSON válido`;

    const userPrompt = `Genera un blog post SEO-optimizado sobre aceite de cocina para hoteles en ${town.name}, República Dominicana.

Devuelve EXACTAMENTE este JSON (sin markdown, sin backticks):
{
  "title": "Título SEO optimizado (máx 60 chars)",
  "meta_description": "Meta descripción (máx 155 chars)",
  "excerpt": "Extracto del artículo (2-3 oraciones)",
  "content": "Contenido completo del blog en HTML con h2, h3, p, ul, li tags",
  "secondary_keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"]
}`;

    console.log(`Generating blog for ${town.name} with keyword: ${primaryKeyword}`);

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded, try again later" }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    let rawContent = aiData.choices?.[0]?.message?.content || "";
    
    // Clean up potential markdown wrapping
    rawContent = rawContent.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    
    const blogData = JSON.parse(rawContent);

    // Generate slug
    const slug = blogData.title
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80);

    const wordCount = blogData.content.split(/\s+/).length;

    // Create schema markup
    const schemaMarkup = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blogData.title,
      description: blogData.meta_description,
      author: { "@type": "Organization", name: "Bonlife Oil", url: "https://bonlifeoil.info" },
      publisher: { "@type": "Organization", name: "Bonlife Oil" },
      datePublished: new Date().toISOString(),
      mainEntityOfPage: `https://bonlifeoil.info/blog/${slug}`,
      about: {
        "@type": "Product",
        name: "Aceite Vegetal Bonlife",
        description: "Aceite vegetal premium 99.9% pureza para hoteles y restaurantes",
      },
    };

    // Insert blog post
    const { data: post, error: insertError } = await supabase.from("blog_posts").insert({
      title: blogData.title,
      slug,
      meta_description: blogData.meta_description,
      content: blogData.content,
      excerpt: blogData.excerpt,
      town_id: town.id,
      primary_keyword: primaryKeyword,
      secondary_keywords: blogData.secondary_keywords,
      status: "published",
      published_at: new Date().toISOString(),
      schema_markup: schemaMarkup,
      word_count: wordCount,
    }).select().single();

    if (insertError) throw insertError;

    // Mark keyword as used
    if (keyword) {
      await supabase.from("seo_keywords").update({ is_used: true }).eq("id", keyword.id);
    }

    console.log(`Blog created: ${post.title} (${post.slug})`);

    return new Response(JSON.stringify({ success: true, post }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-blog error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
