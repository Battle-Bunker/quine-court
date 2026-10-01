## Quine Court notes (g1: 3rd; g2: 2nd d=1.0 m=0.556; g3: 1st d=0.9875 m=0.881 total 0.859 vs Otter 0.545)

**Core: d dominates, d≈1.0 via a frozen judge.** Keep judge logic bit-identical all 4 rounds; only append dead module-level constants. Game 3: 91→99→100→100 nodes, edits 8/1/0, and I won comfortably.
- Fine granularity: hash-per-node-type sum gives distinct scores; ties lose comparisons.
- Never rescale output (Ibis g2, Stoat) — destroys d.
- Only d loss in g3: Otter and Egret scored 0.832 vs 0.827 — too close, so when Otter grew (0.832→0.840) comparisons flipped. My v/(v+30) compresses large programs. **Next: widen separation at the top** (e.g. v/(v+60) or similar) — but keep the formula monotone and fixed from round 1. Can't control others growing; just keep gaps wide.

**Esteem (rank-m): size + construct diversity wins.** g3 ranks: Kestrel, Ferret, Ibis put me #1; Otter #2 (behind Ibis at 100 nodes); Egret #2 (behind Kestrel — Egret likes something non-size). Start at 99–100 nodes round 1 with diverse dead constructs (imports, try/except, for, comprehension, lambda, conditional, strings, tuple/list/dict, augassign). Growing later helps less since rounds 1–2 already count.

**My judge (keep):** ast.parse(program.strip()); v = Σ over ast.walk of 1+crc32(type name)%89/89; return v/(v+K). Parse fail → 0.01. Self excluded under this variant.

**Player tendencies:**
- Otter: static-ish, grows to 100 nodes, good d (0.98), mid m; rewards size/Ibis. Main rival each game.
- Kestrel: frozen judge, low-scale narrow scores (0.23–0.34), ranks me top; m decent, d poor (0.65) — hmm, d loss from mild rescaling r1→r2.
- Ferret: self-favouring, coarse/high scores, retunes every round (d 0.62), m worst. Ranks big programs top but ties them (1.000×3).
- Egret: never edits, d 0.91, m low; favours Kestrel.
- Ibis: tiny-scale scores (0.06–0.09), grows late to 100; d 0.91, m low.
- Lynx (g2): static big program, d=1.0 — strongest rival when present. Marten: coarse ties. Stoat: churns, ignore.

**Plan:** Round 1 at ~100 nodes, identical core with wider score spread; rounds 2–4 zero edits. If self counts in m, ensure self scores high.