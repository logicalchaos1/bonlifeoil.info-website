import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Create a JWT for Google API authentication using service account
async function getGoogleAccessToken(serviceAccountKey: any): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccountKey.client_email,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };

  const encode = (obj: any) =>
    btoa(JSON.stringify(obj)).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const unsignedToken = `${encode(header)}.${encode(payload)}`;

  // Import the private key
  const pemContent = serviceAccountKey.private_key
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s/g, "");

  const binaryKey = Uint8Array.from(atob(pemContent), (c) => c.charCodeAt(0));

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  );

  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const jwt = `${unsignedToken}.${signatureB64}`;

  // Exchange JWT for access token
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenResponse.json();
  if (!tokenResponse.ok) {
    throw new Error(`Google token error: ${JSON.stringify(tokenData)}`);
  }

  return tokenData.access_token;
}

async function requestGoogleIndexing(url: string, accessToken: string): Promise<any> {
  const response = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      url,
      type: "URL_UPDATED",
    }),
  });

  const data = await response.json();
  return { status: response.status, ok: response.ok, data };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse the service account key
    const serviceAccountKeyRaw = Deno.env.get("GOOGLE_SERVICE_ACCOUNT_KEY");
    if (!serviceAccountKeyRaw) {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is not configured");
    }

    const serviceAccountKey = JSON.parse(serviceAccountKeyRaw);
    console.log(`Using service account: ${serviceAccountKey.client_email}`);

    // Get access token
    const accessToken = await getGoogleAccessToken(serviceAccountKey);
    console.log("Google access token obtained successfully");

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

      // Call Google Indexing API
      let indexResult;
      try {
        indexResult = await requestGoogleIndexing(url, accessToken);
        console.log(`Indexed ${url}: status=${indexResult.status}`);
      } catch (e) {
        console.error(`Failed to index ${url}:`, e);
        indexResult = { status: 500, ok: false, data: { error: e instanceof Error ? e.message : "Unknown" } };
      }

      const status = indexResult.ok ? "indexed" : "failed";

      // Log the indexing request
      await supabase.from("indexing_log").insert({
        blog_post_id: post.id,
        url,
        status,
        response_data: {
          method: "google_indexing_api",
          google_response: indexResult.data,
          http_status: indexResult.status,
          timestamp: new Date().toISOString(),
        },
      });

      // Mark as indexed only if successful
      if (indexResult.ok) {
        await supabase.from("blog_posts").update({
          is_indexed: true,
          indexed_at: new Date().toISOString(),
        }).eq("id", post.id);
      }

      results.push({ url, status, post_id: post.id, google_status: indexResult.status });
    }

    // Also ping Google with sitemap for good measure
    try {
      const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(siteUrl + "/sitemap.xml")}`;
      await fetch(pingUrl);
    } catch (e) {
      console.log("Sitemap ping failed (non-critical):", e);
    }

    const indexed = results.filter((r) => r.status === "indexed").length;
    const failed = results.filter((r) => r.status === "failed").length;
    console.log(`Indexing complete: ${indexed} indexed, ${failed} failed out of ${results.length}`);

    return new Response(JSON.stringify({ success: true, indexed: results, summary: { indexed, failed, total: results.length } }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("request-indexing error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
