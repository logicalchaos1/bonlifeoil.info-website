// Run: node --test --experimental-strip-types supabase/functions/_shared/*.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { start, reply, fromVoice, parseAnswer, handoffSummary } from "./qualifier.ts";

const form = { business_type: "Restaurante", monthly_volume: "3-5" };

test("full SMS flow for the free sample campaign ends ready for a human", () => {
  let r = start("muestra-freir", "Ana Pérez", form);
  assert.match(r.messages[0], /Hola Ana/);
  r = reply(r.state, "Sí");
  assert.equal(r.state.step, "zone");
  r = reply(r.state, "Naco, Santo Domingo");
  assert.equal(r.state.step, "address");
  r = reply(r.state, "Calle 5 #12, Naco");
  assert.equal(r.state.step, "slot");
  r = reply(r.state, "2");
  assert.equal(r.state.status, "ready");
  assert.equal(r.state.answers.slot, "Mañana en la mañana");
  assert.match(r.messages.at(-1)!, /entrega de muestra gratis/);
  assert.match(handoffSummary(r.state, "+18095550000"), /Coordinar y entregar la muestra/);
});

test("asks the form questions the lead form did not answer", () => {
  let r = start("palma-25l", "Luis", {});
  r = reply(r.state, "si");
  assert.equal(r.state.step, "business_type");
  r = reply(r.state, "hotel");
  assert.equal(r.state.answers.business_type, "Hotel o resort");
});

test("NO ends as not interested and STOP opts out", () => {
  assert.equal(reply(start("palma-25l", "", form).state, "no gracias").state.status, "not_interested");
  assert.equal(reply(start("palma-25l", "", form).state, "STOP").state.status, "opted_out");
});

test("unclear answers retry twice, then hand off to a human", () => {
  let r = reply(start("piloto-hoteles", "", form).state, "si");
  r = reply(r.state, "x");
  r = reply(r.state, "?");
  assert.equal(r.state.status, "texting");
  r = reply(r.state, "hmm");
  assert.equal(r.state.status, "needs_human");
});

test("empty or one-letter replies never match an option", () => {
  assert.equal(parseAnswer("business_type", ""), null);
  assert.equal(parseAnswer("business_type", "r"), null);
  assert.equal(parseAnswer("monthly_volume", "9"), null);
});

test("voice results merge in and mark the lead ready", () => {
  const s = start("palma-25l", "", form).state;
  assert.equal(fromVoice(s, { interested: "si", zone: "Bávaro", slot: "Hoy en la tarde" }).state.status, "ready");
  assert.equal(fromVoice(s, { interested: "no" }).state.status, "not_interested");
  assert.equal(fromVoice(s, { interested: "si" }).state.status, "needs_human");
});
