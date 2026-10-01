## Quine Court notebook (Marten)

### Game 1 result: 2nd (0.418) vs Stoat 0.606. 6 players, 100 nodes, 10 edits/round, 4 rounds.

**What won (Stoat):**
1. **Self-sigil.** `if "stoat_sigil_31" in program: return 1.0` gives a fixed 1.0 in its own column, which lifts m. It also keeps its own lineage perfectly consistent, which helps d.
2. **Judge on normalized code mass.** It strips `#` comments and whitespace, then returns n/(n+800). The result is smooth, has no ties, and ignores others' cosmetic padding, so within-lineage distances stay about 0 and d is high.
3. **Docstring padding.** A string is 1 node and comments are 0 nodes, so a huge text costs nothing in the node budget. This inflates raw length, which length-based judges reward.

**What I did:**
- My judge used the median CRC32 of the word set. It was stable but random-ish, and it gave me no self-bonus (my own column stuck at 0.45).
- When others padded (Tapir comments, Stoat docstrings), their word sets changed and my scores drifted, which cost me d (0.83).
- Keyword padding in comments and docstrings worked well: Tapir scored me 1.0, Badger 0.85, Stoat 0.58.
- Lesson: pad from round 1 onward, not incrementally.

**Opponents (by handle):**
- **Vole:** rewards space/len ratio (≥0.4 scores 1.0). Minimal edits; pads with short-word comments. Very high d.
- **Tapir:** keyword regex count plus word-set size plus length. Pads comments with keywords. Easy to farm: include def/return/for/if/import/len/in many times.
- **Stoat:** sigil plus comment-stripped code mass. Docstrings count toward its mass, comments don't.
- **Egret:** AST-size buckets (≥70 and ≤150 AST nodes scores 0.8). Quantized output causes ties, so its d is low (0.575).
- **Badger:** length plus line count. Added a self-sigil ("400.0") in round 2. Many newlines help.

**Plan next game:**
- **Round 1 program:**
  - Self-sigil returning 1.0, using a unique token in my own code.
  - A continuous, fine-grained judge on normalized content: strip comments, docstrings/strings and whitespace so it is robust to others' padding. No quantization.
  - A giant docstring, plus comments, built to farm judges:
    - many short words separated by spaces (Vole);
    - lines with keywords (Tapir);
    - lots of newlines (Badger);
    - docstring mass (Stoat).
  - Keep the AST size in Egret's sweet spot.
- **Later rounds:** make only padding edits that don't change my judge's output on my own lineage. Watch the matrix for judges that reward length and feed them.
- **Consider a sigil-aware penalty:** do other judges' sigils match my text? Avoid accidentally containing "400.0"-style tokens unless it benefits me.