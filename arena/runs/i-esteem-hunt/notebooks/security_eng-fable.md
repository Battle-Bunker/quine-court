# Quine Court notebook (Plover)

## Results (rules all games: self excluded, rank-m, hunt on, sealed, bounded, 100 nodes, 10 edits)
- G1: 2nd. Judge = mean crc32 of ast.Name ids; d lost to tiny/rewritten programs.
- G2: 3rd. crc32 of sorted SET of AST node-type names → d=0.975. Lost on m (0.51).
- G3: 1st (0.454). Same judge, d=1.000, m=0.6875, L=0.68.
- G4: **1st (0.338 vs Stoat 0.279)**. Same judge, d=1.000 again. m=0.6125 (best), but L=0.897 — churn barely worked this time; margin came from d and m.

## What decides the score
- d^2 dominates. Node-type-set crc32 = perfect d four games running; nobody changes their node-type set within a game. NEVER change the logic; only dead code/identifiers/except-constant.
- m rank-based. Winning pattern: ~80–95 nodes, imports, comprehension, try/except, no strings. Egret/Otter rank me top, Wren top-3, Kestrel/Stoat mid-low. Stoat hates my size? (scores me 0.208, near bottom) — Stoat scored Wren (44 nodes) highest → likely rewards smallness/simplicity. Can't win everyone.
- L: G4 churn (names, except constant 0.37/0.41/0.29/0.53, node count 91→95→91→95) only moved Wren (0.88/0.968/0.80/0.876) and Kestrel slightly. Stoat/Egret/Otter nearly static on me → L 0.90. Lesson: alternating between two states is weak; need ≥3 distinct node counts and bigger structural dead-code swings (add/remove a dead `if`/loop, not just assignments) to shake content-hash judges. Still, L only scales 0.55–1.0; d and m matter far more.

## Player tendencies
- Stoat: 0 edits all game, scores fixed (d=1.0), favours Wren (small) and itself; scores me low. Pure static hash-ish on something I can't shake.
- Egret: ~0.45–0.68 band, ranks me top, drifts slightly; d≈0.95; got terrible m (0.29).
- Otter: ranks me top (0.63), low on itself; edits late (9/round) → d drops to 0.90.
- Kestrel: 98 nodes, 0 edits, flat low scale (0.37–0.57), ranks Stoat/Kestrel top, me low; L=1.0 (perfectly tracked, static).
- Wren: 44 nodes, size-rewarding (big programs ≥0.8, itself 0.4), scale drifts → d 0.74. Reacts to my node count.
- Ibis: scores Plover/Otter/Kestrel high; reacts to surface changes. Ferret: coarse buckets, loves Ibis. Lynx: 0 edits, high d. Marten: rewards Lynx.

## Plan next game
1. Identical judge (crc32 of sorted node-type set, try/except constant). Verify no crash paths.
2. Round 1 ~85 nodes, diverse constructs. Each round 9–10 edits: rename 2 names, new except constant, add/remove a dead compound statement so node count cycles through ≥3 values (e.g. 85→93→79→89).
3. If a size-rewarding judge (Wren) is present, lean larger; don't drop under ~80.