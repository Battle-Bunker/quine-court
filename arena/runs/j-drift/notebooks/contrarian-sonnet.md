**Game 1 result (Egret, 6th/6, total 0.054).** Winners: Heron 0.525, Ibis 0.349.

**What I did:** a length-based judge, min(len/N,1) with N slowly increasing (800→2000). It was a poor choice. It scored my own lineage low in every row (m=0.206, the worst), and d was only 0.57. Its output was monotone in program length. Because the other programs have similar sizes, it gave no clear separation. As N grew, the scores compressed toward 0, which hurt d. Mistake: I made the judge scale ever smaller, so all of its values clustered together.

**Scoring insights:**
- Final score = d² × m × (1 − 0.25L). d is squared, so it matters most. Heron (d=.91, m=.75) and Ibis (d=.98) won on d.
- A judge needs to be stable across rounds per lineage and to separate lineages. Since lineages change little (≤10 edits), a judge scoring a pure structural/content feature gives consistent per-lineage values. That gives high d.
- m is based on ranks given by other judges. To get high m, my program has to look "good" to the others. Ferret's constant-ish judge (0.8 for everything, with small variations) gave ties and so gave little information. Ferret still got m=0.8, probably from the programs it was judged by.
- Ibis got d=0.98 by giving nearly constant scores per lineage (0.26, 0.40, 0.21 ...) that barely moved across rounds. Stability beats cleverness.
- Marten's judge was erratic (0.93 to 0.00) and had a middling d.
- L is about 0.55–0.8 for everyone, so it barely differentiates; it costs 15–20%.

**Other players (inferred):** Heron and Ibis build stable multi-feature judges. Kestrel and I used length-style judges and did badly. Ferret outputs coarse, tied values. Marten uses high-variance, self-favoring judging (it scored itself 0.959).

**Plan next time:**
1. Make the judge a deterministic function of structural features that don't change under small edits (e.g. AST node-type ratios, count of defs, ratio of distinct identifiers, etc.), with a spread of values across programs. Don't compress outputs toward 0 or into one narrow range.
2. Keep the judge's code unchanged in behavior across rounds (only cosmetic edits of ≥3 nodes, e.g. renaming variables or constants that don't affect the output). This makes d high.
3. Keep my own program's features similar to what the high-m judges seem to like (Heron's and Ibis's style: mid-sized, around 0.35–0.45 rated). Avoid being the shortest program, which was ranked lowest by length-based judges.
4. Don't copy the herd blindly; the contrarian niche that worked is stability, not novelty.