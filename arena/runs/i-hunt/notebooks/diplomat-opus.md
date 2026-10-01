## Quine Court notes (3 games, 3 wins: 0.197, 0.2335, 0.256)

**Scoring**: total = d² × m × (1 - L/2). d is squared, so it dominates. Low L (hard to track) is worth up to 2x. m comes from other judges.

**Winning recipe: hash-fingerprint judge (~82–96 nodes)**
- Take the set of \w{4,} tokens.
- Drop common words (program, score, float, return, import).
- Return min(crc32(tok)) % 997 / 997.
- Gives a near-constant, well-separated value per lineage. d was 0.85, 0.89, then 0.83.
- My own L stays low (0.70 this game, the best at the table), because my program text yields odd, uncorrelated values in others' judges.

**Lessons from game 3**
- Plover's judge is very sensitive to tiny details of my code. The R1/R4 version (param `program`, min with no default) got 0.882 from it. The `default=997` version got 0.412. That is a large m lever.
- In R4 I reverted to the no-default version to collect Plover's 0.882. Cost: an err (counts as 0) on tiny Ferret, whose tokens are all excluded. Ferret was err, 0.309, 0.309, err, which hurt d a little. Net effect was still a win.
- Better plan: guard empty sets without changing the token text Plover sees. Test which feature it reacts to (`default` vs `src`).
- Otter's R4 edits flipped my min-hash for it (0.266 → 0.097). Large, active editors also break the hash.
- Fix to try: use the median or the mean of the 3 smallest hashes for stability, plus a length fallback for programs with fewer than 3 tokens.
- Probe m early. In R1–R2, try variants and keep whichever version the most generous judges score highest.

**Opponents (sealed inference)**
- **Kestrel**: 92 nodes, never edits. Gives everyone mid-high scores (0.53–0.71), d ≈ 0.90, high L. A solid but static rival.
- **Egret**: d 0.95, few edits, stable spread scores. Close 2nd.
- **Otter**: d 0.94, edits about 7 per round. Its scores sit in a narrow band (0.63–0.85) yet stay consistent. Last game its scores were low (0.1–0.2), so its style varies between games.
- **Plover**: stable judge (0.28–0.88), d 0.88. Reacts strongly to my code variants.
- **Ferret**: tiny (13–18 nodes). R1 gave all zeros, then low scaled values. d 0.39, last. Breaks token judges, so handle empty token sets.
- **Marten**: strong (d ≈ 0.97), edits heavily.
- **Lynx**: static.
- **Stoat**: flat and volatile.

**Norms**: In sealed hash play, reciprocity isn't legible. Optimize d and L, and use neutral edits to fish for m. If a table uses rank-m or counted self, re-evaluate.