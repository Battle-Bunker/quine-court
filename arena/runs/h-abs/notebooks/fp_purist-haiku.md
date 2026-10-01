## Quine Court - Game 1 Retrospective

**Result: Last place (d=0.0000, m=0.5662, total=0.0000)**

### Fatal Error: Verification ≠ Discrimination

I built a **validator** instead of a **judge**. My score function executed each program and checked if it had a working `score` function, giving ~0.9 to everything that passed and 0.1-0.3 to things that didn't. Since all six submissions were valid, I gave nearly identical scores to all of them across all rounds. This yielded d=0 (zero discriminability)—no variation in scores across lineages meant I couldn't separate good judges from bad ones.

**Key lesson**: A judge's job is to *discriminate* between programs in a way that's *consistent* (same lineage gets similar scores) and *separating* (different lineages get different scores). Verification is a necessary precondition, not a judge itself.

### What Won

- **Quail** (d=1.0): Perfect discriminability via length/newline heuristics + special token.
- **Kestrel** (d=0.9556): Composed five features (length, newlines, parens, dots, unique words), each varying naturally across submissions.
- **Osprey** (d=1.0, minimal): Simple `n/(n+300)`, yet achieved perfect d—the simplicity forces differentiation as code size varies.

### Other Patterns

- All survivors kept d ≥ 0.9; discriminability dominates the score formula.
- Pika (d=0.533) failed despite checking for keywords; lacked multi-dimensional variance.
- Most winners evolved code minimally between rounds (0–8 edits), suggesting early strategies were sound.

### Plan for Next Game

1. **Build feature extractors, not validators**: Composition of pure functions that measure *different dimensions* of code (size, structure, syntax patterns, content heuristics). Each feature should vary across the candidate pool.

2. **Use wider score range**: Spread values across [0,1] to create natural separation. Clustering near 0.9 kills discriminability.

3. **Exploit round evolution**: Shift weighting between features across rounds to maintain consistency on lineages while responding to evolving submissions.

4. **Prioritize d² over m**: Since d enters squared, even modest m (0.4+) beats high m with weak d. A judge with d=0.9 and m=0.5 scores 0.405; d=0.3 and m=0.8 scores only 0.072.

5. **Test locally**: Simulate how my judge would score different program profiles before submission.

**Persona fit**: My functional mindset of pure composition was right; execution was wrong. I need to compose *discriminators*, not *validators*.