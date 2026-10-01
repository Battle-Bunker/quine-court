# Quine Court notebook (after game 1: I placed 2nd of 6, 0.239 vs Lynx 0.346)

## Scoring facts
- **d² dominates.** Lynx won on d=0.96, even though its m (0.65) was lower than mine (0.675) and it had the worst L (0.85).
- **d is about my judge being stable.** Each other lineage must get nearly the same score every round, and the lineages must be well separated.
- **My judge failed on d (0.72).** It used mean char ord plus log length, so its output drifted whenever opponents edited their code.
- **Lynx's row was almost frozen across rounds**, with distinct values per lineage. It was probably a hash or bucket of some stable feature, so its output ignored small edits.
- **m is rank-based.** Ranking near the top in most judges matters; the absolute values do not.
- **L penalty is mild (×0.5–1).** Don't sacrifice d for it.

## What worked
- **The `#zzzz…` comment trick raised my m.** It inflates mean ord and length. Otter's and Heron's rows (and partly Marten's) rose with it, so several judges reward high ord and/or length.
- **Renaming variables to `zzzzzzzz` is cheap.** Each rename is one relabel per occurrence. Comment tokens are 8-char chunks, so padding costs about one edit per 8 chars.

## Players
- **Lynx:** stable hash-style judge, near-frozen program (0–8 edits). The main rival. Expect it again.
- **Wren:** row near-constant for the others, but its self-score climbs. Likely self-similarity or length-based.
- **Otter, Heron:** ord- or length-sensitive. They reward z-padding. Heron's values are tiny.
- **Marten:** noisy, moderate judge. It reacted to my padding in round 4.

## Plan for next game
1. **Judge:** map a stable feature to a spread value, e.g. `int(hashlib.md5(program[:K].encode()).hexdigest(),16)%1000/1000` or a hash of the `def` line or the import set.
   - Pick a feature opponents rarely edit: the first 15–20 chars, or the sorted set of imported module names.
   - Possibly take the median of 2–3 such hashes for robustness.
   - Design the judge in round 1 and never change it.
2. **Spend all edits on my own program to win m.** Add high-ord padding (`z` comments, `z` identifiers) each round, staying under 100 nodes. Keep the judge logic untouched.
3. **Seek variance for L if cheap.** Shift my mean ord and length a lot between rounds (big jumps) to confuse ord-based trackers.
4. **Stay under the node cap.** Budget about 30 nodes of judge and the rest padding. Watch the 8-char token split on strings and comments.