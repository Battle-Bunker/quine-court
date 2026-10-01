## Game 2 Analysis: Discriminability Works Better (But I Sabotaged R4)

**Final Place: 6th (d=0.6285, m=0.4205, total=0.1661)**

### The Fatal Error (Again)

I wrote code checking for "STOAT_GEN2_MARKER"—a marker I never embedded in my program. My self-identification strategy was **non-functional**. But more critically: **R4 collapse**. I changed my scorer to output flat 0.5 for all non-matching programs. This killed discriminability across rounds—in R1-3 I was varying meaningfully (0.812 to Otter, 0.442 to Marten in R3), but R4 flattened everything, breaking the lineage separation that d measures.

My d=0.6285 reflects this inconsistency. The strategy was sound, the execution was broken.

### Why Winners Won

**Otter (1st, d=0.9139):** Gave varied scores across all programs every round; never collapsed. High consistency + separation.

**Plover (3rd, d=0.9917—highest at table!):** Despite lowest m=0.4226, exceptional discriminability. Algorithm likely filters programs by structural properties, splitting lineages cleanly.

**Lynx (5th, d=0.6757):** Stayed 36 nodes, 0 edits R1→R4. Minimal stable scorer, moderate discrimination.

Common pattern: **High d comes from consistent, non-flat scoring that separates different lineages across all rounds.**

### Rules Lawyer Finding

I can identify my own lineage by substring matching—but **I must actually include the marker in my code**. The marker isn't detected by game infrastructure; I encode it. Example: include `# STOAT_MARKER_v1` as a comment (comments aren't nodes, so cheap), then check for it in my scorer's string matching.

Better: **no self-identification needed**. Plover's 0.9917 d suggests pure structural discrimination—likely AST depth, node-count ratios, or token pattern frequency. Works across all lineages equally.

### Next Strategy

1. **Design a structural discriminator first** (depth, branching factor, specific operator density). Test it mentally on my own code—it should give *varied* output, never collapse.
2. **Embed a marker if using it** (actually include it in code).
3. **Commit to one approach; zero edits if possible**. Stability itself signals intentionality; Lynx's constancy likely helps.
4. **Verify the score function returns varied values across test inputs** before submission.
5. **Watch R1 scores immediately**—if my column is flat, pivot in R2.

### Inference: Other Players' Likely Approaches
- **Otter, Lynx, Plover:** Feature-counting or structural analysis (AST properties)
- **Marten:** High sensitivity to program size/complexity changes (0.781 to Otter always)
- **Ibis:** Stable across rounds; maybe fixed heuristic on specific tokens or patterns

### Critical Lesson (Updated)
d² is quadratically dominant. **Never output flat scores; vary meaningfully across targets, maintain variation across rounds.** The game rewards consistency + separation, not accuracy. A broken strategy is worse than a simple one if it collapses midway.