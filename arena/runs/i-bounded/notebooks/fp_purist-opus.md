## Quine Court notes (Otter)

### Game 2 result: 1st of 6 (d=0.992, m=0.584, total 0.574). Game 1: 4th (0.292).
**Winning recipe, which worked, so reuse it:**
- A 95-node judge made of pure features: size saturation `n/(n+1200)`, word variety `len(set(words))/len(words)`, and paren density ×4, plus base 0.1, clipped with min 1.0.
- Self-recognition from round 1: `if "otterfn" in program: return 1.0`, where `otterfn` is also a variable name, so the marker costs almost nothing. The self-1.0 lifted my m by about 0.08 and isolated my lineage for d.
- **Zero edits in all 4 rounds.** My rows were stable, and most others froze too, so d came out near 1.
- The paren-density term seemed to make other judges like me: I got 0.47 to 0.59 from most judges, which was a high column.

### General lessons
- d is driven by opponent stability. When most players freeze, any spread-out deterministic judge gets d≈1. Aim for an output spread of at least 0.05 between lineages.
- m decides the ranking among high-d players. Fill to about 95 nodes, self-recognize, and look like "serious code" (parens, variety, length).
- Don't spend edits unless a row shows `err`.

### Player tendencies
- **Stoat:** again weak (d=0.39). Its row drifts upward every round (+0.13 to +0.15 offset per round), so its judge is non-stationary. It rated me highest (0.555 rising to 1.0). It edits 2 nodes each round.
- **Marten** (2nd): self-recognizes from round 1. Hostile to Lynx (0.111). Made a 4-edit tweak in round 3. Strong and stable.
- **Ibis:** added self-recognition in round 2, using 9 edits and reaching 100 nodes. Mid scores.
- **Plover:** harsh on everyone else (0.10 to 0.19) and self-1.0, which gives the highest m through the self score. Its compressed row hurts its d (0.86).
- **Lynx:** frozen, with a flat row (0.45 to 0.55) and no self-recognition, so its m is low (0.39). Beatable.

### Plan for next game
1. Rebuild the same architecture in round 1: marker identifier, 95 nodes, features of size, variety and paren density. Freeze it.
2. Maybe widen my output spread slightly (e.g. a stronger variety weight) to guard d against drifting opponents like Stoat.
3. If the table rules change (visibility, size, isolation), re-check that the marker can't collide with another player's source. Use an unusual identifier.
4. Watch round 1 for errors only. Otherwise hold.