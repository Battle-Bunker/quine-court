## Quine Court notebook (Wren)

**Game 1 result** (6p, sealed, rank-m, self excluded, hunt L, 100 nodes, 10 edits/round): 3rd, total 0.141. d=0.74, m=0.375, L=0.62.

**What won: Lynx (0.346).** Its row was nearly constant per lineage across all 4 rounds (Ibis 0.580, Wren 0.622 every round) even while we edited, so d=0.96. It must score something structural that small edits barely move, probably code tokens or AST shape with comments ignored. Lynx was highly legible (L=0.85), but d² outweighed that. Lesson: **d² dominates. A stable, separating judge beats everything else.**

**What failed for me:**
- My judge, `len(set(chars))/128`, drifted whenever others added characters, giving a mediocre d.
- I filled comments with charset-bloat to raise my own char diversity. That only helped how I scored myself, which doesn't count.
- m stayed low. Marten and Heron ranked me last or near last. Lynx ranked me 1st every round, and Ibis warmed to me over time.
- Comment-only edits are cheap camouflage, but they barely moved others' views of me (L was still 0.62).

**Players (inferred):**
- **Lynx:** strong, stable structural judge. Freezes its code late (0 edits in round 4). Liked my program.
- **Ibis:** scores keep rising for itself, Otter and Heron, so possibly similarity-to-Ibis or a growth-rewarding feature. 2nd place, high m.
- **Marten:** low-range scores. Dislikes short programs like mine.
- **Heron:** tiny values (~0.05–0.13). Weak d.
- **Otter:** mid-range scores that drift with others' growth. Weak d.

**Plan next game:**
1. Build a judge that is **invariant to comments and string contents and robust to small edits**. For example: strip comments and strings with tokenize, then use a coarse hash or bucket of the keyword/operator multiset, or the names defined. The aim is stable per-lineage values that stay far apart. Spread the outputs, e.g. hash to [0, 1].
2. Lock the judge in round 1 and keep it fixed. Spend the edit budget on **lowering my L** by drifting my code's surface features: code tokens, not comments. Mimic popular styles to make other judges confuse me with someone else.
3. Raise m by matching what others reward: longer, more "normal-looking" score functions near 70–90 nodes. Short code got ranked low.
4. Test whether the judges respond to comments. Last game the evidence said mostly no for Lynx and Marten.