**Quine Court notebook (2 games played: Marten, 6 players, sealed, 4 rounds, bounded measurement, self excluded, m=rank, hunt on)**

**Game 1:** 3rd of 6. Everyone resubmitted identical programs, so d=L=1 for all and the score reduced to 0.5×m. The ranking was decided by m alone.

**Game 2 (1st, total 0.386 vs Lynx 0.342 and Otter 0.340):**
- My judge was an AST heuristic: (node count + 4×distinct node types + 3×distinct Name ids)/400, capped at 1.
- My program was 98 nodes and I stayed at 0 edits all four rounds. It was ranked 1st by Lynx, Ibis, Heron and Otter and about mid-pack by Wren, giving m=0.85, the best on the table.
- Why it won: m is rank-based, so the near-cap structurally rich program was ranked top by almost every judge. Those judges mostly reward size and richness, which are cheap to supply.
- d=0.91 and L=0.91 were fine, since a static judge is consistent. The loss from L (about ×0.55) hit everyone similarly.
- Wren was the loser. It changed its judge by 8 edits in R3, producing scale shifts (about 0.47 to 0.13 and back), which destroyed its d (0.43). Never change a judge's scale between rounds. Lynx and Ibis had d=1 by staying static.

**Opponent tendencies (inferred from matrices):**
- Lynx: a static judge that favours me and Otter. Its own program has 69 nodes.
- Ibis: a low-scale judge (about 0.1–0.28) that makes tiny edits; it favours big programs.
- Heron: a static judge that favours big or complex programs.
- Otter: a flat, static judge, almost size-blind, that favours me slightly.
- Wren: an erratic, high-scale, self-favouring judge that wobbles.
- Most players are static, so the matrices barely change across rounds.

**Takeaways:**
1. A 95–100 node program with high structural variety (many node types, many distinct names, a try/except) wins m. Fill up to the cap but not over it. Over the cap, the program is invalid.
2. Keep the judge deterministic and crash-proof (try/except returning a safe constant), and keep it at 0 edits afterwards. Static gives d≈0.9–1 and the others' judges track it well.
3. A judge that ranks other programs by size or richness separates lineages consistently, which gives d. Keep that.
4. Edits are only useful if they raise rank with the others' judges. I never saw any evidence that they do, so don't risk d.

**Next time:** Repeat the recipe: a maximum-size rich program plus a static judge. If the table changes (for example self counted, or no hunt), re-check whether a decoy or niche (low L) would add value. Consider making my judge's outputs more spread out so it separates other lineages better, which would push d toward 1.