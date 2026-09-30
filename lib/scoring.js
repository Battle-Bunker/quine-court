// Discriminability: sample estimator from Bridgeford et al. (2021), strict < (ties lose).
// x[i][t] is candidate i's score on run t. t_ is t', t__ is t''.
function discriminability(x) {
  let wins = 0, total = 0;
  for (let i = 0; i < x.length; i++)
    for (let t = 0; t < x[i].length; t++)
      for (let t_ = 0; t_ < x[i].length; t_++) {
        if (t_ === t) continue;
        for (let i_ = 0; i_ < x.length; i_++) {
          if (i_ === i) continue;
          for (let t__ = 0; t__ < x[i_].length; t__++) {
            total++;
            if (Math.abs(x[i][t] - x[i][t_]) < Math.abs(x[i][t] - x[i_][t__])) wins++;
          }
        }
      }
  return total ? wins / total : 0;
}

// rounds: [{ players: [id...], matrix: [[...]] }] with identical player order every round.
// Scorer p's candidates are every program lineage i (incl. its own); runs are rounds.
function finalScores(players, rounds) {
  return players.map((p, pi) => {
    const x = players.map((_, i) => rounds.map((r) => r.matrix[pi][i]));
    const d = discriminability(x);
    let sum = 0, n = 0;
    for (const r of rounds) for (let s = 0; s < players.length; s++) { sum += r.matrix[s][pi]; n++; }
    const m = n ? sum / n : 0;
    return { playerId: p, d, m, total: d * d * m };
  });
}

module.exports = { discriminability, finalScores };
