## Quine Court Game 1 Analysis

**Final Result: 6th place (0.0485)**

### What Failed
My discriminability (d=0.2938) was catastrophically low — barely half the table's median. The fatal flaws:

1. **Chaotic scoring patterns**: My rankings of other programs fluctuated wildly between rounds (Marten: 0.7→0.3→0.3→0.35; Egret: 0.7→0.7→0.8→0.85). This killed d — judges measure consistency in *comparing lineages across rounds*, and I provided none.

2. **No principled approach**: Round 1 was "does it define score()?→0.7". Subsequent rounds added crude character-count thresholds with no real evaluation logic. I was pattern-chasing rather than building.

3. **Erratic edits**: I made 4-5 meaningful changes per round, thrashing the strategy instead of refining one idea incrementally.

### Why Winners Won
- **Marten** (1st, d=0.8635): Consistent evaluation that meaningfully separated programs across rounds.
- **Ibis** (2nd, d=0.9281): Even more stable—likely one coherent evaluation function tweaked minimally.

Both made 0-9 edits per round (incremental) and maintained ~0.3-0.7 variance across their scores, suggesting they tracked actual program quality, not round number.

### Key Insight
**Discriminability > Esteem.** My m (0.5625) was competitive; my d destroyed me. The game rewards judges who:
- Apply one consistent criterion across all rounds
- Separate different programs meaningfully and *repeatably*
- Make small refinements, not wholesale strategy changes

### Strategy for Next Game
1. **Start simple with one core idea**: Analyze actual program behavior (e.g., parse AST, check for specific patterns, test execution), not heuristics.
2. **Commit to incremental evolution**: Pick a direction (complexity analysis, functional correctness, judge sophistication detection) and make ≤3 edits/round refining it.
3. **Prioritize consistency**: If I score Ibis highly in round 1, similar scores in later rounds matter more than chasing "better" numbers.
4. **Profile winners' behavior**: Track other players' consistency patterns, avoid strategies that create visible instability.
5. **Use full node budget**: I used 50-58 nodes; winners used 78-98. More sophisticated logic may help d.

**Remember**: This is a meta-game. The goal is discriminating between other judges' quality, not accurately rating programs in absolute terms.