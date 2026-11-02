// Run: node --test --experimental-strip-types supabase/functions/_shared/*.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { plan, type AdSetInput } from "./optimizer.ts";

const budget = {
  max_total_daily_usd: 10,
  min_adset_daily_usd: 1,
  max_adset_daily_usd: 4,
  scale_step: 0.3,
  learning_hours: 48,
};
const now = new Date("2026-11-10T12:00:00Z");
const old = "2026-11-01T00:00:00Z";
const fresh = "2026-11-09T12:00:00Z";

const adset = (id: string, over: Partial<AdSetInput> = {}): AdSetInput => ({
  id,
  name: id,
  active: true,
  createdAt: old,
  dailyBudgetUsd: 2,
  targetCplUsd: 3,
  lifetime: { spend: 5, leads: 2 },
  recent: { spend: 4, leads: 1 },
  ads: [
    { id: `${id}-a`, name: `${id}-a`, active: true, createdAt: old, lifetime: { spend: 3, leads: 1 } },
    { id: `${id}-b`, name: `${id}-b`, active: true, createdAt: old, lifetime: { spend: 2, leads: 1 } },
  ],
  ...over,
});

const totalAfter = (sets: AdSetInput[], actions: ReturnType<typeof plan>) => {
  const paused = new Set(actions.filter((a) => a.type === "pause_adset").map((a) => a.id));
  return sets
    .filter((s) => s.active && !paused.has(s.id))
    .reduce((sum, s) => {
      const b = actions.find((a) => a.type === "set_budget" && a.id === s.id);
      return sum + (b && b.type === "set_budget" ? b.toUsd : s.dailyBudgetUsd);
    }, 0);
};

test("pauses an ad set that spent 2x target with no leads", () => {
  const sets = [adset("good"), adset("bad", { lifetime: { spend: 7, leads: 0 }, recent: { spend: 6, leads: 0 } })];
  const actions = plan(sets, budget, now);
  assert.ok(actions.some((a) => a.type === "pause_adset" && a.id === "bad"));
  assert.ok(!actions.some((a) => a.type === "pause_adset" && a.id === "good"));
});

test("never pauses the last active ad set", () => {
  const sets = [adset("only", { lifetime: { spend: 20, leads: 0 }, recent: { spend: 6, leads: 0 } })];
  assert.ok(!plan(sets, budget, now).some((a) => a.type === "pause_adset"));
});

test("leaves ad sets alone during learning", () => {
  const sets = [adset("good"), adset("new", { createdAt: fresh, lifetime: { spend: 9, leads: 0 }, recent: { spend: 9, leads: 0 } })];
  assert.equal(plan(sets, budget, now).filter((a) => a.id === "new").length, 0);
});

test("pauses a losing ad but keeps the last ad in an ad set", () => {
  const s = adset("x", {
    ads: [
      { id: "x-a", name: "x-a", active: true, createdAt: old, lifetime: { spend: 8, leads: 0 } },
      { id: "x-b", name: "x-b", active: true, createdAt: old, lifetime: { spend: 9, leads: 0 } },
    ],
  });
  const paused = plan([s, adset("y")], budget, now).filter((a) => a.type === "pause_ad");
  assert.deepEqual(paused.map((a) => a.id), ["x-b"]);
});

test("scales winners up, capped per ad set", () => {
  const sets = [adset("win", { dailyBudgetUsd: 3.5, recent: { spend: 4, leads: 3 } })];
  const b = plan(sets, budget, now).find((a) => a.type === "set_budget");
  assert.ok(b && b.type === "set_budget" && b.toUsd === 4);
});

test("keeps total daily budget at or under the cap", () => {
  const sets = ["a", "b", "c", "d"].map((id) => adset(id, { dailyBudgetUsd: 3, recent: { spend: 4, leads: 4 } }));
  const actions = plan(sets, budget, now);
  assert.ok(totalAfter(sets, actions) <= 10, `total ${totalAfter(sets, actions)}`);
});

test("moves money from a killed ad set to winners without passing the cap", () => {
  const sets = [
    adset("w1", { dailyBudgetUsd: 2, recent: { spend: 4, leads: 3 } }),
    adset("w2", { dailyBudgetUsd: 2, recent: { spend: 4, leads: 3 } }),
    adset("dead", { dailyBudgetUsd: 2, lifetime: { spend: 8, leads: 0 }, recent: { spend: 6, leads: 0 } }),
  ];
  const actions = plan(sets, budget, now);
  assert.ok(actions.some((a) => a.type === "pause_adset" && a.id === "dead"));
  assert.equal(actions.filter((a) => a.type === "set_budget" && a.toUsd > a.fromUsd).length, 2);
  assert.ok(totalAfter(sets, actions) <= 10);
});
