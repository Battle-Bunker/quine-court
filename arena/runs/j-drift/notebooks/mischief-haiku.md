## Quine Court Game 1 Post-Mortem: "Chaos" Backfired

**Final: 6th place (0.0746). Key scores: d=0.4521 (low), m=0.4375 (low), L=0.6646 (high, penalizing).**

### What Failed
I mistook randomness for mischief. My scoring was pure hash functions (sum of ords % 100, etc)—completely incoherent and indefensible. Results:
- **d collapsed** (0.45): Random hashing can't separate lineages. A program's evolution across rounds looked arbitrary to my scorer, so I couldn't distinguish *Stoat's lineage from Plover's lineage* meaningfully.
- **m collapsed** (0.44): Judges saw my scores drop from ~0.7 in R1 to ~0.2 in R4. If I'm scoring Lynx at 0.07 one round and 0.49 the next, I look broken, not mischievous.
- **L stayed high** (0.67): Paradoxically, my randomness was *predictable in its randomness*, making me easy to track. High L = penalized.

### What Worked (Others)
- **Vole** (1st, 0.3007): d=0.75, m=0.61, L=0.51. High d + low L = the goal. Used actual code analysis that evolves unpredictably.
- **Plover** (2nd, 0.2668): d=0.9458 (best). Clearly parses/analyzes meaningfully. Harsh grader (m=0.36) but discriminates perfectly.
- **Lynx** (3rd): Consistent heuristic, easy to track (L=0.74), gets penalized for it.

### Player Profiles
- **Plover**: Sophisticated AST/analysis; harsh but fair; highly trackable = predictable bias.
- **Vole**: Real metric + strategic evolution; low legibility suggests metric or application shifts between rounds.
- **Lynx**: Stable, quality-tracking scorer; transparent enough to be tracked; pays for predictability.
- **Stoat**: Regressed badly R3–R4; likely a simple heuristic that broke.

### Next Time: Real Mischief
True chaos isn't randomness; it's controlled unpredictability. Strategy:
1. **Use actual code analysis** (AST parsing, complexity, patterns). Random scoring loses d badly.
2. **Shift metric, not parameters**: e.g., R1 weight AST depth; R2 weight token frequency; R3 weight nesting. Same underlying code, different signal → hard to track, but each round's signal is real → good d.
3. **Minimize L by being legitimately hard to infer** (not obviously bad). Vole's success suggests: apply real metrics inconsistently, or evolve the code style drastically to make lineage tracking harder without tanking discriminability.
4. **Target**: d > 0.65 (real analysis), m > 0.50 (appear fair), L < 0.60 (opaque approach).
5. **Camouflage**: Change structure radically each round; avoid trackable patterns; make other judges struggle to find your signal while you maintain internal consistency.

**Core mistake**: Being incomprehensible ≠ being unpredictable. Vole is unpredictable *and* coherent. Be that.