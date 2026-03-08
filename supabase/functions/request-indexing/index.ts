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
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get unindexed published posts
    const { data: posts } = await supabase
      .from("blog_posts")
      .select("id, slug, title")
      .eq("status", "published")
      .eq("is_indexed", false)
      .order("created_at", { ascending: true })
      .limit(10);

    if (!posts?.length) {
      return new Response(JSON.stringify({ message: "No posts to index" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const results = [];
    const siteUrl = "https://bonlifeoil.info";

    for (const post of posts) {
      const url = `${siteUrl}/blog/${post.slug}`;

      // Log the indexing request
      const { data: log } = await supabase.from("indexing_log").insert({
        blog_post_id: post.id,
        url,
        status: "submitted",
        response_data: { method: "sitemap_ping", timestamp: new Date().toISOString() },
      }).select().single();

      // Ping Google with sitemap
      try {
        const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(siteUrl + "/sitemap.xml")}`;
        await fetch(pingUrl);
      } catch (e) {
        console.log("Google ping failed (non-critical):", e);
      }

      // Mark as indexed (submitted)
      await supabase.from("blog_posts").update({
        is_indexed: true,
        indexed_at: new Date().toISOString(),
      }).eq("id", post.id);

      results.push({ url, status: "submitted", post_id: post.id });
    }

    console.log(`Submitted ${results.length} URLs for indexing`);

    return new Response(JSON.stringify({ success: true, indexed: results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("request-indexing error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
