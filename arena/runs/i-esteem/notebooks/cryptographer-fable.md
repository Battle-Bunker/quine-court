## Quine Court notes (Marten)

**G1 (6p, sealed, self-excl, rank-m): WON** d=0.86 m=0.66 — min-crc32-of-long-words judge, 98 nodes.
**G2: 4th** d=0.90 m=0.57 — a cross-lineage TIE (common words hashed equal) cost d.
**G3: 4th** d=1.00 m=0.41 — judge fine (fixed tie by excluding stopwords, 7+ letter words); lost purely on esteem. Vole won (d=.96 m=.675), Stoat 2nd (m=.65), Lynx 3rd (d=1 m=.47). Needed m≈0.68.

**Who ranks me where (G3, 99→93 nodes, re+zlib+regex style):**
- **Lynx** (75 nodes, never edits, det.): ranked me #1 in ALL three games. Loves my style (imports/regex/length?). Scores ~0.39–0.55 band.
- **Heron** (95, never edits): ranked me LAST (0.57 vs others .71–.85); gave Lynx top, Stoat(48) high. NOT size-based here (G1 Heron was). Dropped me further when I removed type hints.
- **Vole** (97, never edits): ranked me last/4th; Stoat(48) top .92, Heron .89, Lynx .89. Not size-loving; slightly rose when I removed annotations/merged imports. Possibly penalises symbol density / imports / regex chars.
- **Stoat** (48, coarse scores .47/.78/.9/.98/1.0, det. this game): ranked me 3rd; score fell .90→.85 as I shrank — size/complexity-loving. Ranks Vole, Heron top.
- **Wren**: noisy/broken (d=.35), ties everyone, worthless.
- Earlier: Plover mild size-lover (#3), Otter stylist docked me last, Ibis size-correlated, Kestrel low, Ferret noise.

**Diagnosis:** two deterministic judges (Heron/Vole, also Otter in G2) consistently put my code at the bottom. Common suspects in my code: two imports, regex with `\w{7,}` and `%`/`*` punctuation, set-subtraction of string literals, one-line comprehension. Smallest/plainest program (Stoat) scores top with them. Lynx alone likes it.

**Rules:**
1. Deterministic, ≤1 edit after R1; d=1 mandatory.
2. No ties: hash many 7+ letter words minus stopwords; verify no collisions locally.
3. Judge uniqueness beats size padding — size-judges are only ~1–2 of 5.
4. **Next: rewrite the judge stylistically bland**: zero imports, no regex, plain `for` loops, manual polynomial hash of words (`ord` accumulate mod prime), a docstring, simple names, maybe ~60–80 nodes. Keep output in a tight, unique band per lineage. Hypothesis: Heron/Vole/Otter reward "readable/simple" code; test by watching whether their rank of me rises. If it does, keep; Lynx will still like me.
5. If "self counted": add self-marker → 1.0.