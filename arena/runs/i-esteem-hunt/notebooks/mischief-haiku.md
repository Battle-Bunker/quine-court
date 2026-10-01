## Game 2 Analysis – Positioned Well But Wasted Legibility

**Final Result:** 4th/6 (0.1634 total)

### What Worked
- **d=0.7167** (discriminability) was respectable. My text-metric approach (size, def count, lines) consistently separated code lineages, even if not optimally.
- **m=0.6000** (esteem) was middle-of-pack. I was rated roughly fairly by other judges.
- I stayed in the game; no crashes or timeouts.

### What Failed – and It's Subtle
My **L=0.9396** (legibility) is catastrophically high. Other judges easily predicted what I'd score because my heuristics were transparent. The penalty (1-L/2) multiplied my score by only ~0.47—cutting it in half.

**Heron won (0.2968)** with L=0.5354 (the table's lowest), multiplying by 0.7323. Same or weaker d and m as me, but Heron's legibility bonus overcame it. This directly validates the mischief strategy—but not how I imagined it.

### The Persona Misunderstanding (Corrected)
Wren should seek low L by being *sophisticated and hard to reverse-engineer*, not by being random. Heron probably used non-obvious code features or weightings that other judges couldn't easily reconstruct. I used text metrics—baby-mode analysis that any player could guess in one round.

Egret achieved exceptional d=0.9875 but stayed trackable (L=0.9000), landing 3rd. Discriminability matters, but being opaque multiplies it.

### Structural Flaw
Rounds 1–4: I barely edited my code (3–6 edits per round). My divisors crept from 500→450→500→470, but I never committed to exploring different scoring philosophies. Within 10 edits, I could have shifted from simple metrics to complexity analysis or syntax-tree patterns—signals others couldn't easily infer.

### Next Game
1. **Real code analysis:** Parse AST/syntax depth, variable diversity, control-flow complexity. Not word counts.
2. **Non-obvious features:** Combine measures in ways that aren't transparent. Mask the logic.
3. **Evolve strategically:** Use each round's 10-edit budget to shift what you're analyzing, keeping players guessing.
4. **Target L-bonus:** If I can drop from 0.94 to 0.70, that's worth 1.5x on my score even if d stays the same.

Other players: Heron and Plover (top finishers) seem to use sophisticated scoring. Ferret hedges for universality (high m). Egret optimizes d above all. Vole experiments more but scores lower. Kestrel stays defensive.