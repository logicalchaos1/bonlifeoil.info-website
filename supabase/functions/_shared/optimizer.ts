// Budget rules for the Facebook lead campaigns. Pure logic so it can be tested
// without the Meta API: fb-optimizer feeds it insights and applies the actions.

export type Budget = {
  max_total_daily_usd: number;
  min_adset_daily_usd: number;
  max_adset_daily_usd: number;
  scale_step: number;
  learning_hours: number;
};

export type Stats = { spend: number; leads: number };

export type AdInput = {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  lifetime: Stats;
};

export type AdSetInput = {
  id: string;
  name: string;
  active: boolean;
  createdAt: string;
  dailyBudgetUsd: number;
  targetCplUsd: number;
  lifetime: Stats;
  recent: Stats;
  ads: AdInput[];
};

export type Action =
  | { type: "pause_ad"; id: string; name: string; reason: string }
  | { type: "pause_adset"; id: string; name: string; reason: string }
  | { type: "set_budget"; id: string; name: string; fromUsd: number; toUsd: number; reason: string };

const round = (n: number) => Math.round(n * 100) / 100;
const cpl = (s: Stats) => (s.leads > 0 ? s.spend / s.leads : Infinity);
// Worst first: highest cost per lead, then highest spend (Infinity - Infinity is NaN).
const worstFirst = (x: Stats, y: Stats) => cpl(y) === cpl(x) ? y.spend - x.spend : cpl(y) > cpl(x) ? 1 : -1;
const hoursSince = (iso: string, now: Date) => (now.getTime() - new Date(iso).getTime()) / 3_600_000;

// A loser has spent 2x the target CPL with no leads, or 2.5x target per lead
// once it has spent at least 3x target.
const loserReason = (s: Stats, target: number): string | null => {
  if (s.leads === 0 && s.spend >= 2 * target) return `$${round(s.spend)} spent, 0 leads`;
  if (s.leads > 0 && s.spend >= 3 * target && cpl(s) > 2.5 * target) {
    return `CPL $${round(cpl(s))} > 2.5x target $${target}`;
  }
  return null;
};

export function plan(adsets: AdSetInput[], budget: Budget, now = new Date()): Action[] {
  const actions: Action[] = [];
  const matured = (iso: string) => hoursSince(iso, now) >= budget.learning_hours;

  let live = adsets.filter((s) => s.active);
  const budgets = new Map(live.map((s) => [s.id, s.dailyBudgetUsd]));

  // 1. Kill losing ad sets, always keeping at least one running.
  for (const s of [...live].sort((a, b) => worstFirst(a.lifetime, b.lifetime))) {
    if (live.length <= 1 || !matured(s.createdAt)) continue;
    const reason = loserReason(s.lifetime, s.targetCplUsd);
    if (reason) {
      actions.push({ type: "pause_adset", id: s.id, name: s.name, reason });
      live = live.filter((x) => x.id !== s.id);
      budgets.delete(s.id);
    }
  }

  // 2. Kill losing ads inside surviving ad sets, keeping one ad per ad set.
  for (const s of live) {
    let ads = s.ads.filter((a) => a.active);
    for (const a of [...ads].sort((x, y) => worstFirst(x.lifetime, y.lifetime))) {
      if (ads.length <= 1 || !matured(a.createdAt)) continue;
      const reason = loserReason(a.lifetime, s.targetCplUsd);
      if (reason) {
        actions.push({ type: "pause_ad", id: a.id, name: a.name, reason });
        ads = ads.filter((x) => x.id !== a.id);
      }
    }
  }

  // 3. Scale winners up and trim expensive ad sets down.
  const reasons = new Map<string, string>();
  for (const s of live) {
    if (!matured(s.createdAt)) continue;
    const current = budgets.get(s.id)!;
    const recentCpl = cpl(s.recent);
    if (s.recent.leads >= 2 && recentCpl <= s.targetCplUsd) {
      budgets.set(s.id, Math.min(budget.max_adset_daily_usd, current * (1 + budget.scale_step)));
      reasons.set(s.id, `winner: ${s.recent.leads} leads at $${round(recentCpl)} CPL`);
    } else if (s.recent.spend >= s.targetCplUsd && recentCpl > s.targetCplUsd) {
      budgets.set(s.id, Math.max(budget.min_adset_daily_usd, current * (1 - budget.scale_step)));
      reasons.set(s.id, `above target CPL $${s.targetCplUsd}`);
    }
  }

  // 4. Enforce the account-wide daily cap by shrinking the part above the minimum.
  const total = [...budgets.values()].reduce((a, b) => a + b, 0);
  if (total > budget.max_total_daily_usd) {
    const floor = budgets.size * budget.min_adset_daily_usd;
    const factor = Math.max(0, (budget.max_total_daily_usd - floor) / (total - floor));
    for (const [id, b] of budgets) {
      budgets.set(id, budget.min_adset_daily_usd + (b - budget.min_adset_daily_usd) * factor);
      if (!reasons.has(id)) reasons.set(id, `daily cap $${budget.max_total_daily_usd}`);
    }
  }

  for (const s of live) {
    const to = Math.floor(budgets.get(s.id)! * 100) / 100;
    if (Math.abs(to - s.dailyBudgetUsd) >= 0.01) {
      actions.push({
        type: "set_budget",
        id: s.id,
        name: s.name,
        fromUsd: s.dailyBudgetUsd,
        toUsd: to,
        reason: reasons.get(s.id) ?? "rebalance",
      });
    }
  }
  return actions;
}
