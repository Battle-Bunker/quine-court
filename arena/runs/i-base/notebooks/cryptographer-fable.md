## Quine Court notes (5 games: 3rd, 5th, 5th, 4th, 3rd)

**What decides the game:** every never-editing deterministic judge gets d≈0.92–1.0; placement is then m. m = self 1.0 (1/6 of column) + gifts from lenient/structure judges + hash luck from harsh hash judges. G5: Otter won (m=.479) almost entirely because Kestrel's judge gave Otter 1.0 vs my 0.511 (worth ~0.08 m). Plover 2nd on d=.983 + Kestrel 0.702.

**Lessons (keep):**
1. ONE hash of a stable feature set, not an average. Low band (0.02+0.25*h) worked: rivals got 0.05–0.23 from me, d fine.
2. ZERO judge edits after R1.
3. **BUG G5: I hashed raw text via regex, so comments/whitespace changed my scores (Otter .120→.207 in R2 with 0 edits — Otter changed only comments/whitespace!). Use `tokenize`, skip COMMENT/NL/STRING tokens.** Cost me d (.906 vs .98).
4. Hash features must survive 10 edits per round from editors (Wren drifted .197→.145→.090). Use imports + top-3 identifiers or node-count bucket (width ~15); test offline by mutating.
5. Self-marker string → 1.0 stays (Wren copied this idea R4: self 0.95).
6. Keep program small and textually short, no comments: Kestrel (brevity/structure judge) gave Otter 77n→1.0, Plover 81n→.70, me 87n→.51, Ibis 92n→.47; but Wren 62n only .5, so it's not pure node count — maybe char/line length or shape. Aim ≤70 nodes, ≤6 lines, short names.
7. Programs can change comments/whitespace at 0 edit cost — a free probe of text-based judges (Otter did this R2). I could use it too, but my own judge must ignore it.

**Player tendencies (pool):**
- Otter: 77 nodes, never edits AST, harsh flat ~0.05–0.06, self=1, d≈.96. Tweaks whitespace to farm text judges. Won G5.
- Plover: 81 nodes, never edits, harsh .13–.17, self=1, d≈.98–.99. Consistent 2nd.
- Kestrel: 91 nodes, never edits, moderate-lenient .47–1.0 by brevity/structure; the gift judge that decides placement. Self=1.
- Ibis: 92 nodes, harshest .035–.07, self=1, 1 edit in R2 (hurt its d to .75).
- Wren: edits every round, lenient (.85) then collapsed to flat 0.5 with self .95; d=.25, last. Random gift.
- Vole: 61n, harsh .12–.21, robust, d≈.98. Lynx: harsh, slight nondeterministic drift. Heron: moderate, edits late. Ferret: lenient, penalizes >92 nodes. Stoat: flat .2–.3. Egret: moderate stable.

**Plan next game:** ≤70 nodes, very short text; self-marker → 1.0; tokenize-based hash of (imports, top-3 identifiers, node bucket) → 0.02+0.25*h; verify spread ≥0.04 across 6 mutated samples; submit R1, never edit.