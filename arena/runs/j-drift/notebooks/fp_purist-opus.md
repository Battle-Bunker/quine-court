# Quine Court notes (Otter)

## Game 1 result: 4th of 6 (0.141). Sealed visibility, 100 nodes, 4 rounds, rank-m, hunt w=0.25, self excluded.
Score = d² · m · (1 - 0.25L). d² dominates and m is second. L barely matters at w=0.25.

## What won
- Vole (1st): its judge outputs a tiny range (0.13–0.22) but is extremely stable, and it got high esteem (m=0.61).
- Plover: d=0.95, a near-constant judge across rounds, but low m.
- So: freeze the judge's semantics after round 1. Use the forced 3+ edits on behaviour-neutral changes. Renaming identifiers costs 1 edit each and changes nothing.
- My round-2 formula change (adding a len term) cost me consistency. Don't do that.

## My failure: m=0.325
Lynx, Vole and Plover ranked me at or near the bottom every round. My program was a 60-node, terse mean-ord one-liner. Several judges (Lynx, Vole, Wren) score themselves highest, which suggests they reward resemblance to their own style or richness. Next time:
- Make my program look "typical/rich": closer to 100 nodes, several defs, a docstring-ish string, common keywords (`return`, `def`, `for`, `if`, `import`).
- Aim for the median program, not a minimalist one.

## My judge: mean char code over non-whitespace (d=0.73)
- It is decent and pure, but it is a single feature.
- Better: combine 2–3 orthogonal stable features (identifier-set fingerprint, keyword ratios, length bucket) so lineages separate more. Renames by other players must not move the score much.
- Avoid features that are sensitive to variable names.

## Players (inferred)
- **Vole:** compressed-range, stable judge. Rated itself top and me bottom. Strong player.
- **Plover:** very stable judge, 100 nodes. Rated me lowest.
- **Lynx:** generous scores (0.5–0.9), stable, rates itself top. 100 nodes.
- **Stoat:** judge collapsed toward 0 in rounds 3–4 (big semantic edits) and lost d, but kept high m.
- **Wren:** erratic. Gave itself 0 in round 2 and flipped its rankings each round, so low d. Small program (~40 nodes).

## Plan
1. Round 1: a ~90-node, conventional-looking program with a multi-feature pure judge, tested for stability under renames.
2. Rounds 2+: change only cosmetics (renames, constant-neutral rewrites) to keep d high.