// Creates (or updates) the ElevenLabs voice agent that calls Facebook leads who
// did not answer the SMS. Field names match supabase/functions/_shared/campaigns.json.
//
//   ELEVENLABS_API_KEY=... ELEVENLABS_VOICE_ID=... node marketing/voice/agent.mjs
//   ELEVENLABS_AGENT_ID=... (same command) updates the existing agent instead.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const config = JSON.parse(readFileSync(path.join(root, "supabase/functions/_shared/campaigns.json"), "utf8"));
const key = process.env.ELEVENLABS_API_KEY;
const voice = process.env.ELEVENLABS_VOICE_ID;
if (!key || !voice) throw new Error("Set ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID (a Spanish voice from your Voice Library)");

const options = (q) => (q.options ? ` Opciones: ${q.options.join(" / ")}.` : "");
const questionList = Object.entries(config.questions)
  .map(([k, q]) => `- ${k}: "${q.label}"${options(q)}`)
  .join("\n");

const prompt = `Eres Sofía, asistente de ventas de Bonlife Oil, distribuidor de aceite para freír, aceite de palma, manteca y margarina para restaurantes, hoteles y panaderías en República Dominicana. Hablas español dominicano, cálido, profesional y breve.

Llamas a {{customer_name}}, que pidió por Facebook información sobre: {{product}}. El objetivo de esta llamada es: {{goal}}.
Respuestas que ya tenemos del formulario (no las vuelvas a preguntar): {{known_answers}}

Pasos:
1. Preséntate, menciona que llamas por su solicitud en Facebook y confirma si sigue interesado.
2. Si no está interesado, agradece y termina la llamada con cortesía.
3. Si está interesado, pregunta solo lo que falte de esta lista, una pregunta a la vez:
${questionList}
4. Confirma el día y horario en que un asesor le contactará o le visitará, y despídete.

Reglas:
- No inventes precios, descuentos ni fechas de entrega. Precios conocidos: aceite de palma 25L RD$4,600; soya y girasol 25L RD$4,000. Para cualquier otro precio di que el asesor le enviará la cotización.
- No prometas nada que no esté en este guion. Si preguntan algo que no sabes, di que el asesor le responderá.
- Si la persona pide no ser llamada más, confírmalo y termina la llamada.
- Si contesta un buzón de voz, deja un mensaje corto con el WhatsApp ${config.business.whatsapp.replace("https://wa.me/", "+")} y termina.
- Llamadas cortas: menos de 3 minutos.`;

const dataCollection = {
  interested: { type: "string", description: "Responde 'si' si la persona confirmó que sigue interesada, 'no' si dijo que no. Vacío si no se supo." },
  ...Object.fromEntries(
    Object.entries(config.questions).map(([k, q]) => [
      k,
      {
        type: "string",
        description: q.options
          ? `${q.label} Usa exactamente una de: ${q.options.join(" | ")}. Vacío si no respondió.`
          : `${q.label} Texto tal como lo dijo. Vacío si no respondió.`,
      },
    ]),
  ),
};

const body = {
  name: "Bonlife Oil · Calificador de leads",
  conversation_config: {
    agent: {
      language: "es",
      first_message: "Hola {{customer_name}}, le habla Sofía de Bonlife Oil. Le llamo por la solicitud que hizo en Facebook sobre {{product}}. ¿Tiene un minuto?",
      prompt: { prompt },
    },
    tts: { voice_id: voice, model_id: "eleven_flash_v2_5" },
  },
  platform_settings: { data_collection: dataCollection },
};

const agentId = process.env.ELEVENLABS_AGENT_ID;
const res = await fetch(
  agentId ? `https://api.elevenlabs.io/v1/convai/agents/${agentId}` : "https://api.elevenlabs.io/v1/convai/agents/create",
  {
    method: agentId ? "PATCH" : "POST",
    headers: { "xi-api-key": key, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  },
);
const out = await res.json();
if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${JSON.stringify(out)}`);
console.log(agentId ? `Updated agent ${agentId}` : `Created agent ${out.agent_id}. Set it as the ELEVENLABS_AGENT_ID function secret.`);
