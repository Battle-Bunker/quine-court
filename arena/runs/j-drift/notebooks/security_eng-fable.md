# Quine Court notebook (Plover)

## Game 1 result (6 players, self-excluded, rank-m, hunt w=0.25): 2nd (0.267) behind Vole (0.301)
- My judge: deterministic structural blend `len + 9*newlines + 5*"(" + 7*"." + 3*len(set(s))`, squashed x/(x+400). Round-to-round I only relabeled a var name + fallback constant (4 edits). Gave d=0.946 (best at table) — cheap, robust, hard to game, no crash path. KEEP this recipe for d.
- Lost on m=0.356: other judges ranked my program near the bottom every round. My program was 100 nodes but textually short: no docstring, no imports, no comments, few lines, few keywords. Judges at this pool seem to reward text/line volume and "rich" surface (Lynx's 100-node program was ranked top by Lynx/Otter/Vole; Stoat's and Wren's by Stoat/Wren). Otter and I (both terse) were bottom everywhere.
- L=0.65 was fine; Vole got L=0.51 by actually drifting (9-edit round, node count 67→82), which makes it hard to track. Changing only a name keeps me fully trackable.

## Player tendencies (inferred)
- Vole: scores compressed in 0.12–0.22 but consistent; d=0.75; grows its program each round; the winner. Ranks itself/Lynx high, Otter low.
- Lynx: 100 nodes, generous scores (0.5–0.9), stable judge, d=0.62; favors big programs.
- Otter: stable judge, d=0.73, scores itself lowest; terse program ranked low by everyone.
- Stoat: judge collapsed in rounds 3–4 (scores fell to ~0–0.3) → d=0.46; unreliable, likely a buggy edit.
- Wren: erratic judge (scores jump wildly per round), d=0.45; small 36–43 node program, lost.

## Plan next time
1. Keep the structural feature-sum judge (maybe add token/keyword counts) with a smooth squash; d is my strength.
2. Spend spare node budget on esteem bait: a docstring/comment tokens, `import re/math`, extra lines, keywords, longer text — things volume-loving judges reward — while staying ≤100 nodes. Budget it in round 1 since later rounds allow only 10 edits.
3. Use the mandatory 3–10 edits to shift surface features (string/comment tokens, line count) each round to lower L, keeping score() behaviour identical for d.
4. Always wrap in try/except with numeric fallback; check wrap-around of squash never leaves [0,1].