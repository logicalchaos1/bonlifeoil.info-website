// Emails the team when a Facebook lead is qualified or needs a person.
import { env } from "./channels.ts";
import { handoffSummary, type QualState } from "./qualifier.ts";

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export const notifyHuman = async (state: QualState, phone: string) => {
  const key = env("RESEND_API_KEY");
  if (!key) return;
  const summary = handoffSummary(state, phone);
  const wa = `https://wa.me/${phone.replace(/\D/g, "")}`;
  const subject =
    state.status === "ready"
      ? `✅ Lead listo: ${state.name || phone}`
      : `👤 Lead necesita atención: ${state.name || phone}`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Bonlife Leads <leads@bonlifeoil.info>",
      to: [env("NOTIFY_TO") || "jeffrey@bonlifeoil.info"],
      subject,
      html: `<div style="font-family:Arial,sans-serif;max-width:520px;white-space:pre-line">${escapeHtml(summary)}
<p><a href="${wa}">Abrir WhatsApp</a> · <a href="tel:${phone}">Llamar</a></p></div>`,
    }),
  });
  if (!res.ok) console.error("Resend error", res.status, await res.text());
};
