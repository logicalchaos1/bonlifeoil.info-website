// SMS qualification flow for Facebook leads. Pure logic: the edge functions
// load and save the state, send the messages, and notify a human when ready.
import config from "./campaigns.json" with { type: "json" };

export type Status = "texting" | "ready" | "not_interested" | "opted_out" | "needs_human";

export type QualState = {
  campaign_key: string;
  name: string;
  status: Status;
  step: string | null;
  answers: Record<string, string>;
  retries: number;
};

export type Result = { messages: string[]; state: QualState };

// Columns of public.lead_qualifications that hold the flow state.
export const toRow = (s: QualState) => ({
  campaign_key: s.campaign_key, name: s.name, status: s.status, step: s.step, answers: s.answers, retries: s.retries,
});
export const fromRow = (r: QualState): QualState => ({
  campaign_key: r.campaign_key, name: r.name ?? "", status: r.status, step: r.step, answers: r.answers ?? {}, retries: r.retries ?? 0,
});

type Question = { label: string; options?: string[]; free_text?: boolean };
type Campaign = (typeof config.campaigns)[number];

const MAX_RETRIES = 2;
const OPT_OUT = /^(stop|alto|baja|cancelar|unsubscribe|no me escriban)\b/;
const YES = /^(s|si|sí|yes|claro|ok|okay|dale|1)\b/;
const NO = /^(no|n|2)\b/;

const norm = (t: string) =>
  t.trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[!¡.?¿,]/g, "");

export const campaignFor = (key: string): Campaign => {
  const c = config.campaigns.find((x) => x.key === key);
  if (!c) throw new Error(`Unknown campaign ${key}`);
  return c;
};

export const goalFor = (c: Campaign) => config.goals[c.goal as keyof typeof config.goals];

const question = (key: string): Question => config.questions[key as keyof typeof config.questions];

const ask = (key: string) => {
  const q = question(key);
  if (!q.options) return q.label;
  return `${q.label}\n${q.options.map((o, i) => `${i + 1}) ${o}`).join("\n")}\nResponda con el número.`;
};

// Questions still unanswered, in order: lead form questions first, then SMS ones.
const pending = (c: Campaign, answers: Record<string, string>) =>
  [...c.form_questions, ...c.sms_questions].filter((k) => !answers[k]);

export const parseAnswer = (key: string, text: string): string | null => {
  const q = question(key);
  const t = norm(text);
  if (q.free_text) return text.trim().length >= 3 ? text.trim().slice(0, 300) : null;
  const n = Number.parseInt(t, 10);
  if (q.options && n >= 1 && n <= q.options.length && /^\d+\b/.test(t)) return q.options[n - 1];
  if (t.length < 2) return null;
  return q.options?.find((o) => norm(o).startsWith(t) || t.startsWith(norm(o).split(/[ /]/)[0])) ?? null;
};

const firstName = (name: string) => name.trim().split(/\s+/)[0] || "";

export function start(campaign_key: string, name: string, formAnswers: Record<string, string>): Result {
  const c = campaignFor(campaign_key);
  const hi = firstName(name) ? `Hola ${firstName(name)}` : "Hola";
  return {
    messages: [
      `${hi}, le escribe Bonlife Oil 👋 Recibimos su solicitud de ${c.product} en Facebook. ` +
        `¿Sigue interesado? Responda SI o NO. (Responda STOP para no recibir más mensajes.)`,
    ],
    state: { campaign_key, name, status: "texting", step: "confirm", answers: { ...formAnswers }, retries: 0 },
  };
}

const next = (c: Campaign, state: QualState, prefix: string[] = []): Result => {
  const left = pending(c, state.answers);
  if (left.length === 0) {
    const slot = state.answers.slot ? ` (${state.answers.slot.toLowerCase()})` : "";
    return {
      messages: [
        ...prefix,
        `¡Perfecto, gracias! Un asesor de Bonlife le contactará${slot} para: ${goalFor(c).label.toLowerCase()}. ` +
          `Si necesita algo antes, escríbanos por WhatsApp: ${config.business.whatsapp}`,
      ],
      state: { ...state, status: "ready", step: null, retries: 0 },
    };
  }
  return { messages: [...prefix, ask(left[0])], state: { ...state, step: left[0], retries: 0 } };
};

export function reply(state: QualState, text: string): Result {
  if (state.status !== "texting") return { messages: [], state };
  const t = norm(text);

  if (OPT_OUT.test(t)) {
    return {
      messages: ["Listo, no le enviaremos más mensajes. Gracias."],
      state: { ...state, status: "opted_out", step: null },
    };
  }

  const c = campaignFor(state.campaign_key);

  if (state.step === "confirm") {
    if (YES.test(t)) return next(c, { ...state, answers: { ...state.answers, interested: "si" } }, ["¡Excelente! 🙌"]);
    if (NO.test(t)) {
      return {
        messages: ["Entendido, gracias por su tiempo. Si más adelante necesita aceite, aquí estamos."],
        state: { ...state, status: "not_interested", step: null, answers: { ...state.answers, interested: "no" } },
      };
    }
  } else if (state.step) {
    const value = parseAnswer(state.step, text);
    if (value) return next(c, { ...state, answers: { ...state.answers, [state.step]: value } });
  }

  if (state.retries + 1 > MAX_RETRIES) {
    return {
      messages: ["Gracias. Un asesor de Bonlife le escribirá en breve para ayudarle."],
      state: { ...state, status: "needs_human", retries: state.retries + 1 },
    };
  }
  const again = state.step === "confirm" ? "Por favor responda SI o NO." : `No le entendí. ${ask(state.step!)}`;
  return { messages: [again], state: { ...state, retries: state.retries + 1 } };
}

// Merge what the voice agent collected on a call into the SMS state.
export function fromVoice(state: QualState, collected: Record<string, string | null | undefined>): Result {
  if (state.status === "opted_out") return { messages: [], state };
  const c = campaignFor(state.campaign_key);
  const answers = { ...state.answers };
  for (const [k, v] of Object.entries(collected)) if (v) answers[k] = String(v).slice(0, 300);

  const interested = norm(answers.interested ?? "");
  if (NO.test(interested)) return { messages: [], state: { ...state, answers, status: "not_interested", step: null } };
  if (!YES.test(interested)) return { messages: [], state: { ...state, answers, status: "needs_human" } };
  const done = pending(c, answers).length === 0;
  return { messages: [], state: { ...state, answers, status: done ? "ready" : "needs_human", step: null } };
}

export function handoffSummary(state: QualState, phone: string): string {
  const c = campaignFor(state.campaign_key);
  const goal = goalFor(c);
  const lines = Object.entries(state.answers).map(([k, v]) => {
    const label = config.questions[k as keyof typeof config.questions]?.label ?? k;
    return `• ${label} ${v}`;
  });
  return [
    `Lead de Facebook: ${state.name || "(sin nombre)"} · ${phone}`,
    `Campaña: ${c.name}`,
    `Estado: ${state.status}`,
    `Objetivo: ${goal.label}`,
    `Siguiente paso: ${goal.handoff}`,
    "",
    ...lines,
  ].join("\n");
}
