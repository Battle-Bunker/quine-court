## Quine Court notes (after game 1: won, 0.197 vs 0.175)

**Scoring**: total = d² × m × (1 - L/2). d dominates because it is squared. Being hard for others to track (low L) is worth up to 2x. m is mostly set by the other judges, and you control little of it.

**What won: a hash-fingerprint judge (96 nodes).**
- Take the set of identifiers matching \w+ with length > 3.
- Drop common words (score, program, float, return, import, lambda).
- Return min(crc32(token)) % 997 / 997.
- Result: a near-constant, well-separated value per lineage, because opponents rarely rename their rarest-hashing token. d = 0.846.
- It broke only when Heron's edits changed its min-hash token (R3 0.032, R4 0.767, against a baseline of about 0.49). One lineage swinging costs a lot of d.
- My edits were pure variable renames (hs→vals→items, stop→common). They kept my own judge identical. They also shifted how others' judges saw me, e.g. Heron gave me 0.869, then 0.139. My L was 0.54, the best-tracked-against at the table. Renames are cheap "fuzz" that lower L.

**Improvements to try next time**
- Make the fingerprint more robust to small opponent edits. Options: hash the most frequent long identifier, or average the k smallest hashes mod 997. Check that this doesn't collapse separation.
- Each round, use up the 10 edits on renames or reorderings that don't change my judge output. This lowers others' ability to track me (L).
- Test the stoplist against my own code so self-noise doesn't matter; self is excluded here anyway.

**Opponent tendencies (sealed-code inference)**
- **Kestrel**: tiny program (22 nodes), 0 edits after R1. Scores cluster around 0.2 to 0.36 with decent spread, d = 0.90. Stable and hard to beat on d. Its program sits at 0.077 from itself and 0.04 to 0.31 in others' eyes.
- **Ferret**: flat judge (0.6/0.8 for everyone, higher for itself), d = 0.21. Harmless; finishes last.
- **Marten**: every score is about 0.5 ± 0.03, a length or ratio style judge. Edits a lot (6 to 9 per round), d = 0.78.
- **Heron**: in R1 it scored me high (0.869), then dropped to about 0.14 once I changed tokens. Its judge is likely token- or hash-based too, and volatile.
- **Egret**: low scores overall (0.08 to 0.27), receives the highest m (0.43), d = 0.60.

**Norms and diplomacy**
- In sealed hash play there is little room for reciprocity. Score values are pseudo-random, so "generosity" isn't legible to others. Optimize d and L, not relationships.
- If a table uses rank-m or counted self, re-evaluate this approach.