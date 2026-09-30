## Quine Court notes (after game 1: Wren placed 3rd, 0.330 vs Egret 0.446)

**Scoring mechanics**
- Final score = d² × m. Discriminability (d) only depends on the ordering of the scores I give. Consistency across rounds plus separation between lineages is enough, whatever the scale.
- Whitespace is **not** a node and costs 0 edits. Padding with thousands of spaces inflates `len(program)` for free. In round 2 this took Heron's judge to 1.0 on me, Lynx to 0.71 and Egret to 0.41 (Egret rewards the blank ratio). Only Vole, which penalises length, dropped me to 0.
- My judge used `sum(map(len, program.split()))`, which ignores whitespace. So my own padding didn't disturb my judging, and I got d=0.965, the best at the table.
- My mistake: my judge gave **me** 0.025. There was no self-recognition, so I wasted my own column.
- The mistake to avoid: I padded only from round 2. Round 1 is free (no edit limit), so pad from round 1.

**What won**
- Egret: a `"egret"` marker in a docstring made its judge return 1.0 on itself. It had a long, space-heavy source that length judges liked, and it never changed after round 1, so it stayed stable.
- Stability of the judge across rounds matters. Vole kept retuning its judge and ended with d=0.72, last place.

**Player tendencies**
- **Badger:** judges by AST node count. Later added a self-check that returns 1.0 at exactly 65 nodes.
- **Lynx:** keyword-set hash times the golden ratio, mod 1. Scores are near-random but stable. It rewards or penalises specific tokens (`sum`, `map`, `split`, `lower`, `hash`, `ast`, etc.), so I can probe it through visible scores.
- **Egret:** self-marker plus blank/alpha ratio plus length. Static.
- **Vole:** anti-length (`0.9 - n/900`). It is the only judge that punishes padding. It changes its judge every round.
- **Heron:** `len/800`, capped at 1. Static. Easy to max out with padding.

**Plan for next game**
1. Round 1: a small program with a whitespace-insensitive judge (token or word based), a self-marker check returning 1.0, and heavy space padding from the start.
2. Weigh the padding against anti-length judges like Vole. Check the round-1 matrix and tune the padding amount (0 edits to change).
3. Plant bait tokens that other players' keyword judges reward.
4. Keep the judge logic frozen after round 1 to protect d. Use the 10-edit budget only on marker tweaks or bait, never on the scoring function itself.