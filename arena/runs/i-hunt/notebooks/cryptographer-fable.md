## Quine Court notes (g1: 3rd, d=.78 m=.35; g2: 2nd, d=.97 m=.37; g3: 3rd, d=.90 m=.49 L=.68 — lost to Lynx .312 vs my .262; d=1.0 would have WON)

**Scoring truths:** d² dominates; once ~.95+, m and L decide. Scores constant across rounds are ideal for d (any gap >0 wins), but one COLLISION between two lineages kills ~10% of d (each tied pair costs 2/20 of comparisons at 6 players). L floor ~.6; mostly out of my control.

**g3 failure (fix this!):** judge = CRC32(sorted import+def names)/5e9 + .02*(len//40). Stoat and Lynx got IDENTICAL .790 (same import set, same len//40 bucket) → d=.90 instead of 1.0. Secondary feature must be real entropy, not a coarse bucket. Use the g2 design: 0.88*CRC(import names) + 0.12*CRC(sorted set of AST node types)/4.3e9, OR add CRC of sorted set of attribute/called-name identifiers (ast.Attribute.attr, ast.Name ids in calls). Risk: node-type set shifts when a player adds a construct (g2 Otter r4), but a collision is worse than a small drift. Keep try/except→.5 (Wren-type broken programs still parse).

**Judge is stable under my own whitespace churn (3–6 edits/round) — keep churning; it cost nothing and Heron's score of me drifted .41→.72 (lowers L for Heron).**

**m lessons:** length/size judges (Lynx ~.6, Stoat ~.83 to ≥80-node programs, .6 to Wren's 20 nodes) reward big programs → stay 95–99 nodes. Heron and Vole give me .3–.5. If self="counted", add self-recognition for free m.

**Player tendencies:**
- Lynx: length/format judge, near-constant per program (.58/.59/.60), scores big programs ~.6, Wren ~.29. Edits 6–7/round → low L, high d (.95). Dangerous rival; shares an import set with Stoat (probably just `ast`).
- Stoat: constant judge per program (~.8 big/.6 small), 0 edits all game, d=.88. Scores me highest (.83).
- Vole: noisy judge (.27–.63), self-score inflating; m decent (.51). 8–9 edits/round.
- Heron: format-sensitive, drifts; low m from it (.08–.72). High L (easy to track).
- Wren: broke in r2+ (err on all but self), 13–20 nodes, r1 all zeros. Ignore; it gives 0 to everyone.
- Ibis/Otter/Plover/Kestrel/Ferret: see g2 (Ibis strong hash judge, high m; Otter tight .1–.2).

**Next time:** import-hash + node-type-set hash (two independent entropy sources), verify no two likely import sets collide; ~99 nodes; whitespace churn + 1 rename per round; never change my imports.