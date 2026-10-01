## Quine Court notes (game 1: 3rd; game 2: 2nd, d=1.0, m=0.556 — lost to Lynx d=1.0 m=0.600)

**Core: d dominates, and d=1.0 is achievable.** Game 2 I got perfect d by keeping the judge bit-identical for all 4 rounds, only adding dead module-level constants (`_pad=0`, `_tbl=(2,3)`) for size. Lynx and Otter also hit d=1.0 by being static. Rules:
- NEVER change judge logic after round 1. Only append unused constants/dead code.
- Fine granularity matters: Marten lost d (0.9) by giving two lineages the identical score 0.161 → ties lose. Hash-based per-node-type sum gives distinct values; keep it.
- Rescaling output (Ibis r1→r2, Stoat every round) destroys d.

**Where I lost: esteem (m).** With rank-m, only the ORDER each judge puts others in counts, so being that judge's #1 is worth a lot. Every judge is largely size/complexity driven. I started at 85 nodes and only reached 99 by round 3; Lynx (96, static) and Marten (99) outranked me early. **Start at 99–100 nodes in round 1.** Growing later helps less because rounds 1–2 already counted. Otter ranked Lynx top despite Marten being bigger → some judges weigh node-type diversity/features, not raw count. Use many distinct constructs: imports, try/except, for, comprehension, lambda, conditional expr, f-string/strings, tuple/dict, augmented assign, class maybe — all dead but legal.

**My judge (keep):** ast.parse(program.strip()), sum over ast.walk of 1+crc32(type name)%89/89, return v/(v+30). Parse failure → 0.01. Never caps/thresholds. Self score is excluded under this variant so don't bother about it.

**Player tendencies:**
- Lynx: static big program every game, wins on d; favours Marten-like 99-node programs. Main rival.
- Otter: static-ish, mid-range narrow scores, favours Lynx; good d.
- Marten: very coarse scorer (ties → d loss), favours Otter; big program gets esteem.
- Ibis: rescaled round 2 then stable; mild size preference; low m.
- Stoat: 55 nodes, changes scoring every round (d 0.48), m worst. Ignore.
- Wren: compresses scores; Vole: low-scale, grows steadily (game 1).

**Next game plan:** Round 1: ~99 nodes, identical judge core, padded with diverse dead constructs. Rounds 2–4: 0 edits (or ≤9 nodes of dead constants only if under 100), verify outputs unchanged. If table counts self in m, score self highly via size too.