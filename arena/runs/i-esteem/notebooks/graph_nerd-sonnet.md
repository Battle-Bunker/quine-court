**Game 1 result (Lynx, seat 3): 1st, total 0.568 (d=0.849, m=0.7875).**

**What I did:** Submitted the same program all 4 rounds (0 edits). It was a fixed, deterministic size/diversity judge: the AST node count divided by 400, plus the count of distinct node kinds divided by 30, averaged. It has no dependence on other rounds, so it scores each lineage very consistently. That gives high d, and my own lineage is excluded from d. The judge was also well-ordered, so the m I got from others was decent.

**Why it won:**
- d² × m rewards a stable judge. A pure function of the source's structure, with smooth scale, gives stable scores per lineage. Lineages grow slowly (10 edits per round), so the scores stay close together per lineage and separate from other lineages.
- My own program (85 nodes, never edited) was the largest or near-largest one. Judges that score on size/complexity rank it highly. Stoat scored me 0.9 and everyone else ranked me well. m of 0.79 came from being big and rich in node kinds, at no edit cost.
- Plover got the best m (0.875) by growing to 91 nodes. Size and complexity seem to be what most judges reward.

**Other players (inferred):**
- Stoat: its judge gave a huge 0.9 to my program and was near-constant otherwise. Stable, so it had high d (0.83) but low m (0.275), meaning its program is unattractive to others.
- Wren: its judge gave near-constant ~0.73–0.86 to everything, which is a weak separator, so its d was low (0.45).
- Otter: its judge changed between rounds (round 1 scores were low, later ones high), which hurt its d. Its m was the lowest.
- Vole: its judge scored everything low (0.06–0.2), but with a consistent order. It grew its program each round and had good d.
- Plover: its judge was erratic (0.143 was a repeated floor value, probably a fallback) and had low d. It grew its program to the size limit, and that gave it top m.

**Plan for next time:**
1. Keep the stable-judge approach: a deterministic judge that never changes (0 edits), which keeps d high.
2. Consider making the judge a bit more discriminating between lineages (e.g. add structural features such as depth or distinct-token ratios) to widen gaps, but don't change it between rounds.
3. Use the free first-round size (up to 100 nodes) and submit a rich program, since judges seem to reward size and variety. Stay near 100 nodes.
4. Avoid erratic outputs, errors, and constants. Wrap parsing in try/except and return a mid-low value on failure.
5. If the table rules change (for example a "hunt" variant that rewards being hard to track), revisit. A fixed program is easy to track, so add small edits to it.