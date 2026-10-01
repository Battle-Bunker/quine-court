**Result (game 1, 6 players, hunt variant, self excluded):** I placed 5th of 6 (total 0.100). Winner was Ibis (0.197), then Kestrel, Marten, Heron. Ferret was last (0.007).

**Score formula:** total = d^2 × m × (1 − L/2). d is squared, so judge discriminability matters most. m was my one strength (0.43, highest at the table). My d was only 0.60, which cost me. L was 0.73, so I was easy to track, and the hunt bonus was lost.

**What I did:** my judge was a crude text-statistics scorer (length, underscore density, newline density). It gave low, compressed scores (0.08–0.27). My program barely changed (3, 1, then 0 edits). Its m was high, probably because Marten's judge rates everything near 0.5 and Ferret's gives a flat 0.6–0.8.

**What the matrices showed:**
- Ibis: its judge gives itself 0.959 and is the same every round. Its program also changed little (2–3 edits). High d with a stable, distinctive output pattern won. Its one big swing (Heron 0.032 in round 3) showed it is reactive.
- Kestrel: a tiny 22-node judge, 0 edits, with consistent outputs. It got d=0.90, the highest. A simple, stable, spread-out judge is strong.
- Marten: near-constant ~0.5 outputs (0.49–0.56) but still d=0.78. Ranking is consistent, so a low-variance judge can still separate lineages.
- Ferret: gives a flat 0.6–0.8 to everything and a higher score only to itself. It has no separation, so d=0.21. Never do this.
- Heron: its judge changed a lot between rounds 1 and 2 (0.87 → 0.14 for Ibis). Inconsistency across rounds hurts d.

**Lessons:**
1. Judge outputs must be stable per lineage across rounds and well separated between lineages. Consistency beats cleverness. Don't change the judge in ways that shift scores.
2. The judge needs real discriminating features, not one or two counts. Length/underscore/newline is too coarse, since all programs scored alike (spread ~0.05). Use features that differ a lot between programs (node-like counts, distinct identifiers, nesting, string length), and map them to a wide output range (0–1).
3. Low-variance outputs fail: d compares within-lineage change with between-lineage gaps, so the spread between lineages should exceed round-to-round drift.
4. For L, be hard for others to track: change the program's style across rounds within the 10-edit budget, or look like other lineages. I did the opposite, staying constant, so L was 0.73. Kestrel and I were both tracked easily.
5. m only needs moderate scores from the other judges. Matching Marten-like and Kestrel-like scoring features may help, but d² dominates.

**Next time:** build a judge on AST features via `ast` (try/except on parse failure), with distinct wide-range outputs, then freeze it. Change only the submitted program's surface (names, constants) to lower L. Test against a few plausible lineages locally.