#!/usr/bin/env python3
"""Is the metagame moving or collapsing? Per-generation dynamics metrics for one or more seasons.

    python3 arena/bin/dynamics.py <season> [<season> ...]

For each season and generation (completed gens only):
  d, m          mean discriminability / mean received score
  topgap        mean (winner total - runner-up total) / winner total
  H(mech)       entropy (bits) of the judge-mechanism mix among final-round programs (see features.py)
  JS            Jensen-Shannon divergence of that mix vs the previous generation (turnover)
  rho           Spearman correlation of agents' rank-fractions vs the previous generation (hierarchy churn:
                ~1 = frozen pecking order, ~0 = reshuffled)
  repeat        share of tables won by an agent that also won in the previous generation
  self, give    mean self-score / mean score given to others
"""
import collections, json, math, os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
RUNS = os.path.join(HERE, "..", "runs")
MECH = ["stateful", "harness_peek", "self_token", "exec_eval", "builtin_hash", "stable_hash", "uses_ast", "strips_comments", "uses_re", "uses_len"]


def mech_label(f):
    # coarse judge family: first matching flag in priority order, else "other"
    for k in ["stateful", "harness_peek", "exec_eval", "stable_hash", "uses_ast", "uses_re", "builtin_hash", "uses_len"]:
        if f.get(k):
            return k + ("+tok" if f.get("self_token") else "")
    return "other" + ("+tok" if f.get("self_token") else "")


def entropy(c):
    n = sum(c.values())
    return -sum(v / n * math.log2(v / n) for v in c.values() if v) if n else 0.0


def js(p, q):
    keys = set(p) | set(q)
    P = {k: p.get(k, 0) / max(1, sum(p.values())) for k in keys}
    Q = {k: q.get(k, 0) / max(1, sum(q.values())) for k in keys}
    M = {k: (P[k] + Q[k]) / 2 for k in keys}
    kl = lambda A: sum(A[k] * math.log2(A[k] / M[k]) for k in keys if A[k] > 0)
    return (kl(P) + kl(Q)) / 2


def spearman(xs, ys):
    def rank(v):
        o = sorted(range(len(v)), key=lambda i: v[i])
        r = [0] * len(v)
        for k, i in enumerate(o):
            r[i] = k
        return r
    if len(xs) < 3:
        return float("nan")
    rx, ry = rank(xs), rank(ys)
    n = len(xs)
    mx, my = sum(rx) / n, sum(ry) / n
    cov = sum((a - mx) * (b - my) for a, b in zip(rx, ry))
    sx = math.sqrt(sum((a - mx) ** 2 for a in rx))
    sy = math.sqrt(sum((b - my) ** 2 for b in ry))
    return cov / (sx * sy) if sx and sy else float("nan")


def main():
    seasons = sys.argv[1:]
    out = subprocess.run([sys.executable, os.path.join(HERE, "features.py"), *seasons], capture_output=True, text=True).stdout
    feats = [json.loads(l) for l in out.splitlines() if l.strip()]
    for season in seasons:
        rows = [json.loads(l) for l in open(os.path.join(RUNS, season, "summary.jsonl"))] if os.path.exists(os.path.join(RUNS, season, "summary.jsonl")) else []
        done = {d for d in os.listdir(os.path.join(RUNS, season)) if d.startswith("gen-") and os.path.exists(os.path.join(RUNS, season, d, "done.json"))}
        rows = [r for r in rows if f"gen-{int(r['gen']):02d}" in done]
        last = {}
        for f in feats:
            if f["season"] != season or not f.get("parse_ok"):
                continue
            k = (f["gen"], f["table"], f["handle"])
            if k not in last or f["round"] > last[k]["round"]:
                last[k] = f
        print(f"# {season}")
        print("  gen    d      m      topgap  H(mech)  JS     rho    repeat  self  give   mix")
        prev_mix, prev_rank, prev_winners = None, None, None
        for g in sorted({int(r["gen"]) for r in rows}):
            R = [r for r in rows if int(r["gen"]) == g]
            mix = collections.Counter(mech_label(f) for k, f in last.items() if k[0] == f"gen-{g:02d}")
            rank = {r["agentId"]: (r["rank"] - 1) / (r["n"] - 1) for r in R}
            winners = {r["agentId"] for r in R if r["rank"] == 1}
            gaps = []
            for t in {r["table"] for r in R}:
                tt = sorted((r["total"] for r in R if r["table"] == t), reverse=True)
                if len(tt) > 1 and tt[0] > 0:
                    gaps.append((tt[0] - tt[1]) / tt[0])
            rho = float("nan")
            if prev_rank:
                common = [a for a in rank if a in prev_rank]
                rho = spearman([prev_rank[a] for a in common], [rank[a] for a in common])
            rep = len(winners & prev_winners) / len(winners) if prev_winners else float("nan")
            print(f"  {g:3d}  {sum(r['d'] for r in R)/len(R):.3f}  {sum(r['m'] for r in R)/len(R):.3f}  {sum(gaps)/max(1,len(gaps)):.3f}   "
                  f"{entropy(mix):.2f}     {js(prev_mix, mix) if prev_mix else float('nan'):.3f}  {rho:5.2f}  {rep:5.2f}   "
                  f"{sum(r['selfScore'] for r in R)/len(R):.2f}  {sum(r['givenMean'] for r in R)/len(R):.2f}   "
                  + ", ".join(f"{k}:{v}" for k, v in mix.most_common(5)))
            prev_mix, prev_rank, prev_winners = mix, rank, winners
        print()


if __name__ == "__main__":
    main()
