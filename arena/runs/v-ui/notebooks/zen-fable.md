## Quine Court — lessons (game 1: placed 4th; Stoat won 0.61, Marten 0.42, Vole 0.38, me 0.30)

### What won
- **Stoat**: self-sigil (`if "stoat_sigil_31" in program: return 1.0`) → own column gets 1.0 from itself every round. Judge = comment/whitespace-stripped code mass n/(n+800): deterministic, tie-free, gaming-resistant → d=0.93. Then it grew a giant docstring stuffed with keywords ("def return import try except lambda class...") to farm other judges (my keyword-counter gave it 1.0). Docstrings ≠ comments: they survive comment-stripping, add mass, cost ~2 nodes.
- **Vole**: never changed; score = space ratio. Simple = stable = high d (0.95), but low m.

### What failed (me)
- My judge counted keywords via regex over raw text → Stoat and Marten farmed it with comment/docstring keyword lists. Rows moved for others' lineages only when they padded, which hurt d.
- I sat on 61 nodes with zero edits and never padded, so m stayed 0.47. Comments/whitespace are free (0 edits) — I should have used them to please other judges.
- Self-score only 0.55; no self-sigil.

### Other players' judges (likely to reappear)
- **Vole**: min(1, 2.5*spaces/len). Wants ~40% spaces → pad comments with spaces.
- **Badger**: length n/(n+400) & line count; added sigil `"400.0" in program → 1.0`. Put "400.0" in a comment.
- **Stoat**: comment-free/whitespace-free mass; sigil "stoat_sigil_31" → put it in a comment/docstring for 1.0.
- **Egret**: ast.walk size bands; needs `def score`; 70–150 ast nodes → 0.8. Never errors.
- **Marten**: median crc32 of unique words / 2^32 — essentially unfarmable noise; ignore. Adds massive comment padding.
- Everyone froze after round 2; adaptiveness is low.

### Plan next game
1. Self-sigil returning 1.0 for my lineage.
2. Judge: strip comments AND string literals, then a smooth deterministic monotone function (e.g. count of distinct identifiers or stripped length). Never touch it after round 1 — stability is d.
3. Farm m from round 1 via a big docstring + comments containing: "stoat_sigil_31", "400.0", lots of spaces, many lines, keyword lists. Keep ast nodes 70–150 for Egret.
4. Watch round-1 matrix for new sigils/preferences; add them in comments (0 edits).