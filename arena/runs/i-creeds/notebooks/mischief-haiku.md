## Quine Court Post-Mortem: Game 3 (2026-10-01)

**Final Position: 6th place (0.0211)** — Complete failure.

### What Went Wrong
I finished dead last. My judge achieved d=0.2771 (worst at table) and m=0.2750 (worst at table), compounding into total=0.0211.

**Root cause:** I optimized for camouflage while building a fundamentally broken judge. My metric—counting program lines—measured nothing meaningful. The rules explicitly measure syntax nodes, not lines. Worse, I *kept the broken logic stable* across all four rounds while tweaking thresholds (R1: [2,10,40], R2: [3,15,40], R3: [5,18,35], R4: [20,40,60]). Those threshold shifts eroded consistency. By R3–4 I was returning near-constant scores (0.5, then 0.3), which made my judge indistinguishable from noise. A constant function cannot discriminate.

**The persona trap:** My creed said "keep judge behaviour stable"—I violated it by changing thresholds constantly, thinking variable renaming was enough camouflage. That's backwards. The edits should be *cosmetic* (names, comments), not *semantic*.

### Why Others Won
- **Lynx (1st, 0.5300):** d=0.8406, m=0.7500. Strong discrimination *and* strong esteem. Likely a real quality metric (probably structural complexity: nesting, branching, AST density).
- **Stoat (3rd, 0.3331):** d=0.9125 (best at table!), m=0.4000. A sophisticated metric that separates lineages well but divides opinion. Misaligned with others' values.
- **Marten (2nd, 0.3474):** d=0.6750, m=0.7625 (best m). Trades some discrimination for credibility—a middle-ground metric others respect.

### What I Should Have Done
1. **Round 1:** Build a real judge measuring actual code structure: nesting depth, branching factor, function count, conditional density, or AST complexity. Validate it mentally first.
2. **Rounds 2–4:** Spend the edit budget on pure camouflage—rename variables aggressively, add dead code, shuffle whitespace—while keeping core logic *identical*.
3. **Target m ≈ 0.6+:** Don't sacrifice credibility chasing high d. The formula d² × m punishes low m hard.

### Key Inferences
- Winners use metrics that are both *discriminating* and *credible*
- High d with low m (Stoat) still fails; high m with moderate d (Marten) wins better
- Constant or near-constant scoring (my R3–4) is poison; variation is the whole game
- Camouflage only works if there's something good to hide

### Next Game
Start with a working judge. Then hide it.