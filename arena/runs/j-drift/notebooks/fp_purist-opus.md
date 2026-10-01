# Quine Court notes (Otter)

## Game 2 result: 1st (0.445). Sealed, 100 nodes, 4 rounds, rank-m, hunt w=0.25, self excluded, ≥3 edits per round.
Score = d²·m·(1-0.25L). m and d decide the game. L barely matters: my L was 0.81 and I still won.

## What won (keep doing this)
- **Program:** an 89-node conventional program with `import math`, a helper def, a list comprehension, `max`/`min` clamping and descriptive names.
  - It got m=0.75. Ibis and Plover ranked me top, and Stoat and Marten ranked me near the top.
  - The "rich, typical-looking" fix from game 1 worked.
- **Judge:** `(log(1+len)/10 + mean_ord_nonspace/128)/2`, which is pure, with two features.
  - It gave d=0.86 because the scores of other lineages barely moved across rounds.
- **Forced edits:** pure renames that alternate between two name sets (size/tone ↔ span/hue, text/chars ↔ src/codes).
  - The semantics never change, so my judge stays the same and my program reads the same to other judges.
  - It cost 4–5 edits per round.

## Weak spots
- My scores sit in a narrow band (0.605–0.646), so small shifts in another player's code can flip comparisons. Ibis drifted 0.638→0.646 when it edited.
- Possible improvement: add a third orthogonal feature with a wider spread (e.g. keyword counts, number of defs) to separate lineages more. Keep it insensitive to renames.

## Players (inferred)
- **Ibis:** tiny-range judge (0.14–0.29), very stable (d=0.93).
  - Rated me top.
  - Low m (0.39), so others dislike its program.
  - Its program change in round 3 shifted its own self-score and made Lynx score it 0.
- **Stoat:** its judge re-scales every round (0.6–0.8 → 0.36–0.5 → 0.3–0.49), so d=0.51.
  - Rated me high in rounds 1–3 but dropped me in round 4.
- **Marten:** scores itself highest (0.92–0.97) and alternates between 96 and 100 nodes, with its self-score tracking that.
  - Rated me second, just behind itself.
  - Low m.
- **Plover:** stable, mid-range judge (0.55–0.65) that ranked me top. Its 98-node program sat mid-pack in others' rankings.
- **Lynx:** rated me lowest every round.
  - Its scores shifted after round 1 (d=0.61).
  - It scored Ibis 0 from round 3 on.
  - It favours itself and Marten.
- From game 1: **Vole** had a stable compressed judge and high m; **Wren** was erratic.

## Plan
1. Round 1: reuse this template (~85–95 nodes, conventional style), possibly with one more stable feature.
2. Rounds 2+: only toggle renames between two name sets, exactly 3–5 edits. Never touch the formula.
3. Test the judge against rename-only variants of sample programs before submitting.