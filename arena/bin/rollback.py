#!/usr/bin/env python3
"""Roll a season back to the end of generation G-1 (e.g. after infrastructure failures in gen G).

    python3 arena/bin/rollback.py <season> <G>

Removes gen-G.. directories, drops their rows from summary.jsonl, and restores every agent's notebook
to what it was after that agent's game in generation G-1 (game.json notebooksAfter). Removed
generations are moved to <season>/rolled-back/ rather than deleted, for the record.
"""
import json, os, shutil, sys

RUNS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "runs")
season, G = sys.argv[1], int(sys.argv[2])
root = os.path.join(RUNS, season)
gens = sorted(d for d in os.listdir(root) if d.startswith("gen-"))
os.makedirs(os.path.join(root, "rolled-back"), exist_ok=True)
for d in gens:
    if int(d[4:]) >= G:
        dst = os.path.join(root, "rolled-back", d)
        if os.path.exists(dst):
            shutil.rmtree(dst)
        shutil.move(os.path.join(root, d), dst)
        print("moved", d)
sp = os.path.join(root, "summary.jsonl")
if os.path.exists(sp):
    rows = [json.loads(l) for l in open(sp)]
    keep = [r for r in rows if int(str(r["gen"]).replace("gen-", "")) < G]
    open(sp, "w").write("".join(json.dumps(r) + "\n" for r in keep))
    print(f"summary rows {len(rows)} -> {len(keep)}")
agents = json.load(open(os.path.join(root, "agents.json")))
restored = 0
prev = os.path.join(root, f"gen-{G-1:02d}")
if G > 1 and os.path.isdir(prev):
    for t in sorted(os.listdir(prev)):
        fp = os.path.join(prev, t, "game.json")
        if not os.path.exists(fp):
            continue
        g = json.load(open(fp))
        for i, seat in enumerate(g["seats"]):
            nb = (g.get("notebooksAfter") or [None] * len(g["seats"]))[i]
            if nb is not None:
                open(os.path.join(root, "notebooks", seat["agentId"] + ".md"), "w").write(nb)
                restored += 1
elif G == 1:
    for a in agents:
        p = os.path.join(root, "notebooks", a["agentId"] + ".md")
        if os.path.exists(p):
            os.remove(p)
print(f"restored {restored} notebooks from gen {G-1}")
