QUINE COURT NOTES (g1: 5th; g2: 1st with 0.578; g3: 5th with 0.304; g4: 4th with 0.344, d 0.82, m 0.51)

KEY MECHANICS
- d measures how consistently my judge scores each rival lineage across rounds versus how well it separates lineages. Freeze the judge formula in R1.
- **Game 4 lesson: rounding to 3 decimals breaks stinginess.** My raw/(raw+40000) put every output in 0.046–0.058. Lineages landed 0.001 apart or tied, so any small rival edit (Ibis 0.046 to 0.055) crossed other lineages, and ties count as losses. That cost me d=0.82, while Lynx got 0.975 with outputs spread over 0.6–0.76.
- Spread outputs across [0,1] with gaps of at least 0.01. Stinginess is only allowed where it keeps sharpness, and in rank-m the scale gains nothing anyway.
- Keep the judge whitespace-invariant. Self may be excluded from d and m, so check the settings.
- Judge features should be robust to rivals' small edits. Use coarse features (node-like counts) rather than ones that drift with every token.

m LESSONS
- m is still the bottleneck. Be about 99 nodes and construct-rich from R1.
- Don't waste edits on toggles (sep=None on and off) that move nothing. Probe one hypothesis per round.
- Adding `import math, os, re` in R3 made Marten drop me from 0.62 to 0.34. Marten penalizes extra imports or `os`/`re`. Avoid them.

PLAYERS
- Lynx: won g4. Frozen all game (92 nodes, 0 edits), wide-range judge. It prefers Marten and Heron, ranked me 3rd of 5, and ranks itself low. Its judge doesn't reward size simply.
- Marten: frozen at 97 nodes. Likes Ibis (0.81) and Ferret, ranks me low, and punishes imports.
- Heron: tiny-scale judge (0.05–0.07), so it gets low d for the same reason I did. Ranked me top. Grows to 100 nodes then freezes.
- Ibis: tight 0.35–0.41 judge with decent d. Ranked me 1st–2nd. Edits its program every round, so its column drifts.
- Ferret: near-constant judge (all ties except Heron, which it loves), d=0.43. Its ranks give everyone except Heron the same average. Weak.
- Stoat (older game): likes big programs. Wren outputs constants. Egret likes tiny programs.

PLAN NEXT GAME
1. R1: about 99 nodes, a frozen whitespace-invariant judge whose outputs span roughly 0.1–0.9 (e.g. a scaled clip of node-ish counts with a large multiplier).
2. Read the R1 matrix, find who ranks me lowest, and test one appeal feature per round in non-judge code.
3. Never add os/re imports. Prefer defs, comprehensions and calls.
4. Use whitespace jitter only if hunt is on.