// ElevenLabs post-call webhook: stores what the voice agent collected.
import { fromRow, fromVoice, toRow } from "../_shared/qualifier.ts";
import { db, json, logMessages, notifyHuman, verifyElevenLabs } from "../_shared/channels.ts";

Deno.serve(async (req) => {
  const raw = await req.text();
  if (!(await verifyElevenLabs(raw, req.headers.get("elevenlabs-signature")))) return json({ error: "bad signature" }, 401);

  const event = JSON.parse(raw);
  if (event.type !== "post_call_transcription") return json({ ignored: event.type });
  const data = event.data ?? {};
  const id = data.conversation_initiation_client_data?.dynamic_variables?.qualification_id;
  if (!id) return json({ ignored: "no qualification_id" });

  const supabase = db();
  const { data: row } = await supabase.from("lead_qualifications").select("*").eq("id", id).maybeSingle();
  if (!row) return json({ ignored: "unknown qualification" });

  const collected: Record<string, string> = {};
  for (const [k, v] of Object.entries(data.analysis?.data_collection_results ?? {})) {
    const value = (v as { value?: unknown }).value;
    if (value !== null && value !== undefined && value !== "") collected[k] = String(value);
  }
  const transcript = (data.transcript ?? [])
    .map((t: { role: string; message?: string }) => `${t.role === "agent" ? "Agente" : "Cliente"}: ${t.message ?? ""}`)
    .join("\n");
  await logMessages(supabase, row.id, "in", "voice", transcript ? [transcript.slice(0, 8000)] : []);

  const { state } = fromVoice(fromRow(row), collected);
  const handedOff = row.status === "texting" && (state.status === "ready" || state.status === "needs_human");
  await supabase.from("lead_qualifications").update({
    ...toRow(state),
    last_inbound_at: new Date().toISOString(),
    ...(handedOff ? { handed_off_at: new Date().toISOString() } : {}),
  }).eq("id", row.id);
  if (handedOff) await notifyHuman(state, row.phone);

  return json({ ok: true, status: state.status });
});
