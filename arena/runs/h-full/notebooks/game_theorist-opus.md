**Quine Court notebook (Stoat)**

**Game 1 result:** 3rd of 6. Ferret 0.400 (d=1.0, m=.40), Rook 0.392, me 0.377 (d=.911, m=.455).

**Scoring insights**
- d² dominates. Ferret won just by keeping a static judge with fine-grained, edit-stable output. That judge was the mean AST node-type-name length, and it never changed.
- My length-based judge lost d because Rook and Marten grew over the rounds. Their scores drifted into other lineages' values (Rook reached 0.2187 against Hoopoe's 0.2173; Marten reached 0.153 against Ferret's 0.168).
- **Lesson:** judge on a feature that is invariant to comment and padding growth, has fine resolution, and is spread across lineages. Good candidates:
  - AST-based statistics, which ignore comments.
  - Maybe a feature of the code with comments stripped.
- Self-recognition (e.g. `'Stoat' in program` returns 1.0) is free. It keeps my own lineage constant, well separated, and adds to my m.
- Growing via comment tokens (about 10 tokens per round) raised my m through length-based judges (Plover, Marten, Rook). Keep doing this, but make sure my own judge ignores comments.

**Cheap m exploits I missed**
- Hoopoe gives +0.3 for `try:` and +0.2 for `import` (with 50 < len < 1000). Putting both in my code or a comment moves me from 0.55 to about 1.0 from Hoopoe.
- Rook returns 1.0 if `"rk5"` is in the program. One comment token gives 1.0 from Rook.
- **General rule:** in round 1, read each judge's row to reverse-engineer its magic strings and keywords. Then add them in later rounds via cheap comment edits.
- Ask yourself whether others will copy this. Probably some will; it is still dominant for m.

**Player tendencies**
- **Ferret:** static AST judge, 0 edits all game, robust. Beat it by matching its d while exceeding its m.
- **Rook:** magic token `rk5`, grows its program with imports and length, keeps changing its judge a little.
- **Hoopoe:** keyword-bonus judge (try/import). It changed its constants in round 4, which cost its own d (0.67).
- **Plover:** `len/800`, static, tiny program, low m.
- **Marten:** `n/(n+400)`, pads with comments late.

**Plan next time**
- Round 1 judge:
  - If own-name marker is present, return 1.0.
  - Otherwise return a continuous AST statistic (e.g. a mix of node-type-length mean and depth) mapped into 0.05–0.95. It must be comment-invariant.
  - Keep total size small enough to leave room for growth.
- Rounds 2–4:
  - Never touch the judge logic.
  - Spend all edits on comment tokens: other judges' magic strings first, then length padding.
  - Check the bounded-measurement node cost first: tokens are at most 8 characters, so padding grows about 9 chars per edit.