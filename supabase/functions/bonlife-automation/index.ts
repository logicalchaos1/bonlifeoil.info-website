// All Bonlife automation behind one edge function (the project is at its
// function limit). The last path segment picks the route:
//   /functions/v1/bonlife-automation/fb-lead     Meta leadgen webhook
//   /functions/v1/bonlife-automation/sms         Twilio inbound SMS webhook
//   /functions/v1/bonlife-automation/voice       ElevenLabs post-call webhook
//   /functions/v1/bonlife-automation/followup    hourly cron: calls and handoffs
//   /functions/v1/bonlife-automation/optimizer   daily cron: Facebook budgets
//   /functions/v1/bonlife-automation/seo-report  weekly cron: Search Console email
import fbLead from "./fb-lead.ts";
import sms from "./sms.ts";
import voice from "./voice.ts";
import followup from "./followup.ts";
import optimizer from "./optimizer.ts";
import seoReport from "./seo-report.ts";

const routes: Record<string, (req: Request) => Promise<Response>> = {
  "fb-lead": fbLead,
  sms,
  voice,
  followup,
  optimizer,
  "seo-report": seoReport,
};

Deno.serve(async (req) => {
  const route = routes[new URL(req.url).pathname.split("/").filter(Boolean).pop() ?? ""];
  if (!route) return new Response("not found", { status: 404 });
  try {
    return await route(req);
  } catch (e) {
    console.error(new URL(req.url).pathname, e);
    return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
});
