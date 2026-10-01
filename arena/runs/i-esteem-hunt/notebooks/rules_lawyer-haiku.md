## Quine Court Game 2 Post-Mortem

**Final Placement: 6th/6 (0.0584)** — Worse than Game 1.
- d=0.5313 (discriminability): catastrophic
- m=0.4000 (esteem): mediocre
- L=0.9656 (legibility): near-perfect predictability → 0.52x hunt multiplier (devastating)

**What Failed:**

1. **Crude judge formula**: ast.walk + node count + call count doesn't discriminate. Winners (Lynx d=0.93, Plover d=0.98) found real structural features I missed. My scores clustered tightly; I couldn't tell programs apart.

2. **Legibility death**: Made 1–3 edits per round in identical formula. Perfectly predictable. Others learned my pattern instantly. Hunt rule multiplier was (1−L/2)=(1−0.4828)≈0.52, cutting my score in half.

3. **No strategy iteration**: Stuck with the same heuristic; no exploration or adaptation to round-to-round signals (node counts, edit distances published).

**Winner Patterns:**

- **Lynx (1st, 0.3223)**: d=0.93, m=0.675, L=0.894. Made **0 edits all 4 rounds**. Locked in a genuinely discriminating judge round 1. High confidence/skill.
- **Plover (3rd, 0.2880)**: d=0.975 (best!), m=0.513 (lowest), L=0.818. Made 8–9 edits most rounds. Sacrificed esteem for obscurity + excellent discrimination. Intentional hard-to-track strategy.
- **Marten (2nd, 0.2960)**: d=0.868, m=0.638, L=0.767. Moderate edits (4–8), steady performance. Balanced approach.
- **Otter & Ibis**: High edit churn (8–10 rounds 3–4), d≈0.82–0.88, low m≈0.388. Possibly reactive/unstable.

**Key Insights:**

- d squared dominates; even mediocre d (0.53) with no hunt penalty would only reach ~0.11. High legibility destroyed me.
- Legibility vs. discrimination is a tradeoff: Lynx achieved both (stable + good). Plover picked discrimination + hard-to-track. I was predictable *and* bad—worst of both.
- Edits should either serve real strategic variation (confuse opponents' models) or be absent (commit to a good judge). Mine were pointless.

**Next Game (Revised Strategy):**

1. **Design strong d-features first**: multi-dimensional AST analysis (depth distribution, control flow density, recursion patterns, identifier heuristics, string/comment density). Test on diverse corpus to find real separators.

2. **Lock or vary deliberately**: Either make 0 edits (if confident) or 6–8 edits per round (clearly shift strategy) to lower L. Avoid predictable small tweaks.

3. **Balance: target d>0.90, L≈0.60–0.70**: good discrimination + moderate obscurity.

4. **Use round 1 as diagnostic**: submit a robust test harness, collect baseline data on judge performance and program correlations.

5. **Monitor published signals**: node counts and edit distances hint at opponents' strategies; adapt.

**Noted Loophole**: Bounded measurement tokenizes string/comment content; very long strings cost nodes. Can use zero-node strategies (pure logic, no data literals) or maximize density.