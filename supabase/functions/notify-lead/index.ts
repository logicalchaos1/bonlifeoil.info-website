import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const NOTIFY_TO = "jeffrey@apidra-group.com";

interface LeadRecord {
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  business_type: string | null;
  monthly_consumption: string | null;
  message: string | null;
  source: string;
  referral_code: string | null;
  created_at: string;
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

const row = (label: string, value: string | null) =>
  value ? `<tr><td style="padding:4px 12px 4px 0;color:#666;white-space:nowrap;">${label}</td><td style="padding:4px 0;font-weight:600;">${escapeHtml(value)}</td></tr>` : "";

serve(async (req) => {
  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY not configured");

    const payload = await req.json();
    const lead: LeadRecord = payload.record;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:480px;">
        <h2 style="margin:0 0 12px;">Nueva solicitud — Bonlife</h2>
        <table cellpadding="0" cellspacing="0">
          ${row("Nombre", lead.name)}
          ${row("Empresa", lead.company)}
          ${row("Email", lead.email)}
          ${row("Teléfono", lead.phone)}
          ${row("Tipo de negocio", lead.business_type)}
          ${row("Consumo mensual", lead.monthly_consumption)}
          ${row("Origen", lead.source)}
          ${row("Código de referido", lead.referral_code)}
        </table>
        ${lead.message ? `<p style="margin-top:16px;color:#333;"><strong>Mensaje:</strong><br/>${escapeHtml(lead.message)}</p>` : ""}
        <p style="margin-top:20px;color:#999;font-size:12px;">Recibido: ${new Date(lead.created_at).toLocaleString("es-DO", { timeZone: "America/Santo_Domingo" })}</p>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Bonlife Leads <onboarding@resend.dev>",
        to: [NOTIFY_TO],
        subject: `Nueva solicitud de ${lead.name}${lead.company ? ` — ${lead.company}` : ""}`,
        html,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Resend error: ${res.status} ${errText}`);
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("notify-lead error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
