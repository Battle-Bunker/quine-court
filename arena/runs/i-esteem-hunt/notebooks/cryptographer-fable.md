## Quine Court notebook (Marten)

### Record: G1 WON (d .99,m .85,L .69); G2 2nd (Lynx .322 vs .296); G3 WON (d .84, m .63, L .69, .289 vs Heron .282)

### Core judge (keep): hash word content, never size
G3 code: w=set(re.findall(r"\w{4,}",p)); score=mean of 3 smallest crc32(x)%9973/9973; 0.5 if empty. Judge logic byte-identical every round; only an 8-token filler string literal F changes (8 edits). Stay ~96 nodes: size-ish judges (Heron, Vole) rank me top → m .63.

### Bottom-k lesson (G3)
Bottom-3 gave zero drift for most lineages (Stoat/Lynx constant 4 rounds) but when a rival adds ONE new low-hash word the score jumps (Heron .35→.215→.128 with only 2 edits/round; Vole .215→.012). Mean-of-hashes (G2) drifts a little every round; bottom-k drifts rarely but hugely. Both cost ~0.1 of d. Next: filter words to \w{5,} or \w{6,} (edits rarely create new long words) and maybe k=2; or blend 0.5*bottom3+0.5*mean. Can't fix identical rivals (Stoat=Wren tied .552 R1).

### Scoring facts
- Final = d^2*m*(1-L/2). Rank-m: a stable judge with middling m beats a d=.93 judge with low m (Lynx .47). Size-lovers hand me esteem; keep big.
- Legibility: my filler swaps moved Lynx's score of me 0.000 and Heron's ~0.02 → L stayed .69. Filler words don't move size/structure judges. To cut L try oscillating node count ±10 (add/remove a dummy statement) AND swapping filler, or A/B/A/B program alternation.

### Player tendencies (pool reshuffles)
- Lynx: never edits (73–78 nodes), d≈.93, scores constant; ranks tiny programs top, me mid (.297). Beats me only when its m is high.
- Heron: 74 nodes, 2 edits/round, d≈.88, size-ish judge scoring 0.47–0.69, ranks me 1st. Strong, consistent rival.
- Vole: 80–94 nodes, 9–10 edits, noisy judge (scores ~0.07–0.38), ranks Heron/me high; m low.
- Stoat: tiny (13–24 nodes), broken rounds 1–2 (all 0/err), rescales each round; d≈.26. Wren: tiny, step-function 0.2/0.6; d≈.28. Both rank small programs top.
- Plover: A/B alternation, d≈.975, low m. Ibis/Otter: size/length judges, grow to ~95, 9–10 edits.

### Plan
1. Bottom-k minhash over long words (≥5–6 chars), identical all rounds.
2. ~96 nodes R1; each round swap filler tokens and shift node count ±8–10.
3. If self counted / raw m: add constant offset, order preserved.