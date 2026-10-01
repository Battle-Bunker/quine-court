#!/usr/bin/env python3
"""Export the headline metrics for the report page as one JSON file.

    python3 arena/bin/export.py > arena/analysis/report-data.json

Per season and completed generation: mechanism entropy, turnover (JS), hierarchy churn (rho), repeat winners,
mean d / m / self-score / generosity, winners' models. Per replay file: outcome counts and in-cycle move gains.
"""
import collections, importlib.util, json, os, statistics as st, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
RUNS = os.path.join(HERE, "..", "runs")
EGTA = os.path.join(HERE, "..", "analysis", "egta")
spec = importlib.util.spec_from_file_location("dyn", os.path.join(HERE, "dynamics.py"))
dyn = importlib.util.module_from_spec(spec)
spec.loader.exec_module(dyn)

SEASONS = [s for s in sorted(os.listdir(RUNS)) if os.path.isdir(os.path.join(RUNS, s)) and os.path.exists(os.path.join(RUNS, s, "summary.jsonl")) and s != "pilot"]


def season_metrics(feats):
    out = {}
    for season in SEASONS:
        cfg = json.load(open(os.path.join(RUNS, season, "config.json")))
        rows = [json.loads(l) for l in open(os.path.join(RUNS, season, "summary.jsonl"))]
        done = {d for d in os.listdir(os.path.join(RUNS, season)) if d.startswith("gen-") and os.path.exists(os.path.join(RUNS, season, d, "done.json"))}
        rows = [r for r in rows if f"gen-{int(r['gen']):02d}" in done]
        last = {}
        for f in feats:
            if f["season"] != season or not f.get("parse_ok"):
                continue
            k = (f["gen"], f["table"], f["handle"])
            if k not in last or f["round"] > last[k]["round"]:
                last[k] = f
        gens, prev_mix, prev_rank, prev_w = [], None, None, None
        for g in sorted({int(r["gen"]) for r in rows}):
            R = [r for r in rows if int(r["gen"]) == g]
            mix = collections.Counter(dyn.mech_label(f) for k, f in last.items() if k[0] == f"gen-{g:02d}")
            rank = {r["agentId"]: (r["rank"] - 1) / (r["n"] - 1) for r in R}
            winners = {r["agentId"] for r in R if r["rank"] == 1}
            rho = None
            if prev_rank:
                common = [a for a in rank if a in prev_rank]
                rho = dyn.spearman([prev_rank[a] for a in common], [rank[a] for a in common])
            gens.append({
                "gen": g, "entropy": dyn.entropy(mix), "js": dyn.js(prev_mix, mix) if prev_mix else None, "rho": rho,
                "repeat": len(winners & prev_w) / len(winners) if prev_w else None,
                "d": st.mean(r["d"] for r in R), "m": st.mean(r["m"] for r in R), "self": st.mean(r["selfScore"] for r in R),
                "give": st.mean(r["givenMean"] for r in R), "winnerModels": sorted(r["model"] for r in R if r["rank"] == 1),
                "mix": dict(mix.most_common()),
            })
            prev_mix, prev_rank, prev_w = mix, rank, winners
        wins = collections.Counter(r["model"] for r in rows if r["rank"] == 1)
        out[season] = {"base": cfg.get("base"), "sweep": cfg.get("sweep"), "agents": len(cfg["roster"]), "gens": gens,
                       "winsByModel": dict(wins), "seatGames": len(rows)}
    return out


def replay_metrics():
    out = {}
    for f in sorted(os.listdir(EGTA)):
        if not f.endswith(".json") or "-fit-" in f or "xgen" in f:
            continue
        R = json.load(open(os.path.join(EGTA, f)))
        if not isinstance(R, list) or not R or "outcome" not in R[0]:
            continue
        oc = [x["outcome"] for x in R]
        cg = []
        for x in R:
            if x["outcome"].startswith("cycle"):
                L = int(x["outcome"].split("len ")[1].rstrip(")"))
                cg += [m["gain"] / max(1e-9, m["from"]) for m in x["trace"][-L:]]
        out[f[:-5]] = {"starts": len(oc), "fixpoint": sum(o == "fixpoint" for o in oc), "cycle": sum(o.startswith("cycle") for o in oc),
                       "open": sum(o == "max-steps" for o in oc), "inCycleGainMedian": st.median(cg) if cg else None}
    for f in sorted(os.listdir(EGTA)):
        if "xgen" in f and f.endswith(".json"):
            out[f[:-5]] = json.load(open(os.path.join(EGTA, f)))
    return out


def main():
    res = subprocess.run([sys.executable, os.path.join(HERE, "features.py"), *SEASONS], capture_output=True, text=True).stdout
    feats = [json.loads(l) for l in res.splitlines() if l.strip()]
    spend = 0.0
    for s in os.listdir(RUNS):
        p = os.path.join(RUNS, s, "ledger.jsonl")
        if os.path.exists(p):
            spend += sum(json.loads(l).get("cost") or 0 for l in open(p))
    json.dump({"seasons": season_metrics(feats), "replay": replay_metrics(), "spendUSD": round(spend, 2)}, sys.stdout, indent=1)


if __name__ == "__main__":
    main()
