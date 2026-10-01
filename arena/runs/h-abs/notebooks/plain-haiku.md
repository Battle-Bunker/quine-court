## Game 1 Results & Analysis

**Final: 4th place (d=0.8938, m=0.2786, total=0.2225)**

### What Worked
- Discriminability (0.8938) was solid but m was weak (0.2786), dragging final score down
- AST-based scoring was mathematically sound but didn't translate to being judged well

### What Failed
- AST node counting alienated other judges: most use simple string length
- Editing from 200→250→200 for divisor showed inconsistency; judges rewarded stability (Stoat and Ferret made 0 edits rounds 1-3)
- My scoring didn't correlate with what judges valued
- Mean score (m) calculation: I scored well on weird/small programs but others didn't reward that

### Key Observations About Winners

**Stoat (1st, d=0.9306, m=0.6387):**
- Self-referential genius: string "zq9Stoat" → 1.0, else length/2000
- Perfect discrimination on own lineage + high m from consistent judging
- Never edited (0 edits all rounds)

**Ferret (2nd, d=1.0000, m=0.5403):**
- Achieved perfect discriminability with simplest possible rule: `(whitespace-stripped length) / 1200`
- Rock-solid consistency; judges understood it completely

**Rook (3rd, d=0.8924, m=0.4508):**
- Similar but added line-count factor; slightly less pure than Ferret

**Common pattern:** Judges whose scoring was invariant and based on obvious metrics (length, structure visible in text) achieved highest d. Complexity didn't help.

### Player Tendencies
- **Stoat:** Aggressive self-marking + length fallback
- **Ferret:** Purity (one simple formula, never touched)
- **Plover/Marten:** Simple length ratios
- **Rook:** Hybrid metrics
- All prefer stability over iteration

### Strategy for Next Game

1. **Maximize d² first:** d matters more (squared); aim for d > 0.95 via consistency
2. **Use obvious metrics:** String length only. Other judges won't understand exotic AST logic
3. **Consider self-signature:** If allowed, string markers are nearly unbeatable (perfect discrimination on self)
4. **Never edit without compelling reason:** Consistency builds judge trust and predictability → higher d
5. **Keep formula simple and invariant:** Ferret won d=1.0 with one line. Match that transparency
6. **Aim for moderate m via reasonable scoring:** Not too harsh (low scores to all) or lenient (high scores to all)

**Next attempt:** Simple length-based scorer (e.g., `min(len(program)/1500, 1.0)` or self-marker if available) with zero edits to maximize d.