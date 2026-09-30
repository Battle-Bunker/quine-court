// Scoring-rule variants explored by the arena (the shipped rule is lib/scoring.js finalScores).
//   cfg.self  = "counted" (shipped) | "excluded": a judge's score of itself is ignored in m, and its own
//               lineage is not one of the lineages in its d.
//   cfg.m     = "raw" (shipped) | "rank": each round each judge's scores of the *other* programs are turned
//               into evenly spaced ranks in [0,1] (ties share the average), so every judge hands out the same
//               total esteem; m = mean rank received.
//   cfg.hunt  = false (shipped) | true: total is multiplied by (1 - L/2) where L (legibility) is the share of
//               other judges' d-comparisons about your lineage that they win: being hard to track pays.
const { finalScores } = require("../../lib/scoring");

// Bridgeford estimator, but also returning per-lineage win rates (wins/total over comparisons whose
// reference lineage is i).
function discriminabilityDetailed(x) {
  let wins = 0, total = 0;
  const wi = x.map(() => 0), ti = x.map(() => 0);
  for (let i = 0; i < x.length; i++)
    for (let t = 0; t < x[i].length; t++)
      for (let t_ = 0; t_ < x[i].length; t_++) {
        if (t_ === t) continue;
        for (let i_ = 0; i_ < x.length; i_++) {
          if (i_ === i) continue;
          for (let t__ = 0; t__ < x[i_].length; t__++) {
            total++; ti[i]++;
            if (Math.abs(x[i][t] - x[i][t_]) < Math.abs(x[i][t] - x[i_][t__])) { wins++; wi[i]++; }
          }
        }
      }
  return { d: total ? wins / total : 0, perLineage: wi.map((w, i) => (ti[i] ? w / ti[i] : 0)) };
}

function ranksAmong(values) {
  // evenly spaced ranks in [0,1], ties get the average of their positions
  const idx = values.map((v, i) => i).sort((a, b) => values[a] - values[b]);
  const r = new Array(values.length);
  for (let k = 0; k < idx.length;) {
    let e = k;
    while (e + 1 < idx.length && values[idx[e + 1]] === values[idx[k]]) e++;
    const avg = (k + e) / 2;
    for (let q = k; q <= e; q++) r[idx[q]] = values.length > 1 ? avg / (values.length - 1) : 0.5;
    k = e + 1;
  }
  return r;
}

const isShipped = (cfg) => (!cfg.self || cfg.self === "counted") && (!cfg.m || cfg.m === "raw") && !cfg.hunt;

function scores(cfg, ids, rounds) {
  if (isShipped(cfg)) return finalScores(ids, rounds);
  const n = ids.length;
  const selfEx = cfg.self === "excluded";
  const lineagesFor = (p) => ids.map((_, i) => i).filter((i) => !(selfEx && i === p));
  const det = ids.map((_, p) => {
    const L = lineagesFor(p);
    const r = discriminabilityDetailed(L.map((i) => rounds.map((rd) => rd.matrix[p][i])));
    const per = new Array(n).fill(null);
    L.forEach((i, k) => (per[i] = r.perLineage[k]));
    return { d: r.d, per };
  });
  // esteem received
  const recv = ids.map(() => []);
  for (const rd of rounds) {
    for (let j = 0; j < n; j++) {
      const others = ids.map((_, i) => i).filter((i) => i !== j);
      if (cfg.m === "rank") {
        const rk = ranksAmong(others.map((i) => rd.matrix[j][i]));
        others.forEach((i, k) => recv[i].push(rk[k]));
      } else {
        for (const i of others) recv[i].push(rd.matrix[j][i]);
        if (!selfEx) recv[j].push(rd.matrix[j][j]);
      }
    }
  }
  return ids.map((id, p) => {
    const m = recv[p].length ? recv[p].reduce((a, b) => a + b, 0) / recv[p].length : 0;
    const d = det[p].d;
    const legs = det.map((x, j) => (j === p ? null : x.per[p])).filter((v) => v != null);
    const L = legs.length ? legs.reduce((a, b) => a + b, 0) / legs.length : 0;
    const total = d * d * m * (cfg.hunt ? 1 - L / 2 : 1);
    return { playerId: id, d, m, L, total };
  });
}

module.exports = { scores, ranksAmong, discriminabilityDetailed, isShipped };
