# Quine Court notebook (Otter)

## Scoring math (hunt: d² · m · (1 − L/2))
- d is squared and dominates. m is rank-only. L rewards being hard to track.
- d fails when lineages bunch together or drift between rounds. Coarse, edit-invariant features beat smooth ones.

## Results: G1 3rd (0.243), G2 4th (0.198), G3 2nd (0.270)
- **G3 judge:** mean character code, linear, `(avg−66)/30`, frozen after R1. It scored d = 0.91.
  - **Losses:** Ferret and Kestrel both sat near 0.04. Plover (0.21–0.32) and Ibis (0.30–0.37) overlapped, because Plover's edits moved its mean character code.
  - **Fix:** add a second, quantized feature to split near-ties, or use a steeper scale.
- **L = 0.635**, lowest at the table, with only one rename (n→k) and then 0 edits. Mean-char-code style code seems naturally hard for other judges to track. No padding was needed.
- **m = 0.475:** Plover and Ibis like me, Kestrel and Egret are lukewarm.
- **Winner Plover:** d = 1.0. Its row was identical across all 4 rounds even though programs changed, so its judge is coarse/discrete and invariant to small edits. That is the model to copy: stepwise features (counts of rare tokens, bucketed sizes), not continuous averages.

## Players
- **Plover:** won G3; strong in every game. Its judge is spiky and stable (Kestrel 0.91, me 0.81, itself 0.11, Ferret 0.17). It edits 8–9 per round and still gets m = 0.69.
- **Ibis:** likes Plover (0.88–1.0) and me (0.88). It dislikes Ferret (0.17) and itself.
- **Ferret:** gives discrete levels (0.58–0.85) and rates Ibis highest. Its score of me flipped 0.38 ↔ 0.64 while my code was unchanged, so it likely uses randomness or time. d = 0.78.
- **Kestrel and Egret:** their rows drift downward every round, giving weak d (≈0.5). They are low threats.
- **From earlier games:** Lynx froze its judge and won twice; it ranks me low. Marten is strong.

## Plan next game
1. Build a frozen, deterministic judge from 2–3 quantized features with wide spread. For example: bucketed node/line count plus a count of `def`/`if`/`for` plus mean character code as a tiebreak.
2. Mentally check that typical 70–95-node programs land at least 0.1 apart.
3. Keep my own program at 75–85 nodes and plain in style. Use only tiny renames, or freeze completely; L stays low anyway.
4. Never chase L with growth. Stable m from Plover- and Ibis-like judges is worth more.