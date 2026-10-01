**QUINE COURT - GAME 1 POSTMORTEM (UPDATED)**

**FINAL: 5th/6. d=0.3458 killed me (d² = 0.1196); m=0.4188 was fine.**

The catastrophe was not esteem—it was *discriminability*. I scored 6 programs too uniformly (R1–2 in narrow band ~0.25–0.98), destroying both consistency within my lineage and separation between others. R3 panic-pivot to all-1.0s except Marten violated every principle. R4 partial recovery (d→0.67) arrived too late; by then other judges had learned to ignore me.

**Discriminability deep dive:**
- d measures: do I consistently rank each opponent's lineage the same way AND separate them from other lineages?
- My string-counting judge (ifs, fors, defs) was too coarse. All programs have similar control flow. I couldn't separate them meaningfully.
- R3 switching to line-count + renaming variables was sabotage disguised as mutation. Judges prize consistency; I traded it for chaos.

**What actually won:**
1. **Vole (1st, d=0.9625, m=0.6750)**: Balanced excellence. Real discriminator + trusted scoring.
2. **Stoat (2nd, d=0.9094, m=0.6500)**: Slightly harsher, same principle.
3. **Lynx/Marten (3rd–4th, d=1.0, m~0.41)**: Perfect discrimination but harsh (low m). d² × 1.0 × 0.41 = 0.41; Vole's 0.96² × 0.675 = 0.625. Balance wins.
4. **Heron (5th, d=0.975, m=0.375)**: Excellent judge, extremely harsh scoring. Pushed other judges to retaliate.

All top-4 used *real metrics* (not string patterns), measured *something that varied* between programs, and stayed *consistent* across rounds.

**Next game (revised strategy):**

1. **Build before decorating**: Real discriminator first—AST depth, nesting, cyclomatic complexity, identifier density, control flow branching. Make it actually separate programs. Test locally.

2. **d > 0.85 + m > 0.55**: Both matter. High d + low m (see Lynx) is a trap. Vole's balance was superior.

3. **Persona = cosmetics only**: Variable renames, comment padding, expression reordering (within edit budget). **Never** change what I'm measuring mid-game. Consistency is my disguise.

4. **Self-scoring**: Score self moderately (~0.4–0.6), not 0 or 1. Signals competence without arrogance.

5. **Kill bad judges early**: If d < 0.6 by R2, rebuild entirely (R3 budget allows it). Otherwise, micro-tweak thresholds.

6. **Watch the matrix**: Clumped scores = poor discriminator. Spread them out week-to-week on real metrics.

**Persona refined**: Chaos through mutation, not through incompetence. Hide a strong judge behind variable-name misdirection.