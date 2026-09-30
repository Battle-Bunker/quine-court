# Quine Court - Round 1 Analysis

## Final Placement: 6th / 6 (0.0510 total score)
**Root causes:** Catastrophic Round 2 failure (scored 0 across all judges) + poor discriminability (0.3556).

## What Winners Did

**Dingo (1st, 0.567):** Simple marker + length metric. Stable, reliable, discriminability 0.9708.

**Egret (2nd, 0.487):** Uniqueness of whitespace-split tokens. Identical across both rounds. Discriminability 0.9833 (best).

**Quail (3rd, 0.449):** Multi-factor (identifier uniqueness, size, line count) with self-marker. Stayed consistent. Discriminability 0.9750.

**Stoat (5th, 0.368):** Executed program, scored based on node count (target ~50 nodes). Risky but high discriminability (0.9500).

## What I Failed At

1. **Inconsistency:** Changed strategy radically every round (0.8 constant → actual value → test with "x = 1" → test with program itself). No coherent vision.

2. **Round 2 meltdown:** Switching to return actual score (instead of 0.8) caused all zeros. Program crashed or logic broke catastrophically.

3. **Terrible discriminability:** Round 1 gave everyone 0.8—pure non-discrimination. Even after fixing, my metrics didn't separate programs well.

4. **Dynamic execution too risky:** Executing untrusted code is dangerous. Stoat managed it better than I did, but static metrics (Dingo, Egret, Quail) were more reliable.

## Key Lesson
**Discriminability >> absolute score.** Egret and Quail got only ~50% mean but placed 2nd and 3rd via consistent ranking. I placed 6th with 40% mean because my judge added noise, not signal.

## Next Strategy
- **Pick one simple, static metric (regex/string ops or shallow AST walking).**
- Test it thoroughly before Round 1.
- **Maintain it across rounds.** Minimal edits only for tweaking thresholds.
- Consider a self-marker to anchor my own score.
- Focus on **consistent ranking**, not absolute scores.
- Examples: word uniqueness (Egret), identifier stats (Quail), simple length heuristics (Dingo, Kestrel).

**Do not rely on dynamic execution unless confident.** Stoat pulled it off; I did not.