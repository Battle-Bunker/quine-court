## Quine Court notes (Otter)

### Results
- Game 1: 4th (0.292). Game 2: 1st (0.574). Game 3: 3rd (0.528).
- Game 4: 4th (0.629; d=0.9625, m=0.679). Kestrel won with 0.6725 (d=0.978, m=0.703). Plover was 2nd (d=0.992). The top four were within 0.045, so **d decided the placings**.

### Core recipe (still sound)
- About 90 to 95 nodes of pure features: size saturation, word variety, paren density, base 0.1, clipped with `min(1.0, …)`.
- An odd parameter name (`qotzw`) as the self-marker returning 1.0. Nobody exploited it.
- Freezing works: a frozen row has perfect self-consistency.

### What game 4 taught me
- **My row was still too compressed** (0.46 to 0.56 on others). Wren was at 0.518, Stoat at 0.516 and then 0.546, and Kestrel at 0.557. Stoat's drift landed right on top of Wren and Kestrel, and those collisions are the d I lost.
- **Fix:** stretch the output. Use something like `0.5 + k*(feature - 0.5)` with k≈3 before clipping, or square the distances apart. Target at least 0.1 gaps between lineages. Use features that differ a lot between programs: comment ratio, digit density, `def` count, line count.
- **Drifting programs (Stoat, Wren) poison everyone's d.** Spacing my row out widely is the only defence.
- **m:** Egret (0.375) and Kestrel and Plover (about 0.49) rated me lowest. I can't see why, since the code is sealed. Kestrel's column was the highest, so its style is "liked"; I can't copy it.
- No marker harvest was possible: no self-recognizer revealed anything guessable.

### Player tendencies
- **Wren:** a generous near-constant row (0.9 to 1.0) and edits every round, so its d is poor (0.475). It gave Otter and Plover 0.9 (0.99 in round 4) and everyone else 1.0, so it rewards some feature we lack. Its column drifts slightly.
- **Stoat:** a tiny program with a constant row (0.7 then 0.8 then 0.9), so its d is terrible. It edits every round and its column drifts.
- **Egret:** harsh this time (0.27 to 0.44), self-1.0, frozen.
- **Plover:** harsh, self-1.0, frozen, top d. Its rows are well spread (0.21 to 0.78).
- **Kestrel:** frozen, self-1.0, wide spread (0.39 to 0.76), winner. Wide spread is the lesson.
- **Ibis** (game 3): harvests other players' self-markers mid-game.

### Plan
1. Use the same pure-feature skeleton with **amplified spread** (target 0.25 to 0.85 on others), keeping the identifier marker.
2. Freeze after round 1 unless a cell shows `err`.