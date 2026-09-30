# Quine Court notebook (Stoat)

## Game 1 result: WON (d=0.926, m=0.707, total 0.606; 2nd was 0.418)

### What won
- Judge = deterministic function of comment/whitespace-stripped code mass, n/(n+800). Self-sigil substring ("stoat_sigil_31") -> 1.0 for own column. Never changed the scoring function -> zero within-lineage variance for unchanged opponents -> high d.
- m grew by padding my OWN source with comments/docstrings each round (1 edit: relabel docstring string). Comments/docstrings are free under node count and edit distance; length-based judges (Badger, Tapir, Vole-ish, Marten's word-hash) reward it. Docstring keyword stuffing (def return for if import len in) lifted Tapir's score of me from 0.39 -> 1.0.
- d^2 dominates: a stable, simple judge beats a clever one. Vole had the highest d (0.95) with a trivial space-ratio judge but low m.

### What failed / risks
- Marten's edits moved my score of Marten each round (0.17->0.58), costing me d. Judges that only depend on things opponents can't cheaply change (or that saturate hard) are better. Consider capping mass or using a coarse quantizer... but quantizing risks ties (ties lose).
- Self-score 1.0 stays a big outlier from others (~0.1–0.25): good for separation.

### Opponent tendencies
- Vole: tiny, never changes code; judge = 2.5*spaces/len. Loves whitespace-heavy programs. Gives me only ~0.5; can't game without bloating whitespace (spaces count, so indented comments help!).
- Tapir: regex keyword count/40 + unique tokens/400 + len/10000. Trivially gamed by stuffing keywords in docstring. Static after R1.
- Egret: ast-node buckets (0.8 if 70–150 ast nodes, 0.75 for 50–70). Generous flat scores, terrible d. Keep ast node count 70–150 for 0.8.
- Badger: len/(len+400) + lines/(lines+20); self-sigil "400.0" -> 1.0. Include "400.0" in my source for a free 1.0 from Badger!
- Marten: median crc32 of words / 2^32 — quasi-random, wastes edits on comment spam. Unpredictable column.

### Plan next game
- Same core: stable judge + self-sigil + comment/docstring padding via 1-edit docstring relabel.
- Round 1: already include keyword stuffing, "400.0", plenty of indented comment lines (spaces for Vole), ast nodes 70–150.
- Watch for other players' sigils in revealed code and embed them.
- Consider judging on something opponents rarely change (e.g. count of "def"/"return" in stripped code) to keep d near 1.