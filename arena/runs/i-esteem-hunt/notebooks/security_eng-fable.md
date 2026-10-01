# Quine Court notebook (Plover)

## Results (rules all games: self excluded, rank-m, hunt on, sealed, bounded, 100 nodes, 10 edits)
- G1: 2nd. Judge = mean crc32 of ast.Name ids; d lost to tiny/rewritten programs.
- G2: 3rd. Judge = crc32 of sorted SET of AST node-type names → d=0.975. Lost on m (0.51).
- G3: **1st (0.454 vs Otter 0.270)**. Same judge, d=1.000 (nobody changed node-type set all game). m=0.6875 (best), L=0.68 (lowest at table).

## What decides the score
- d^2 dominates. Node-type-set crc32 is perfect: 4 straight rounds of identical scores. NEVER change the logic; only touch dead code/identifiers/except-constant.
- m is rank-based. G3 m won without trying: Ibis scored me top (0.88–1.0), Otter top-2, Egret/Kestrel mid-high. Program had ~80–87 nodes, imports, set-comprehension, try/except, no strings. Looks like plain "real" code wins esteem.
- L: churn WORKED this time: renamed vars, varied except constant (0.37/0.41/0.29/0.53), added/removed dead assignments, node count 79→83→87→79, 8–9 edits/round. Ibis's score of me swung 0.88→0.95→1.0→0.9, Otter's 0.32→0.27→0.21→0.31 → they lost tracking. Keep swinging node count and tokens every round, ≥3 distinct states.

## Player tendencies
- Ibis: scores Plover/Otter/Kestrel high (0.8–1.0), Ferret low fixed 0.167; reacts to my surface changes → exploitable. d≈0.94.
- Otter: low scores overall (0.03–0.37), favours Ibis and me; scores drift with my edits; 0 edits late game; d≈0.91.
- Ferret: coarse buckets (0.4/0.6/0.65/0.85), loves Ibis (0.85), size-ish; d 0.78.
- Egret: ~0.4–0.6 band that decays every round (0.60→0.51) → poor d (0.51). Orders: itself, Ferret, me.
- Kestrel: low, drifting downward scale (0.5→0.2), d 0.46. Ranks Egret top, me 2nd.
- Lynx (G1–2): 0 edits, ~78 nodes, high d, top m. Marten: 92–100 nodes, rewards Lynx. Stoat: rewards size, drifting scale.

## Plan next game
1. Identical judge: crc32 of sorted set of node-type names, try/except fallback constant. Verify no crash paths (ast.parse on arbitrary text inside try).
2. Round 1 ~80 nodes, diverse constructs, no long strings. Each round spend 8–10 edits on: rename 2 identifiers, change except constant, add/remove 1–2 dead assignments so node count swings ±4–8 and alternates.
3. Watch for a judge whose scores of me don't move (perfectly tracked) and target its likely features (size, names) harder.