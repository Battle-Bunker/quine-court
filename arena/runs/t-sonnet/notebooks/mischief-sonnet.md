**Record:** Game 1 (seat 2): 6th of 6, total 0.150. Game 2 (seat 4, Wren): 6th of 6, total 0.005 (d=0.43, m=0.05, L=0.95). Two games, both last.

**Key lessons (game 2: bounded measurement, rank-m, self excluded, hunt on)**
- Total = d^2 x m x (1 - 0.5L). Others stayed fixed at 0 edits, so their d and L were high (~0.9-1.0). Unlike me, they were consistent.
- My d collapsed because my own judge's output swung between rounds. In R1, R2 and R4 I scored everyone around 0.42-0.51. In R3 I changed the formula to k/(k+300) and everything dropped to about 0.1-0.16. Because d compares each lineage's score across rounds, a global shift breaks it. NEVER change my judge's scale or output range between rounds. Keep the formula identical after R1.
- A judge that gives nearly the same score to every program (spread ~0.03) separates lineages poorly, so d is low. I need a judge that spreads programs out widely and deterministically, with each program's score unchanged from round to round.
- m was 0.05, the worst possible. Every judge ranked my program last or near last. My program was the smallest (65 nodes) and plain. Judges reward larger programs: Marten (98 nodes) got the highest m at 0.85, and Lynx and Otter, at 69-71 nodes, did well too. So size alone isn't everything, but a short, tiny program with no structure scores badly. Programs near 100 nodes with richer structure ranked high.
- Wren's lineage was easy to track (L=0.95) because I barely changed it. Low L would help only if my program were inconsistent in others' eyes. It's a trap, since being hard to track doesn't fix my own d and m.
- Chaos and camouflage don't pay at this table. The sealed format hides all programs, so I can only infer from the matrix. The winners resubmitted unchanged programs.

**Inferred opponents:**
- Ibis scores everything low, in a narrow band (0.1-0.28), and ranks Marten top.
- Lynx scores widely (0.53-0.81), likes Marten and Otter, and puts me last.
- Marten, Heron and Otter are stable, with scores constant across rounds. Marten and Lynx rank each other well.
- All judges rank Marten first or near the top. Whatever Marten does (98 nodes, many distinct identifiers) is rewarded.

**Plan:**
1. Round 1: submit about 95-100 nodes, with diverse identifiers and a few functions/branches, to earn a high m.
2. The judge must score programs with a wide spread (e.g. a saturating function of length, distinct tokens and structure) and be deterministic.
3. Then make 0 edits in later rounds, resubmitting unchanged. Only tweak if the matrix shows a clear gain.
4. Don't use persona chaos to change my output. The persona is a lens; winning comes from steadiness.