// Outbound channels and webhook signature checks shared by the lead functions.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const env = (name: string) => Deno.env.get(name) ?? "";

export const db = () => createClient(env("SUPABASE_URL"), env("SUPABASE_SERVICE_ROLE_KEY"));

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

const enc = new TextEncoder();

const hmac = async (algo: "SHA-1" | "SHA-256", secret: string, data: string) => {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: algo }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(data)));
};
const hex = (b: Uint8Array) => [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
const b64 = (b: Uint8Array) => btoa(String.fromCharCode(...b));

// Constant-time string compare.
export const safeEqual = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

// Meta: X-Hub-Signature-256 = "sha256=" + hex(HMAC-SHA256(app secret, raw body)).
export const verifyMeta = async (raw: string, header: string | null) =>
  !!header && safeEqual(header, `sha256=${hex(await hmac("SHA-256", env("META_APP_SECRET"), raw))}`);

// Twilio: base64(HMAC-SHA1(auth token, public URL + sorted key/value pairs)).
export const verifyTwilio = async (params: URLSearchParams, header: string | null) => {
  if (!header) return false;
  const data = env("SMS_WEBHOOK_URL") + [...params.keys()].sort().map((k) => k + params.get(k)).join("");
  return safeEqual(header, b64(await hmac("SHA-1", env("TWILIO_AUTH_TOKEN"), data)));
};

// ElevenLabs: "t=<unix>,v0=<hex HMAC-SHA256(secret, `${t}.${body}`)>", rejected after 30 minutes.
export const verifyElevenLabs = async (raw: string, header: string | null) => {
  const parts = Object.fromEntries((header ?? "").split(",").map((p) => p.split("=") as [string, string]));
  if (!parts.t || !parts.v0 || Date.now() / 1000 - Number(parts.t) > 1800) return false;
  return safeEqual(parts.v0, hex(await hmac("SHA-256", env("ELEVENLABS_WEBHOOK_SECRET"), `${parts.t}.${raw}`)));
};

// Secrets kept in Supabase Vault, readable only with the service role
// (see public.get_bonlife_secret). Function env vars take precedence.
export const secret = async (name: string, envName?: string) => {
  if (envName && env(envName)) return env(envName);
  const { data, error } = await db().rpc("get_bonlife_secret", { p_name: name });
  if (error) throw new Error(`Vault secret ${name}: ${error.message}`);
  return (data as string | null) ?? "";
};

// Scheduled jobs send the Vault secret bonlife_cron_secret as x-cron-secret.
export const verifyCron = async (req: Request) => {
  const expected = await secret("bonlife_cron_secret", "CRON_SECRET");
  return !!expected && safeEqual(req.headers.get("x-cron-secret") ?? "", expected);
};

// DR numbers come in as 809/829/849 + 7 digits, with or without +1.
export const normalizePhone = (raw: string): string | null => {
  const d = raw.replace(/\D/g, "");
  if (d.length === 10 && /^8[024]9/.test(d)) return `+1${d}`;
  if (d.length === 11 && d.startsWith("1")) return `+${d}`;
  if (raw.trim().startsWith("+") && d.length >= 10) return `+${d}`;
  return null;
};

export const sendSms = async (to: string, body: string) => {
  const sid = env("TWILIO_ACCOUNT_SID");
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${sid}:${env("TWILIO_AUTH_TOKEN")}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ To: to, From: env("TWILIO_FROM_NUMBER"), Body: body }),
  });
  if (!res.ok) throw new Error(`Twilio ${res.status}: ${await res.text()}`);
};

export const logMessages = async (
  supabase: ReturnType<typeof db>,
  qualification_id: string,
  direction: "in" | "out",
  channel: "sms" | "voice",
  bodies: string[],
) => {
  if (bodies.length === 0) return;
  await supabase
    .from("qualification_messages")
    .insert(bodies.map((body) => ({ qualification_id, direction, channel, body })));
};
