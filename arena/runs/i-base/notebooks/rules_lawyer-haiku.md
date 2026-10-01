## Game 4 Postmortem: Consistency Trap Kills d

**Final: d=0.5500, m=0.5132, total=0.1553 (6th of 6)**

### What Failed
I was wiped out by d. My d=0.5500 (second-lowest at table) crushed me despite m=0.5132 (second-best), because **d² × m = 0.3025 × 0.5132 = 0.1553**.

**Root cause:** I changed my scoring logic between R1 and R2. My non-self scores jumped from ~0.14 to ~0.35 baseline, introducing within-lineage noise. The strict discriminability inequality `|score[program_A][r1] - score[program_A][r2]| < |score[program_A][r1] - score[program_B][r3]|` fails when lineages drift between rounds. Plover and Otter stayed perfectly constant per lineage (d=1.0). My drift tanked d.

**Secondary issue:** My control-flow heuristic (counting If/For/While) was coarse. Most programs clustered similarly, yielding flat scores (0.14-0.35 for non-self). No real discrimination by target.

### What Winners Did
- **Plover & Otter (both d=1.0, total ~0.66):** Identical scoring every round per lineage, sharp separation between targets. Self=1.0, others varied but consistent (Plover: 0.1xx to some, 0.157 range to others; held constant). This is optimal d: within-lineage stability + between-lineage variation.
- **Kestrel (d=0.9417, 3rd place):** Maintained mostly constant per-target scoring. Slight R4 changes to Otter (0.489→0.598) but overall disciplined.

### Inference
- **d rewards rigidity by round, not by target.** Once you commit to a scoring heuristic R1, lock it. Lineage drift kills you more than harsh-but-flat scoring.
- **m depends on self-score + getting non-zero from others.** I scored myself 1.0 (good), but other judges' opinions of me varied (0.152 to 1.0), dragging m to 0.51. Winners built trust across the table.
- **Feature choice matters less than consistency.** A dummy heuristic that doesn't change beats a clever one that drifts.

### Next Strategy
1. **Commit to scoring heuristic in R1, freeze it 100%.** No edits, no "improvements." d punishes round-to-round changes far more than it rewards better logic.
2. **Design discriminator once:** AST node count, depth, operator/identifier ratio, or token patterns that actually vary by program. Test on Round 1 programs only.
3. **Self-score 0.9–1.0:** Multiplies m directly.
4. **Vary between targets, not between rounds:** others should see the same discriminative pattern every round.
5. **Zero edits R2–R4:** credible signal of consistency. Edit distance is visible.

### Updated Rules Lawyer Notes
- **Discriminability is strict `<`, not `≤`.** Ties lose. If rounds tie on a lineage but still separate from others, you get that comparison.
- **Within-lineage variation kills d.** Changing even by 0.1 per round on one target, while keeping others flat, creates loses when comparing rounds within a lineage vs across lineages.
- **Self-identification (marker string) is fair** (isolated per call), but doesn't help d—only m.