// Twilio inbound SMS webhook: advances the qualification and replies with TwiML.
import { fromRow, reply, toRow } from "../_shared/qualifier.ts";
import { db, logMessages, normalizePhone, notifyHuman, verifyTwilio } from "../_shared/channels.ts";

const xml = (s: string) => s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!));
const twiml = (messages: string[]) =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?><Response>${messages.map((m) => `<Message>${xml(m)}</Message>`).join("")}</Response>`,
    { headers: { "Content-Type": "text/xml" } },
  );

Deno.serve(async (req) => {
  const params = new URLSearchParams(await req.text());
  if (!(await verifyTwilio(params, req.headers.get("x-twilio-signature")))) {
    return new Response("bad signature", { status: 401 });
  }

  const phone = normalizePhone(params.get("From") ?? "");
  const body = (params.get("Body") ?? "").slice(0, 500);
  if (!phone) return twiml([]);

  const supabase = db();
  const { data: row } = await supabase
    .from("lead_qualifications")
    .select("*")
    .eq("phone", phone)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!row) return twiml([]);

  await logMessages(supabase, row.id, "in", "sms", [body]);
  const before = row.status;
  const { messages, state } = reply(fromRow(row), body);

  const now = new Date().toISOString();
  const handedOff = before === "texting" && (state.status === "ready" || state.status === "needs_human");
  await supabase
    .from("lead_qualifications")
    .update({ ...toRow(state), last_inbound_at: now, last_outbound_at: messages.length ? now : row.last_outbound_at, ...(handedOff ? { handed_off_at: now } : {}) })
    .eq("id", row.id);
  await logMessages(supabase, row.id, "out", "sms", messages);
  if (handedOff) await notifyHuman(state, phone);

  return twiml(messages);
});
