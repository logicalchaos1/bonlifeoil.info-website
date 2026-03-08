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

    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    let { town_id, keyword_id, batch_count } = body;
    batch_count = Math.min(batch_count || 1, 5); // max 5 per call

    const results = [];

    for (let i = 0; i < batch_count; i++) {
      try {
        const post = await generateSingleBlog(supabase, LOVABLE_API_KEY, town_id, keyword_id);
        results.push({ success: true, title: post.title, slug: post.slug });
        // Small delay between generations to avoid rate limits
        if (i < batch_count - 1) await new Promise(r => setTimeout(r, 3000));
      } catch (e: any) {
        console.error(`Blog ${i + 1} failed:`, e.message);
        results.push({ success: false, error: e.message });
        // If rate limited, stop batch
        if (e.message?.includes("429") || e.message?.includes("rate limit")) break;
      }
    }

    return new Response(JSON.stringify({ success: true, generated: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-blog error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function generateSingleBlog(supabase: any, apiKey: string, forceTownId?: string, forceKeywordId?: string) {
  let town_id = forceTownId;

  // Auto-select town with fewest posts
  if (!town_id) {
    const { data: towns } = await supabase.from("dr_towns").select("id, name, slug, province, is_tourist_zone, hotel_count").order("hotel_count", { ascending: false });
    if (!towns?.length) throw new Error("No towns found");

    const { data: postCounts } = await supabase.from("blog_posts").select("town_id");
    const countMap: Record<string, number> = {};
    postCounts?.forEach((p: any) => { if (p.town_id) countMap[p.town_id] = (countMap[p.town_id] || 0) + 1; });

    const sorted = towns.sort((a: any, b: any) => {
      const aCount = countMap[a.id] || 0;
      const bCount = countMap[b.id] || 0;
      if (aCount !== bCount) return aCount - bCount;
      return (b.is_tourist_zone ? 1 : 0) - (a.is_tourist_zone ? 1 : 0);
    });
    town_id = sorted[0].id;
  }

  const { data: town } = await supabase.from("dr_towns").select("*").eq("id", town_id).single();
  if (!town) throw new Error("Town not found");

  // Get unused keyword
  let keyword = null;
  if (forceKeywordId) {
    const { data } = await supabase.from("seo_keywords").select("*").eq("id", forceKeywordId).single();
    keyword = data;
  } else {
    // Try town-specific first, then any unused keyword
    const { data } = await supabase.from("seo_keywords").select("*").eq("town_id", town_id).eq("is_used", false).order("search_volume", { ascending: false }).limit(1);
    keyword = data?.[0] || null;
    if (!keyword) {
      const { data: anyKw } = await supabase.from("seo_keywords").select("*").eq("is_used", false).order("search_volume", { ascending: false }).limit(1);
      keyword = anyKw?.[0] || null;
    }
  }

  const primaryKeyword = keyword?.keyword || `aceite vegetal para hoteles en ${town.name}`;

  const { data: existingPosts } = await supabase.from("blog_posts").select("title").eq("town_id", town_id);
  const existingTitles = existingPosts?.map((p: any) => p.title).join(", ") || "ninguno";

  // Topics to rotate through for variety
  const topics = [
    `mejores prácticas de aceite de cocina para hoteles en ${town.name}`,
    `cómo ahorrar en aceite vegetal para restaurantes de ${town.name}`,
    `guía de aceite de freír para buffets de hotel en ${town.name}`,
    `aceite vegetal premium vs aceite corriente para hoteles en ${town.name}`,
    `tendencias de cocina hotelera y aceite vegetal en ${town.name}, ${town.province}`,
    `por qué los hoteles de ${town.name} eligen aceite 99.9% pureza`,
    `proveedor de aceite vegetal para la zona turística de ${town.name}`,
    `reducir costos de cocina en hoteles de ${town.name} con Bonlife Oil`,
  ];
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  const systemPrompt = `Eres un experto en SEO y copywriting gastronómico en ESPAÑOL para la industria hotelera de República Dominicana. Trabajas para Bonlife Oil.

INSTRUCCIONES OBLIGATORIAS:
- TODO el contenido DEBE estar en ESPAÑOL. Ni una sola oración en inglés.
- Título en ESPAÑOL
- Meta descripción en ESPAÑOL  
- Contenido en ESPAÑOL
- Keywords secundarias en ESPAÑOL
- Usa español dominicano profesional, natural y fluido
- El blog debe tener entre 1500-2500 palabras
- Incluye datos reales y específicos sobre ${town.name}, provincia ${town.province}
- Menciona hoteles reales de la zona, atractivos turísticos, la gastronomía local
- Keyword principal: "${primaryKeyword}" — úsalo 4-6 veces naturalmente
- Tema sugerido: ${randomTopic}
- Usa subtítulos H2 y H3 con variaciones de keywords en español
- Incluye una sección sobre beneficios de Bonlife Oil:
  • 99.9% pureza certificada
  • 20% ahorro garantizado vs competencia
  • Entrega en 24 horas en toda la zona turística
  • Menor absorción = comida más ligera y saludable
  • Punto de humo más alto = mayor durabilidad
- Incluye CTA final: contactar por WhatsApp +1 829 987 6764 o visitar bonlifeoil.info
- NO repitas estos títulos: ${existingTitles}
- El slug debe ser en español
- Devuelve SOLO JSON válido, sin markdown, sin backticks`;

  const userPrompt = `Escribe un artículo de blog completo en ESPAÑOL sobre: "${randomTopic}"

Ciudad: ${town.name}, ${town.province}, República Dominicana
Keyword SEO principal: "${primaryKeyword}"

Devuelve EXACTAMENTE este formato JSON:
{
  "title": "Título en español SEO-optimizado (máximo 60 caracteres)",
  "meta_description": "Meta descripción en español (máximo 155 caracteres)",
  "excerpt": "Resumen del artículo en español (2-3 oraciones)",
  "content": "Contenido HTML completo en ESPAÑOL con etiquetas h2, h3, p, ul, li, strong",
  "secondary_keywords": ["keyword en español 1", "keyword en español 2", "keyword en español 3", "keyword en español 4", "keyword en español 5"]
}`;

  console.log(`Generating Spanish blog for ${town.name} | keyword: ${primaryKeyword}`);

  const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
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
    throw new Error(`AI gateway error: ${aiResponse.status}`);
  }

  const aiData = await aiResponse.json();
  let rawContent = aiData.choices?.[0]?.message?.content || "";
  rawContent = rawContent.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  
  const blogData = JSON.parse(rawContent);

  // Generate Spanish slug
  const slug = blogData.title
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  const wordCount = blogData.content.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blogData.title,
    description: blogData.meta_description,
    inLanguage: "es",
    author: { "@type": "Organization", name: "Bonlife Oil", url: "https://bonlifeoil.info" },
    publisher: { "@type": "Organization", name: "Bonlife Oil" },
    datePublished: new Date().toISOString(),
    mainEntityOfPage: `https://bonlifeoil.info/blog/${slug}`,
    about: {
      "@type": "Product",
      name: "Aceite Vegetal Bonlife",
      description: "Aceite vegetal premium 99.9% pureza para hoteles y restaurantes en República Dominicana",
    },
    spatialCoverage: {
      "@type": "Place",
      name: `${town.name}, ${town.province}, República Dominicana`,
    },
  };

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

  if (insertError) {
    // If slug conflict, append random suffix
    if (insertError.code === "23505") {
      const newSlug = slug + "-" + Date.now().toString(36);
      const { data: retryPost, error: retryError } = await supabase.from("blog_posts").insert({
        title: blogData.title,
        slug: newSlug,
        meta_description: blogData.meta_description,
        content: blogData.content,
        excerpt: blogData.excerpt,
        town_id: town.id,
        primary_keyword: primaryKeyword,
        secondary_keywords: blogData.secondary_keywords,
        status: "published",
        published_at: new Date().toISOString(),
        schema_markup: { ...schemaMarkup, mainEntityOfPage: `https://bonlifeoil.info/blog/${newSlug}` },
        word_count: wordCount,
      }).select().single();
      if (retryError) throw retryError;
      if (keyword) await supabase.from("seo_keywords").update({ is_used: true }).eq("id", keyword.id);
      console.log(`Blog created (retry slug): ${retryPost.title}`);
      return retryPost;
    }
    throw insertError;
  }

  if (keyword) await supabase.from("seo_keywords").update({ is_used: true }).eq("id", keyword.id);
  console.log(`Blog created: ${post.title} (${post.slug})`);
  return post;
}
