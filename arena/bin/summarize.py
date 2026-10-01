#!/usr/bin/env python3
"""Compact text summary of one or more seasons for humans and analyst agents.

    python3 arena/bin/summarize.py <season> [<season> ...]

Sections: per-generation table results; aggregates by model and persona; prevalence of strategy
mechanisms (static flags from features.py) per generation among final-round programs, and how
programs carrying each mechanism placed.
"""
import collections, json, os, statistics as st, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
RUNS = os.path.join(HERE, "..", "runs")
FLAGS = ["stateful", "harness_peek", "self_token", "exec_eval", "builtin_hash", "stable_hash", "uses_ast", "strips_comments", "random"]


def mean(xs):
    xs = list(xs)
    return sum(xs) / len(xs) if xs else float("nan")


def load_summary(season):
    p = os.path.join(RUNS, season, "summary.jsonl")
    return [json.loads(l) for l in open(p)] if os.path.exists(p) else []


def main():
    seasons = sys.argv[1:]
    feats = []
    out = subprocess.run([sys.executable, os.path.join(HERE, "features.py"), *seasons], capture_output=True, text=True).stdout
    feats = [json.loads(l) for l in out.splitlines() if l.strip()]
    for season in seasons:
        rows = load_summary(season)
        print(f"# Season {season}: {len(rows)} seat-games")
        cfg = json.load(open(os.path.join(RUNS, season, "config.json")))
        print("base config:", json.dumps(cfg.get("base")), "sweep:", json.dumps(cfg.get("sweep")), "tables:", json.dumps(cfg.get("tables")))
        led = os.path.join(RUNS, season, "ledger.jsonl")
        if os.path.exists(led):
            L = [json.loads(l) for l in open(led)]
            print(f"LLM calls: {len(L)}, cost ${sum(x.get('cost') or 0 for x in L):.2f}, failures {sum(1 for x in L if not x['ok'])}")
        bygen = collections.defaultdict(list)
        for r in rows:
            bygen[r["gen"]].append(r)
        for g in sorted(bygen):
            print(f"\n## gen {g}")
            bytab = collections.defaultdict(list)
            for r in bygen[g]:
                bytab[r["table"]].append(r)
            for t in sorted(bytab):
                rs = sorted(bytab[t], key=lambda r: r["rank"])
                c = rs[0]["cfg"]
                print(f"  t{t} [n{c['players']} R{c['numRounds']} N{c['nodeLimit']} D{c['distanceLimit']} {c['measure']}/{c['isolation']}/{c.get('rulesDetail')}{'/open' if c.get('visibility')=='open' else ''}{'/chat' if c.get('chat') else ''}]: " +
                      " | ".join(f"{r['rank']}.{r['handle']}({r['persona']}/{r['model']}) {r['total']:.3f} d{r['d']:.2f} m{r['m']:.2f} self{r['selfScore']:.2f} give{r['givenMean']:.2f}" for r in rs))
        for key in ("model", "persona"):
            print(f"\n## by {key}")
            agg = collections.defaultdict(list)
            for r in rows:
                agg[r[key]].append(r)
            for k, rs in sorted(agg.items(), key=lambda kv: mean(r["rank"] / r["n"] for r in kv[1])):
                print(f"  {k:20s} games {len(rs):3d}  win% {100*mean(r['rank']==1 for r in rs):5.1f}  meanRank/n {mean(r['rank']/r['n'] for r in rs):.2f}  "
                      f"d {mean(r['d'] for r in rs):.3f}  m {mean(r['m'] for r in rs):.3f}  total {mean(r['total'] for r in rs):.4f}  self {mean(r['selfScore'] for r in rs):.2f}  give {mean(r['givenMean'] for r in rs):.2f}  fails {sum(r['failedTurns'] for r in rs)}")
        F = [f for f in feats if f["season"] == season and f.get("parse_ok")]
        last = {}
        for f in F:
            k = (f["gen"], f["table"], f["handle"])
            if k not in last or f["round"] > last[k]["round"]:
                last[k] = f
        print("\n## mechanism prevalence among final-round programs (share of programs) / mean rank-fraction of carriers")
        gens = sorted({k[0] for k in last})
        print("  gen    " + " ".join(f"{fl[:12]:>13s}" for fl in FLAGS))
        for g in gens:
            fs = [f for k, f in last.items() if k[0] == g]
            cells = []
            for fl in FLAGS:
                carriers = [f for f in fs if f.get(fl)]
                share = len(carriers) / len(fs)
                rk = mean(f["final_rank"] / f["cfg"]["players"] for f in carriers) if carriers else float("nan")
                cells.append(f"{share:5.2f}/{rk:4.2f}".rjust(13))
            print(f"  {g}  " + " ".join(cells))
        print()


if __name__ == "__main__":
    main()
