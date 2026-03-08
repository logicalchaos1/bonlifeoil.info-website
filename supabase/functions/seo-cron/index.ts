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

    const results: any = { action, timestamp: new Date().toISOString() };

    // Step 1: Generate new blog post
    if (action === "generate_and_index" || action === "generate") {
      console.log("Step 1: Generating new blog post...");
      const genResponse = await fetch(`${supabaseUrl}/functions/v1/generate-blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({}),
      });
      const genResult = await genResponse.json();
      results.blog_generation = genResult;
      console.log("Blog generation result:", genResult.success ? "success" : "failed");
    }

    // Step 2: Request indexing for unindexed posts
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
      console.log("Indexing result:", indexResult);
    }

    // Step 3: Generate new keywords using AI
    if (action === "generate_and_index" || action === "keywords") {
      if (LOVABLE_API_KEY) {
        console.log("Step 3: Generating new keywords...");
        
        // Check how many unused keywords remain
        const { count } = await supabase.from("seo_keywords").select("*", { count: "exact", head: true }).eq("is_used", false);
        
        if ((count || 0) < 10) {
          // Get towns that need more keywords
          const { data: towns } = await supabase.from("dr_towns").select("id, name, slug").limit(5);
          
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
                  content: "Genera keywords SEO en español para aceite de cocina/vegetal para hoteles en República Dominicana. Devuelve SOLO un JSON array.",
                },
                {
                  role: "user",
                  content: `Genera 10 nuevos long-tail keywords SEO sobre aceite vegetal/cocina para hoteles en estas ciudades: ${towns?.map((t: any) => t.name).join(", ")}. 
                  
Formato JSON (sin markdown): [{"keyword": "...", "town_slug": "...", "search_volume": 50}]`,
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
              for (const kw of newKeywords) {
                const town = towns?.find((t: any) => t.slug === kw.town_slug);
                if (town) {
                  await supabase.from("seo_keywords").insert({
                    keyword: kw.keyword,
                    town_id: town.id,
                    search_volume: kw.search_volume || 30,
                  });
                }
              }
              results.new_keywords = newKeywords.length;
            } catch (e) {
              console.error("Failed to parse new keywords:", e);
              results.new_keywords_error = "parse_failed";
            }
          }
        } else {
          results.new_keywords = "sufficient_stock";
        }
      }
    }

    // Step 4: Stats summary
    const { count: totalPosts } = await supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("status", "published");
    const { count: indexedPosts } = await supabase.from("blog_posts").select("*", { count: "exact", head: true }).eq("is_indexed", true);
    const { count: unusedKeywords } = await supabase.from("seo_keywords").select("*", { count: "exact", head: true }).eq("is_used", false);

    results.stats = {
      total_published: totalPosts,
      total_indexed: indexedPosts,
      unused_keywords: unusedKeywords,
    };

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
