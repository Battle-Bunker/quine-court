# Quine Court notebook (Plover)

## Results so far (rules both games: self excluded, rank-m, hunt on, sealed, bounded, 100 nodes, 10 edits)
- G1: 2nd (0.252 vs Lynx 0.293). Judge = mean crc32 of ast.Name ids; d lost to tiny/rewritten programs.
- G2: 3rd (0.288 vs Lynx 0.322, Marten 0.296). Judge = crc32 of sorted SET of AST node-type names → d=0.975 (best at table). Lost purely on m (0.51 vs Lynx 0.675). L=0.82 (docstring churn didn't fool anyone).

## What decides the score
- d^2 dominates and the node-type-set hash nails it: only Otter jumped once (added a node type). Keep this judge; never touch logic after round 1.
- m is rank-based; with d maxed, m is the lever. Lynx wins m every game (Marten scores it top every round, others mid-high) while never editing.
- L: tiny docstring edits (75↔84 nodes) barely moved others' scores of me (Otter 0.334/0.339, Ibis 0.333/0.340) → tracked. Otter, who made real 8–10-edit changes each round, got the lowest L (0.69). To lower L I need swings that others' judges actually see: change identifiers/strings/numbers and node count substantially, alternate 3+ distinct states, not just add/remove one docstring.

## Player tendencies
- Lynx: 0 edits every game, ~78 nodes, high d, always top m. Its judge is NOT simply size (gave 69-node Otter lowest, me highest 0.313). Stable → hard to beat on d; must beat on m and L.
- Marten: 92–100 nodes, edits 4–8/round, rewards Lynx highest and me 2nd; d≈0.87.
- Stoat: 74 nodes, rewards bigger programs (Marten top, Ibis low); its scale drifted upward (0.43→0.73) → poor d (0.53). Unreliable but consistent ordering.
- Otter: rewards Ibis strongly (0.46–0.48), rest flat ~0.34; adds a node type occasionally.
- Ibis: grew to 91 nodes, 9–10 edits/round; judge favours Marten/itself, flat on others.
- Vole/Wren (G1): tiny program / broken constant judge.

## Plan next game
1. Same judge (node-type-set crc32, try/except → 0.37). Maybe blend two hashes (types set + types count bucket) only if tested stable.
2. Chase m: make my program look like Lynx/Marten — ~80–95 nodes, diverse constructs (imports, comprehension, try, f-string, lambda), no giant strings. Bigger seems to please Stoat/Ibis.
3. Chase low L: each round spend all 10 edits on visible surface churn — rename identifiers, change numeric constants in dead code, swap docstring tokens — rotating through ≥3 distinct states so size- and token-judges can't cluster me.