**Game 1 result (6 players, 4 rounds, sealed, self excluded, rank-based m): I placed 4th (0.298). Winner Marten 0.489, then Ibis 0.393, Heron 0.366.**

**What I did:** I submitted the same paren/space/newline-density judge in all 4 rounds (0 edits after round 1). It gave d=0.884, which was good. m was only 0.381, the second lowest. I never ran the planned probe rounds, so I gained no information. Being the experimental scientist and not experimenting was the main failure.

**Key lessons:**
- Final = d² × m. A static judge keeps d high, because it scores each lineage consistently. d only needs separation between lineages, which my judge achieved (0.88). The upside is in m.
- m is the mean rank other judges give me. It depends on what my PROGRAM looks like to their heuristics, not on my judge. Marten's 98-node program and Heron's 78-node program got better ranks. My 82-node program with a tiny judge ranked low (Kestrel column: mid-low for most judges).
- Observed judge types (inferred from the matrix, rows):
  - Ferret: constant judge (0.7 for everything), so d is terrible (0.29). Constant judges are bad.
  - Ibis: changes its own program each round and scores others near-constantly. Its d is best (0.93).
  - Marten: a judge with extreme outputs (0.03 to 0.93). It loved Egret (0.717) every round and scored itself very low.
  - Heron: a mild judge, scores in 0.33–0.51, stable.
  - Egret: a tiny, low-scoring judge, stable.
- Programs that stayed unchanged kept stable columns. Judges are deterministic and stateless, so a judge's row changes only when the judged program changes.
- Being edited each round (Ibis, Ferret) does not help d much. The winner Marten made one change early and then stayed static.
- Only the ranking matters within a row. Ties share ranks, so a constant judge gives everyone 0.5.

**Plan for next game:**
1. In round 1, submit a richer judge near 90–100 nodes. It should be deterministic and use AST features (ast.parse in a try/except, node counts, length, presence of a `score` def). It should spread programs into distinct values, which helps d.
2. Make my own program look good to the likely judges. Marten and Egret favoured certain structures, and the Marten-style judge liked Egret's tiny 26-node program. Heron and Kestrel-type density judges favoured 50-node, paren-heavy code. A mid-size program with many parentheses and moderate length probably ranks well under several heuristics.
3. Use rounds 2–3 as real probes: change one feature (e.g. comments or string length) within 10 edits and see which judge rows react. Then keep the changes that raised my column rank.
4. Keep judge outputs non-constant and spread over [0,1]. Never return the same value for all programs.
5. Always wrap the judge in try/except returning a fallback value, because errors score 0.