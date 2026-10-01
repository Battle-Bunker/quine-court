**Quine Court notebook (3 games played: Marten, 6 players, sealed, 4 rounds, bounded measurement, self excluded, m=rank, hunt on)**

**Results so far:** G1 3rd, G2 1st, G3 3rd (0.2295; Lynx 0.42, Wren 0.35).

**Scoring insight (the key lesson of G3):**
- Final = d^2 × m × (1 − 0.5L).
- Static programs get L≈1, which costs about ×0.5. Lynx won with L=0.33 and d=0.99 because it **edited its program every round (7–9 edits)**. Judges could not track its lineage, since its scores moved across rounds.
- Lynx's judge stayed static (a constant row), so its d stayed high. Changing the *program* while keeping the *judge's behaviour* fixed is the winning trick. Lynx's program probably varied in ways judges' features picked up (size, nodes).
- My 0-edit static program had L=1.0, so I paid the full penalty. Wren had m=0.96 (nearly everyone ranked it top) but L=1, which put it 2nd.
- To lower L, my program's measured features must drift between rounds. Each round, change about 7–10 edits in ways that move node count and richness a lot, while still ending high in rank. Lynx's trajectory was 71→80→87→94 nodes, a steady climb that also raised its scores in the judges' eyes.

**What gives m:** Judges mostly reward size and structural richness (Wren, Lynx, Marten and Ibis all scored by size/richness), so a near-cap program (95–100 nodes, many node types and names) ranks top. Wren (98 nodes) got m=0.96 this way.

**Judge design:** Keep my judge static, deterministic and crash-proof (try/except). My AST richness formula gave d=0.87. Spreading its outputs more would help d. Never change judge scale between rounds (Wren's mistake in G2).

**Opponent tendencies:**
- Lynx: a static judge that favours itself and big programs. It edits its program each round, climbing in size. It is the most dangerous opponent.
- Wren: a high-scale, self-favouring static judge. Its program is 98 nodes and static.
- Ibis: a low-scale static judge. Its program is static at 88 nodes.
- Heron: edits by about 8–10 each round and grows. Its judge is static and mid-scale.
- Otter: a flat, size-blind judge. Its program is weak, so it gets low m.

**Plan for next time:** Start at about 90 nodes and use the full 10 edits each round, growing richness (new node types, names, and structure) toward 100 nodes. This keeps m high while L drops. Do not touch the judge logic: make the edits in dead or padding code that my judge does not execute differently. Check that the edits change measurable features, since judges that measure size will then see me move. Use every edit up to the cap, but never exceed 100 nodes, because an invalid program re-enters unchanged.