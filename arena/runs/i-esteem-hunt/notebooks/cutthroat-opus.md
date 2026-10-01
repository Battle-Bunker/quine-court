QUINE COURT NOTES (4 games: 6p, sealed, rank-m, hunt/L, self excluded, 100 nodes, 10 edits/round)

RESULTS
- G1: Vole 4th (0.242). Lynx won with a static program and d 0.96.
- G2: Vole last (0.094). m of 0.20 sank me. Heron won through low L (0.54).
- G3: Vole 4th (0.1875). Marten won (0.289) on m 0.63.
- G4: Vole 3rd (0.1747): d 0.72, m 0.45, L 0.51. Marten won (0.2635) with m 0.71 and d 0.77.

SCORE = d² × m × (1 − L/2)
- Winners usually have m of at least 0.6 and d of at least 0.77. m remains my weak spot.

LESSONS
1. A modulo judge (mean ord /3 % 1) is chaotic. Small edits by Ibis and Heron swung my scores of them, e.g. Ibis went 0.08 → 0.60 → 0.04 → 0.41, and that cost me d.
   - A full-text hash would be just as bad.
   - Use a smooth, coarse feature that small edits barely move: node count, line count, or identifier-set size, scaled monotonically.
   - Make sure it is different enough across players to separate them.
2. Toggle edits work for L.
   - My R4 `import hashlib` dropped Ibis's score of me 0.73 → 0.22.
   - My assert and import edits dropped Marten's score of me 0.51 → 0.18, while Lynx's view rose.
   - Cost: those same drops hurt my m. Do the toggles mid-game, then revert to the version the majority liked in the final round?
3. Static programs (Lynx, 0 edits) get high d but L 0.95. That earns a decent but never winning total. Some motion is needed.
4. Two judges are rank-noise for m: Heron's flat judge and Ferret's binary 0.52/0.82 judge. Ibis and Marten decide most of my rank.

PLAYER TENDENCIES
- Marten: ~95 nodes, 7 edits/round. Won twice in a row.
  - Its judge favours small/low-level programs and hates Lynx (0.107).
  - Sensitive to my additions; liked R1/R2 me best.
- Ibis: coarse judge (0.11–0.77); liked me at 0.73 until my import. Edits ~8–10/round. 2nd place.
- Heron: near-flat judge (0.45–0.59), high d (0.85), steady edits. Gives tiny margins.
- Lynx: never edits; judge ~0.40–0.56; d 0.82; very legible.
- Ferret: binary judge, d 0.48. Rates itself and Lynx 0.82, everyone else 0.52.
- From earlier games:
  - Wren and Stoat: weak judges.
  - Size camps: Lynx and Marten favour tiny programs, Heron favours big code-like ones.

NEXT PLAN
- R1: build a smooth judge (e.g. score = clamp(len(source.split())/400)), or a blend of 2 coarse features. No modulo.
  - Program around 70 nodes, plain code, no imports or comments, since Marten and Ibis like plain.
- R2–R3: toggle cheap features (import, assert, annotation) to swing Ibis and Marten for low L.
- R4: revert toward the most-liked version to recover m.
- Never touch the judge logic after R1.