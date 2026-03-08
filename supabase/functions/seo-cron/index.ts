import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const action = body.action || "generate_and_index";
    const batch_size = body.batch_size || 2; // Generate 2 per cycle (5 cycles/day = ~10 attempts, 3-5 successes)

    const results: any = { action, timestamp: new Date().toISOString() };

    // Step 1: Generate batch of blog posts
    if (action === "generate_and_index" || action === "generate") {
      console.log(`Step 1: Generating ${batch_size} blog posts...`);
      const genResponse = await fetch(`${supabaseUrl}/functions/v1/generate-blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ batch_count: batch_size }),
      });
      const genResult = await genResponse.json();
      results.blog_generation = genResult;
      console.log("Blog generation result:", JSON.stringify(genResult.generated?.map((r: any) => r.success ? r.title : r.error)));
    }

    // Step 2: Request indexing for all unindexed posts
    if (action === "generate_and_index" || action === "index") {
      console.log("Step 2: Requesting indexing...");
      const indexResponse = await fetch(`${supabaseUrl}/functions/v1/request-indexing`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
        },
      });
      const indexResult = await indexResponse.json();
      results.indexing = indexResult;
    }

    // Step 3: Auto-generate new keywords when running low
    if ((action === "generate_and_index" || action === "keywords") && LOVABLE_API_KEY) {
      const { count } = await supabase.from("seo_keywords").select("*", { count: "exact", head: true }).eq("is_used", false);
      
      if ((count || 0) < 15) {
        console.log("Step 3: Generating new Spanish keywords...");
        const { data: towns } = await supabase.from("dr_towns").select("id, name, slug").order("hotel_count", { ascending: false }).limit(8);
        
        const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [
              {
                role: "system",
                content: "Eres un experto en SEO para la industria hotelera dominicana. Genera keywords long-tail en ESPAÑOL sobre aceite de cocina/vegetal para hoteles. TODAS las keywords deben estar en español.",
              },
              {
                role: "user",
                content: `Genera 15 keywords SEO long-tail NUEVAS en ESPAÑOL sobre aceite vegetal/cocina para hoteles y restaurantes en estas ciudades dominicanas: ${towns?.map((t: any) => t.name).join(", ")}.

Incluye variaciones como:
- proveedor aceite vegetal [ciudad]
- aceite para freír hoteles [ciudad]  
- distribuidor aceite cocina [ciudad]
- mejor aceite para buffet [ciudad]
- aceite económico restaurantes [ciudad]
- aceite alta pureza hoteles [ciudad]

Formato JSON (sin markdown): [{"keyword": "keyword en español", "town_slug": "slug-ciudad", "search_volume": 50}]`,
              },
            ],
          }),
        });

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          let raw = aiData.choices?.[0]?.message?.content || "[]";
          raw = raw.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
          
          try {
            const newKeywords = JSON.parse(raw);
            let added = 0;
            for (const kw of newKeywords) {
              const town = towns?.find((t: any) => t.slug === kw.town_slug);
              if (town) {
                const { error } = await supabase.from("seo_keywords").insert({
                  keyword: kw.keyword,
                  town_id: town.id,
                  search_volume: kw.search_volume || 30,
                });
                if (!error) added++;
              }
            }
            results.new_keywords = added;
            console.log(`Added ${added} new Spanish keywords`);
          } catch (e) {
            console.error("Failed to parse keywords:", e);
            results.new_keywords_error = "parse_failed";
          }
        }
      } else {
        results.new_keywords = "sufficient_stock";
      }
    }

    // Stats
    const { count: totalPosts } = await supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "published");
    const { count: indexedPosts } = await supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("is_indexed", true);
    const { count: unusedKeywords } = await supabase.from("seo_keywords").select("*", { count: "exact", head: true }).eq("is_used", false);

    results.stats = { total_published: totalPosts, total_indexed: indexedPosts, unused_keywords: unusedKeywords };
    console.log("SEO cron completed:", results.stats);

    return new Response(JSON.stringify({ success: true, ...results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("seo-cron error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
