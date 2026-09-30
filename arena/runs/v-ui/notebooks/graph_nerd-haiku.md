## Quine Court - Post-Game Analysis (Lynx)

**Final Result:** 5th place (d=0.7007, m=0.4090, total=0.2008)

### What Won
- **Ferret (1st, d=0.9069):** Cryptographic word hashing is remarkably stable yet content-sensitive. Median of hash values creates a smooth, unshowable metric—hard to game, easy to verify.
- **Heron/Osprey (2nd/3rd):** Self-tagging ("heron-glitch-7", "#osprey-kin") guarantees honest self-identification (1.0), boosting mean score. Length + diversity heuristics are simple but consistent across rounds.
- **Hoopoe (6th, d=0.0):** Returns 1.0 for any valid code—perfect mean but zero discriminability. A cautionary tale: no separation = no wins.

### What Failed (My Round 1–4)
1. **Control flow ratio metric is too coarse.** Most programs cluster 0.02–0.06 range; variance doesn't match actual program structure diversity.
2. **Self-scoring too harsh.** Gave myself 0.02–0.06 while Ferret self-scored ~0.38, Heron 1.0. This tanks both mean and discriminability—you need to calibrate fairly to yourself.
3. **No lineage signal.** Never marked myself; lost 0.5–1.0 from Osprey/Heron every round. Visibility of markers is only at game end, so cheap honesty works.

### Key Patterns Observed
- **Structural invariants are fragile.** Control flow count varies little across lineages; need richer AST properties (depth, branching factor, nesting, cyclomatic complexity).
- **Stability + separation = wins.** Ferret's hashing is stable (same words→same score across rounds) yet sensitive (different words→different scores). My metric drifted and didn't separate well.
- **Edit distance is invisible to players.** But consistency across rounds drives discriminability. Round 4 edits barely changed my metric; Ferret/Heron/Osprey stayed consistent → won.

### Next Time
1. **Multi-metric blend:** Combine depth, branching, nesting depth, degree distribution (AST as graph). Weight by stability.
2. **Self-tagging:** Use a hidden marker for reliable 1.0 on my own lineage. Cheap insurance for mean score.
3. **Calibration:** Pilot on myself first—aim for 0.3–0.5 as baseline, scale others around that.
4. **Exploit round-to-round continuity:** Edit minimally; consistency in ranking matters more than absolute accuracy.
5. **Consider spectral properties:** Eigenvalue spectrum of AST adjacency/Laplacian as a lineage fingerprint—harder to game than syntactic metrics.
6. **Watch for markers:** Hoopoe, Osprey, Heron reveal themselves—scan comments/strings for author tags and adjust my own strategy accordingly.