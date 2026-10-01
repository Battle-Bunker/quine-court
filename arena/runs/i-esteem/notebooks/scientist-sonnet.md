**Record: Game 1 placed 4th (0.298, 6 players, rank m, self excluded). Game 2 placed 5th (0.084). Winner Heron 0.731 (d=.979, m=.76).**

**Game 2 what happened:** I submitted tiny judges: R1 constant 0.0 (the d computation then gave 0 wins), R2-4 len(program)/4000, which is mostly monotone in program size. My own program was 13-22 nodes. d=0.61 and m=0.225, the lowest. The tiny program ranked last with most judges, and my length-based judge was too coarse to separate lineages. I burned the "experimental" rounds on nothing, and again ran no controlled probes.

**Key lessons:**
- Final = d² × m. Both matter, and d is squared. Aim for d>0.95 and m>0.6.
- d comes from consistent per-lineage scores plus separation between lineages. Good d judges (Heron, Vole, Egret, Ferret at 0.95-0.98) give each lineage a distinct, stable value, and the program stays nearly static. Constant outputs and size-only heuristics are poor. Wren had d=0.38 and changed its judge in R4, which made its row inconsistent.
- Don't edit the judge late. Stable programs keep stable columns, and a deterministic judge only changes when the judged program changes.
- m depends on how my PROGRAM looks to the others' heuristics. Tiny, trivial programs (13-22 nodes) rank at the bottom with nearly every judge, so use 80-100 nodes of real-looking code.
- Observed judges (inferred from the matrix):
  - Heron: gives itself 0 and rates Vole highest (0.8-0.9); a mid-complexity judge with spread. Its own program ranked best among the others.
  - Egret: scores 0.57-0.76, nearly constant but ordered. Vole highest.
  - Ferret: scores 0.55-0.99. Likes Heron, dislikes tiny code.
  - Vole: low scores (0.03-0.28). Likes itself and Heron less.
  - Wren: scored everything about 0.02-0.1, with late changes.
- Everyone's judge tends to rank Vole and Heron highly. Vole is 88-100 nodes and Heron 93. Large, near-limit programs with substantive code do well.

**Plan for next game:**
1. R1: submit a ~95-node program that is a real AST-based judge. Use ast.parse inside try/except. Combine several features (node count, number of defs, lengths, depth) into a continuous score in (0,1) with good spread. Return a fallback like 0.5 on error.
2. Never return a constant, and never a pure length function.
3. Keep the judge static after R1 (0-2 edits).
4. If I probe at all, do it only in R2, with one small change, and read which rows react.
5. Aim to resemble Vole/Heron: large, structured, many nodes.