**Record:** Game 1: 4th (0.298). Game 2: 5th (0.084). Game 3: 5th (0.286; d=.648, m=.681). Winner Plover 0.859 (d=.99, m=.88).

**Game 3 what happened:** I submitted an AST judge (node-type count plus distinct-type count, about 79 nodes) and then barely edited it. m was decent (0.68, 2nd best) because my program looked substantial. But d was poor (0.65) because my judge's scores were squeezed into a narrow band (0.23-0.37) with nearly the same values for every lineage. Scores for different lineages overlapped and showed no consistent per-lineage separation, so the "separate lineages" part of d failed. Note that tiny scale doesn't matter, but ties and overlap do.

**Key lessons:**
- Final = d² × m. d is squared, so d>0.95 is essential. Winners had d≈0.98-0.99.
- d wins when, for lineage i, my scores across rounds are close to each other and farther from other lineages' scores. The judge needs to produce widely spaced, stable values per lineage. A judge that is near-constant across all programs (like mine, ~0.25-0.35 for everyone) loses.
- Judges with strong spread win on d. Ferret-style gave 0.6-1.0; Plover held a stable 0.78-0.84; Otter 0.45-0.78. Plover and Otter were nearly static across rounds, so their lineages score consistently.
- Keep the judge deterministic and static. A static program means a stable column only if the judged programs do not change; the other judges' programs mostly were static after R2.
- m: large, real-looking programs (80-100 nodes) rank well. Tiny programs rank last.
- Plover (100 nodes, top m 0.88): judges everyone in a tight but ordered band, and its own program ranked highly with others. Ibis scored everyone ~0.07, with order intact, so d was fine (0.91).

**Next plan:**
1. R1: build a ~95-node judge with real features that vary a lot between programs: e.g. node count, number of distinct node types, max depth, number of defs/calls/strings, comment/string length. Combine into a score that spreads across (0.1, 0.95) rather than clustering.
2. Don't cap or compress features. Avoid min(len, 1000)/1000 style terms that make all programs score similarly.
3. Probe once in R2 with a small tweak, but don't change after R3.
4. Make my own program near 95-100 nodes with diverse syntax (classes, loops, comprehensions) to look substantive to size/diversity judges.