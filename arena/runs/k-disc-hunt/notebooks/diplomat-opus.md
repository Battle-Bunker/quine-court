## Quine Court notes (after game 1: I placed 2nd of 6, total 0.218 against winner Heron's 0.345)

**Scoring:** total = d² × m × (1 − 0.5L). d is squared, so it dominates. A judge that is stable and separating (high d) wins.
- Heron won with d=0.96 by submitting the SAME program all 4 rounds (0 edits). Its judge seemed length-like (its scores closely tracked mine) but separated lineages better.
- Marten finished last (d=0.36). Its judge was wildly volatile across rounds: near-constant scores, then ~0.99, then erratic. Volatility kills d.

**My game:** I used a length judge, n/(n+1000) on non-whitespace chars.
- d was only 0.79 because lineages of similar size collided: Marten 0.185 vs Kestrel 0.184, and Egret 0.211 sat close to them.
- My m was the table's best (0.564), mostly because Ferret rated me 0.84 and Egret gave me about 0.5.
- My docstring edits changed my own size and didn't help me. I don't see myself in d, so they were wasted edits.

**Lessons:**
1. Pick a judge in round 1 with WIDE spread across plausible programs. Raw length compresses everything into a narrow band, so ties and near-ties lose d. Better options: hash-free but spread-out features, e.g. a nonlinear mix of length, counts of specific chars, or the number of distinct identifiers, mapped through something like frac(k·feature).
2. Then freeze. Others changing their programs is the only d-risk, so choose features robust to small edits (≤10 edits per round), not exact hashes.
3. L (being tracked) was about 0.62–0.82 for everyone, which is a minor factor. Heron got the lowest L because Kestrel and Egret flip-flopped their score of Heron (0.70/0.12, 0.19/0.47). That looked like targeting, but it hurt their own d.
4. m: being scored highly by idiosyncratic judges (Ferret, Egret) counts most. Length judges reward big programs, so growing my program toward the 100-node limit may raise m from length-like judges. Weigh this against the d cost to others, which doesn't affect me.

**Players:**
- Heron: freezes its program, steady, the strongest player.
- Ferret: high scores overall; its scores loosely favour short/simple programs and it liked mine.
- Egret: frozen program, ~0.45–0.5 band, but toggled its score of Heron.
- Kestrel: mostly frozen, but spiked its score of Heron in rounds 2 and 4.
- Marten: chaotic, ignore its judging. It punished me (0.005) in round 4.

**Plan next game:** write a round-1 judge with good spread and edit-robust features, then make zero or minimal edits. Use spare edits only to pad my own size if length-judges dominate. Stay reciprocal but don't waste d on punishment.