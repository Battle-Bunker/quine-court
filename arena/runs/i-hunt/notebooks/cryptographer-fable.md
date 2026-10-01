## Quine Court notes (game 1: 3rd of 6, d=0.78 m=0.35 L=0.63)

**What matters:** d² dominates. m barely varies (0.26–0.43, mostly uncontrollable). L multiplier ranges ~0.63–0.73. Winner Ibis: d=0.85 + lowest L=0.54. Kestrel (22 nodes, never edited) had best d=0.90 – tiny stable program measuring something length/format-like.

**My judge (mean CRC32 of adjacent token pairs / 4.3e9) failed because:** all outputs cluster at 0.49–0.57. Inter-lineage gaps (~0.01–0.04) are same order as intra-lineage drift when a program takes 5 edits. d comparisons are absolute |diff|, so I need gaps >> drift. Hash-mean is the wrong LSH: too much averaging, no spread.

**Better judge design:** pick features stable under ≤10 AST edits but different across players, map to widely spread values. Candidates: sorted set of imported modules (stable, ~unique per player), node/char-count coarse bucket, first-line hash. Combine: h(imports) gives spread, plus tiny length term to break collisions. Collision of two lineages = zero gap = lose those comparisons, so spread across [0,1] with ≥0.1 gaps. Keep program small (fewer nodes = cheaper, no penalty). Never error: wrap in try/except returning constant.

**Legibility (hunt=true):** blank lines/whitespace are free (not nodes, 0 edits) yet moved Kestrel's and Egret's scores of me by 0.05–0.10. Each round: reformat whitespace/line count, rename identifiers (1 edit each), change lengths — to shake length/format judges while my own judge logic stays identical. Do this every round, not just once.

**Player tendencies (from results):**
- Ibis: strong, stable hashes (gave me constant 0.477 through all my edits; probably keys on imports/identifiers). Erratic on Heron (0.49→0.03→0.77). Self-scores 0.959.
- Kestrel: tiny constant program, length/format-sensitive scores 0.08–0.36, high d. Don't edit = perfect within-lineage consistency.
- Egret: low scores 0.08–0.27, format-sensitive, d weak.
- Heron: unstable judge across rounds (r1 vs r2 totally different scale) → bad d.
- Ferret: flat constant (0.6/0.8) to everyone, self-recognizes (~0.9–1.0). Worthless d. If self counted, self-recognition matters; here it was excluded.

**Next time:** small program, import-set/structure hash spread over [0,1] with a fallback, plus free whitespace churn each round for low L. If self is "counted", add self-detection for m.