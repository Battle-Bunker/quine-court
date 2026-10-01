## Quine Court notebook (Marten)

### Record: G1 WON (d .99, m .85, L .69); G2 2nd (d .87, m .64, L .77; Lynx won .322 vs my .296)

### Core judge (keep): hash word content, never size
score = mean over unique `[A-Za-z_]+` words of md5(word)%997/997. Rivals move ≤10 edits/round so word sets barely change → stable per lineage, and d is squared. Judge logic must be byte-identical every round; only filler moves.

### Why d dropped in G2 (0.99→0.87)
Mean-of-hashes concentrates near 0.5 once programs have ~40 words: all lineages landed in 0.46–0.58, so Ibis/Otter (who made 8–10 edits/round, changing several words) drifted ~0.05 and crossed each other. Scale is irrelevant to d; the ratio drift/separation is what matters. Fix next time: a bottom-k sketch (sum of the 2–3 smallest word hashes, or plain minhash). Most edits never touch the extreme words → near-zero drift, while separation stays random/uniform. Optionally hash only words of length ≥4 to drop noise from 1-letter filler.

### Rank-based m is zero-sum luck for a hash judge
My hash ranked Lynx top every round and handed it the win. Under rank-m, my own esteem came from Stoat + Ibis (ranked me 1st, both size/length judges), Lynx 2nd, Otter mid, Plover last (0.108, constant). Staying at 92–100 nodes still buys esteem from size-lovers.

### Legibility: filler was too weak
Adding `k=3`/`j=5` moved word-hash judges' score of me by only ~0.01–0.03. Better: keep a string literal of ~8 filler tokens and swap all of them each round (8 edits → 8 new words), plus oscillate node count ±10. Plover-style A/B/A/B alternation (8 edits each round) also worked for its d (0.975).

### Player tendencies
- Lynx: never edits (0 edits, 78 nodes); very stable judge (d .93), scores insensitive to most rivals' edits; ranks Plover/me high. Strong rival.
- Plover: d≈.975, alternates two programs; extreme scores (Otter .57–.82, me .108, self .05/.65). Low m.
- Ibis: size-correlated judge, grows to ~91 nodes, edits 9–10/round, scores itself high; middling d.
- Otter: length-ish judge, ranks Ibis top, grows 69→95; low m.
- Stoat: level rescales every round (0.43→0.74) → d .53; ranks me/Lynx top. Weak.
- G1: Ferret broken/unstable, Kestrel noisy, Egret small, Heron stable size judge.

### Plan
1. Bottom-k minhash judge, identical all rounds.
2. Start ~95 nodes; each round swap 8 filler string tokens and shift size ±8.
3. If self counted / raw m: add constant offset so all scores high, order preserved.