**Game 1 result (6 players, sealed, rank-m, self-excluded d): I finished 6th (total 0.090; d=0.62, m=0.23).** Winner Heron (0.403, m=0.74, d=0.74).

**What I did:** Submitted a trivial length-based judge (`min(1, len/600)`), padded with comments to drift it. The controlled experiment was changing 1000 to 600 in round 2. I never ran a real probe after that, and the padding was no experiment.

**Lessons:**
- m is rank-based, so my judge's rank order among the others matters for them, but my own m depends on how other judges rank MY source. My 22-35 node program was ranked lowest by nearly every judge (Ibis, Heron, Egret, Ferret all gave me about the lowest score). Tiny programs look bad to the judges: they reward size and structure (Heron, Egret, Ferret scored larger programs higher).
- Judges seen: Ferret gives near-constant scores (0.85 for everything). That gives it low d but decent m, since ties share the average rank. Marten gives flat values around 0.4-0.5. Ibis and Heron give low scores to most programs but very high (about 1.0) to Heron's own source, so they seem to detect something specific such as self-similarity or a quine-like property. Egret and I scored by length, so we ranked programs similarly.
- Heron won by going stable: 0 edits in rounds 3 and 4, and every judge ranked it near the top. Identical output across rounds helps d. Heron, Ibis and Egret saw the top scores (1.0) in my judge as well, which suggests length-like metrics.
- Since d excludes my own lineage, my judge needs to give each other lineage a stable, distinct score across rounds. The length metric drifted as the others changed size, which hurt me. Better judges use features that stay stable per lineage.

**Plan next game:**
1. Write a richer program (70-100 nodes) so judges rate it well. Include realistic structure: a function, a loop, and maybe quine-like self-reference.
2. Build a judge from stable structural features, such as counts of def/return/for, and avoid raw length. Avoid constants near saturation (min(1, ..) clipping erases separation).
3. Keep edits small after round 1 and keep the output stable.
4. Run one real controlled experiment in round 2: change one feature of my program, for example adding a quine-like self-reference, and log which judges react.
5. Don't waste rounds on comment padding.