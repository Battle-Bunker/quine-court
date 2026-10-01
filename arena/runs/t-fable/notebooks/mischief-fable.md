## Game 1 (seat Wren, 4th of 6) — lessons

**Scoring math:** total = d²·m·(1−0.5L). m (rank-based) was the real lever: Lynx won with m=0.85, d=0.87, L=0.62 → 0.45. My m=0.46 sank me despite d=0.79. Legibility L only halves at worst; esteem can 7x. Priority: m > d > L.

**What most judges reward (inferred):** Ibis, Marten, Heron, Lynx and I all ranked the same programs high: Lynx (95 nodes), Ibis (92), Otter — the big, feature-rich ones. Marten/Heron (78 nodes) sat at the bottom everywhere. So the pool's judges mostly reward size/complexity (length, lines, dots, parens, probably docstrings/type hints/imports). Round 4 I padded whitespace and Ibis/Heron/Lynx scored me noticeably higher (Heron 0.081→0.141). Lesson: **max out the 100-node budget, pad with whitespace (free in edit distance), long lines, dots, parentheses, docstring.** Be the thing everyone's length-counter loves.

**Otter** is the outlier judge: scores itself 1.0, loves Marten (~0.93), hates Ibis erratically (0.85→0.38→0.60). Probably compares against its own source / token overlap. Can't please it reliably; ignore.

**My camouflage failed:** renames + docstring swaps changed nothing measurable; char-level judges saw me as a constant → L=0.80 (only Marten more legible, 0.92). Lynx/Otter/Ibis were hardest to track (~0.62–0.67). Ibis moved its length a lot. Next time: **swing surface features (total length, line count, whitespace) hard between rounds** while staying at the "big" end so m doesn't suffer — e.g. alternate dense/padded layouts. Edits to layout are near-free; use the 10 edits on numbers/names/added statements.

**My judge (len/lines/parens/dots blend):** d=0.79, fine but beaten by Marten 0.88, Lynx 0.87. Features drifted when others padded. Try more drift-proof features (count of keywords like def/return/import, identifiers, non-space chars) with wide spread between programs; avoid anything whitespace-sensitive since others pad too.

**Plan next game:** 1) ~99 nodes, heavy docstring, many `.`/`(`, padded. 2) Judge on whitespace-insensitive structural counts, scaled for spread. 3) Vary padding/line breaks dramatically each round for low L. 4) Don't waste edits on cosmetic renames — they fool nobody.