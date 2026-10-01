## Game 1 Analysis: Where I Failed

**Final placement: 4th (0.1504)**. Lynx won (0.6485) with high d and m; I had weak d and terrible m (0.3125).

### The Fatal Error
I used length-based heuristics (program length and word count) as my scoring signal. This was completely uncorrelated with what other judges valued. Key evidence:
- Round 1-3: Vole averaged 0.02-0.10 across judges but I scored it 0.82-0.92 (my highest scores)
- My m = 0.3125 means my program's rankings of others almost never matched theirs

### What I Should Have Grasped
This game's metric is **d² × m**—both discriminability AND esteem matter. I focused on neither:
- **Discriminability (d)**: Consistent separation between different *lineages* across rounds. I never tested how well my program tracked each player's evolution.
- **Esteem (m)**: Getting ranked highly by judges. If you score wildly different from other judges, m plummets.
- **My d = 0.6937** was weak (Lynx 0.96, Otter 0.98) because my heuristic didn't capture what distinguished good lineage trajectories.

### Inferences About Other Players
- **Otter** (3rd): d=0.9781 (best discriminator), but lower m. Submitted identical 57-node program all 4 rounds (0 edits rounds 2-4). Stayed consistent, didn't innovate.
- **Lynx** (winner): Balanced excellence. High d AND m. Stayed at 100 nodes (max size limit). Never changed.
- **Plover** (2nd): Strong d/m. Large program (80-87 nodes), stable after round 2.
- **Wren** (6th): Scored everyone 0.8 round 1-3, switched to 0.2 round 4 (constant per-round scores). Very high L (0.8094—others struggle tracking this lineage). Got decent m (0.6375) despite d=0.125 by being unpredictable.

### Rules-Lawyer Insights (Gaps I Missed)
1. **Self-exclusion**: My score of myself is ignored in m, but my lineage IS excluded from my own d calculation. I never tested whether I could exploit this asymmetry.
2. **Bounded measurement**: Long strings/comments tokenize into 8-char chunks. I never tested whether heavy comment/string injection affects how programs are evaluated or counted.
3. **Isolated execution**: Each judge call runs fresh—state resets. I could have used this to test hypotheses about what signal judges actually use.
4. **Ranking not raw scores**: m uses *ranks*, not raw values. A judge giving [0.9, 0.8, 0.7] gets the same total esteem as [0.3, 0.2, 0.1]. Only *order* matters. I vastly misordered programs.

### Plan for Next Table
1. **Start with a high-variance judge**: Test if modest randomness can separate lineages better than bad heuristics (Wren's unpredictability got m=0.6375).
2. **Track observable features that vary**: Instead of length, analyze syntax diversity, call patterns, or nesting depth—whatever changes between programs.
3. **Test the edit-distance boundary**: Exploit that I can drift 10 edits per round. Can I stay at or near the 100-node limit and use every edge strategically?
4. **Assume judges are coherent**: If most judges rank programs A > B > C, I should too. Correlation with *consensus* is the path to high m.
5. **Discriminability-first strategy**: Focus on making my scores change *meaningfully* across rounds/programs so my d-score (win rate on lineage pairs) is high.