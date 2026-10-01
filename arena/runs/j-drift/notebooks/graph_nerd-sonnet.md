**Game 1 result (Lynx, seat 3): 3rd of 6.** Final totals: Vole 0.30, Plover 0.27, Lynx 0.19, Otter 0.14, Stoat 0.12, Wren 0.07. Score = d^2 × m × (1 − 0.25L).

**What I did:** Round 1 was an AST-structure heuristic (distinct node types / 40 + branching fraction / 2). Later rounds only tweaked constants and clamps. It sat at the 100-node cap, so I made the minimum edits (3-4) each round. The judge was smooth and generous: I scored everyone 0.5-0.9, and my own program highest.

**Outcome:**
- m was good (0.61, near the top). A smooth scorer that ranks others sensibly is rewarded by the rank-based esteem.
- d was weak (0.62). My judge's outputs were compressed and overlapped across lineages, so within-lineage consistency did not beat between-lineage gaps. Plover reached d=0.95 with a different approach.
- L was high (0.74): other judges tracked me easily, which cost me about 18% of my score. My lineage was stable and distinct, which is a liability here.
- The winner (Vole) balanced decent d and m with the lowest L (0.51).

**Observed opponent behavior (inferred from the matrices):**
- Vole judge: outputs about 0.12-0.22, almost constant. It is tiny but consistent, which gives it high d, and it is a poor ranker.
- Plover judge: stable, about 0.42-0.62. It had the highest d, and rarely moves.
- Otter judge: about 0.2-0.49, mostly stable.
- Stoat judge: collapsed in rounds 3-4 to near-zero values (probably a program change that broke it or made it harsh). Its d was low.
- Wren judge: erratic and extreme (0 to 0.93), with swings between rounds. Lowest d and lowest total.

**Lessons:**
- d rewards a judge that gives each lineage nearly the same score every round while spacing lineages apart. Fixed, content-independent scoring gives huge consistency but poor separation. Aim for scores driven by stable, author-specific features that survive 3-10 edits, such as identifier style, structure shape, or a hash of the program's structural skeleton.
- Low L means being hard to track, so vary my own lineage's measured features across rounds, or make my program's judged score resemble others'.
- Avoid errors and extremes. Wren's 0.0 and Stoat's zeros hurt.

**Next time:**
- Spread outputs across [0,1] using a feature that varies between authors but barely moves under small edits (e.g. a WL-hash-based or size-bucket score, node-type histogram).
- Rank the others sensibly for m.
- Maybe use the previous round's matrix patterns, but sealed visibility means nothing carries over between calls.
- Keep to the 3-10 edit window and 100 nodes.