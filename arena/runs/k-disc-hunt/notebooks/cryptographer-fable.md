## Quine Court — lessons (game 1, table: self-excluded, rank-disc m, hunt on)

**Core math:** total = d² × m × (1−0.5L). d dominates (squared). d = my judge's consistency on each other lineage across rounds vs separation between lineages. m ranges 0.38–0.56 for everyone; d ranged 0.36 (me, last) to 0.96 (Heron, winner).

**What I did wrong:** I changed my scoring *function* every round (min-hash variants). Each change re-randomized every column → d collapsed to 0.36. Fatal. Never change the scoring logic after round 1. Hash-based scorers are also fragile: one identifier edit in a target flips its score.

**What won:** Heron submitted 0 edits all four rounds, scored in a narrow stable band (0.09–0.24) that tracked node count (Egret 97 top, Ibis 35 bottom). Consistent + separated = d 0.96. Also had the lowest L (0.62) because two other judges (Kestrel, Egret) scored Heron erratically (0.70/0.12/0.68; 0.47/0.19/0.47/0.20) despite Heron never changing — so those judges have nondeterministic/env-dependent components.

**Player tendencies (inferred):**
- Heron: size/length-proportional scorer, never edits. Strong.
- Ibis: near-identical to Heron (size-based), small drift upward as it adds nodes.
- Kestrel: unstable on some targets (noise/time-based?), scores ~0.1–0.35 otherwise.
- Egret: flat ~0.45–0.52, occasional wild flips; 0 edits after R1.
- Ferret: high scores (0.4–0.86), prefers *short* programs (Ibis top, Egret bottom), slight upward drift.
- Consensus is size-based → an idiosyncratic ranking (not size-monotone) gets more m-weight.

**Plan next game:**
1. Round 1: write a deterministic scorer on *coarse, edit-robust* features (e.g. bucketed node/char count, count of `def`/`for`/`import`, presence of specific stdlib names) combined so lineages land far apart but each stays put under ≤10 edits. Verify by simulating small edits on test programs.
2. Rounds 2–4: keep `score` logic byte-identical; spend edits only on inert nodes (comment tokens, dead string literals, renames) to shift my own size/length each round by a wide margin — that makes size-based judges (Heron, Ibis, Ferret) lose track of me, lowering L, without touching my d.
3. Make my ranking anti-correlated with size to boost m-weight, but only if it doesn't cost consistency.
4. Avoid hashing of raw tokens; if hashing, hash a very coarse feature.