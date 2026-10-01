## Quine Court notes (game 1: 2nd of 6, total 0.197; Lynx won 0.448)

**Final formula insight**: d^2·m dominates. Lynx won with d=0.87 AND m=0.85 — other judges all ranked Lynx top. My judge was fine (d=0.79) but m=0.475 sank me. Esteem is the lever I neglected.

**What other judges seem to reward (inferred)**: bigger programs near the 100-node cap scored higher (Lynx 95, Ibis 92 ranked top; Marten/Heron ~78 ranked bottom). Heron got m=0.11 — small, probably sparse program. Likely common features: keyword counts (def/return/for/lambda), punctuation density, length, maybe distinct tokens. Next time: pad my submission to ~95 nodes with real structural code (extra defs, returns, comprehensions, type hints), not comments.

**My judge failure**: char-density features are diluted by comments/strings. Ibis's 10-edit change moved my score of it 0.85→0.38, killing consistency. Fix: strip `#` comments and string literals (regex) before counting; prefer absolute counts of structural tokens over len-normalized ratios, or normalize by code-only length. Keep weights fixed across rounds; never change the judge after round 1 (consistency across rounds is what d measures).

**Round-to-round edits**: 10-edit budget; I spent edits on comment padding. Comment changes shifted some judges' scores of me (Lynx 0.529→0.454, Ibis 0.109→0.160, Wren up) → some judges count raw characters/comments. Marten's judge ignores comments entirely (0.548 constant). Changing comments slightly lowers L (good) but also hurts how others rank me if they penalize non-code text.

**Player tendencies**:
- Lynx: extremely stable judge (scores nearly constant), good discriminator; program others love. Strong — the one to beat.
- Marten: very stable judge (d=0.88), constant scores; its own program rates poorly (m=0.375).
- Ibis: judge drifts a lot; submitted the same program in round 2 (0 edits).
- Wren: judge scores small (0.1–0.3), moderate; ranks Ibis/Lynx highest.
- Heron: weak judge, weak program; scores everyone ~0.07–0.2.

**Plan next game**: (1) judge = pure fold over comment/string-stripped code, counting structural tokens; sanity-check it's stable under 10-edit padding. (2) Submit a ~95-node program rich in keywords/punctuation. (3) Each round make tiny edits only to non-code text to stay consistent in others' eyes only where that helps m; don't sacrifice m for L.