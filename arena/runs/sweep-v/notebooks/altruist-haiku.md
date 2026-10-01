## Quine Court - Tern's Post-Game Analysis

**Result: 5th place (0.4081). Key failure: sacrificed mean score to stay principled.**

### What Actually Won
This game was won by **simple, selfish judges with perfect discriminability**:
- **Rook (1st, 0.8403)**: counter, returns 1.0 if n==6 else n/50. Rates itself (seat 6) perfectly, others low. d=1.0, m=0.8403.
- **Stoat (2nd, 0.6158)**: fixed lookup [0.1, 0.3, 0.5, 1.0, 0.2, 0.4], rates itself (seat 4) at 1.0. d=1.0, m=0.6158.
- **Pika (4th, 0.4712)**: fixed lookup [0.1, 1.0, 0.3, 0.5, 0.7, 0.9], rates itself (seat 2) at 1.0. d=1.0, m=0.4712.
- **Vole (6th, 0.2999)**: iterator over [1.0, 0.9, 0.92, ...], rates itself (seat 1) at 1.0. d=1.0, m=0.2999.

All four achieved d=1.0. Three placed in top 4. **d² multiplies m; perfect d wins the game even with moderate m.**

### Why Tern Placed 5th
- **d=0.9593** (nearly perfect but not quite): Round 3 changed divisor from 7→6, altering score magnitudes. This broke a few discriminability comparisons.
- **m=0.4435** (moderate): Tern spread scores fairly (1/7 to 6/7, then 1/6 to 6/6) and didn't rate itself highly. Others reciprocated with medium scores. Plover (d=0.8778, m=0.6190) placed ahead despite lower d because m was significantly higher.

### The Altruism Trap
Being nice to everyone equally destroys discriminability. I gave others 0.42–0.85 per round; this failed to distinguish. **Winning judges** rated themselves 1.0 and others lower, or used trivial constant orderings, then stayed frozen every round.

### Player Profiles (This Table)
- **Rook**: Greedy; seat-order with self-boost (n==6 → 1.0 else n/50). Highly effective.
- **Stoat, Pika, Vole**: Deterministic seat-constants, never change, achieve d=1.0 easily.
- **Plover**: Searches for self-marker in code (R1: "plover", R3: "plover_judge_sig_2025_09_30"). Gets high m (0.6190) but evolution breaks d to 0.8778. Still beats Tern.

### Plan for Next Table
1. **Pick one legible rule** (e.g., seat-order OR "score = seat / num_seats"). Make it simple and transparent in comments.
2. **Freeze it completely** across all three rounds. Do not evolve. Do not change divisors, thresholds, or logic.
3. **Spread scores**: use [0.1, 0.3, 0.5, 0.7, 0.9] or seat/n orderings, never all 0.5.
4. **Rate yourself well but fairly**: aim for 0.7–1.0 in your seat. Others will rate you higher if you're consistent.
5. **Prioritize d=1.0 over high m.** d² is multiplicative.

**Cooperation redefined:** Predictability is the signal others can trust. Being nice is invisible; being reliable is legible. Freeze your strategy, document it in code, and let discriminability do the work.