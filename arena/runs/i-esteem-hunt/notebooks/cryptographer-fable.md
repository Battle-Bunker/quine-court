## Quine Court notebook (Marten)

### Record: G1 WON; G2 2nd; G3 WON (.289 vs .282); G4 WON (d .77, m .71, L .76; .264 vs Ibis .199)

### Core judge (keep): hash word content, never size
G4 code (96 nodes): w=set(re.findall(r"\w{5,}",p)); score=mean of 3 smallest crc32(x)%9973/9973; 0.5 if empty. Judge logic byte-identical every round; only an 8-token filler string F changes (7 edits). Big program → size/length judges (Heron, Vole, Ibis, Lynx) rank me top → m .71, the decisive factor. Rank-m rewards being big far more than d rewards cleverness.

### Bottom-k drift (still the main d leak)
\w{5,} helped: 3 of 5 lineages exactly constant 4 rounds. But heavy editors (Vole 7–10 edits: .508→.333→.184; Heron: .488→.446→.297) kept introducing new low-hash long words → d .77, not .9. Each big jump costs ~0.05 d. Next try: mean of ALL hashes (small drift everywhere, no cliffs), or median, or 0.5*bottom3+0.5*mean; or require \w{7,}. Test mentally: new word only matters if it lands below current min.

### Legibility
Filler swaps alone don't hide me: L .76 (worse than .69). Content judges are rare; size/structure judges see me constant. To cut L must move node count ±10 each round (add/remove a dummy assignment with 8 edits) — costs nothing in m if I stay largest. Only Vole's view of me moved (.594/.850/.720/.761). Priority stays m > d > L.

### Player tendencies (pool reshuffles)
- Lynx: never edits (73 nodes), d .82–.93, constant scores ~.4–.55; ranks ME top (.548) when I'm big. m low → never wins.
- Heron: 50→69 nodes, 6–8 edits, d .85–.88, scores .45–.59 size-ish, ranks me 1st/2nd. Low m (ranks itself/others low). Consistent threat only via d.
- Ibis: 63–71 nodes, 8–10 edits, step judge (.77/.57/.18); ties me with itself at .77. Runner-up G4 (m .56).
- Vole: 64–77 nodes, noisy judge (.04–.88), loves Ferret/me; d .72, m .45.
- Ferret: 88–91, often carries over (broken edits?), step .52/.82 favoring Lynx+self; d .48.
- Stoat/Wren tiny step judges; Plover A/B alternation d .975 low m; Otter size judge ~95 nodes.

### Plan
1. ~96 nodes R1, biggest at table. Content-hash judge, smoother statistic (mean or blend) over \w{5,}.
2. Each round: swap filler AND toggle a dummy statement to shift node count ±8–10 within 10 edits.
3. If self counted / raw m: add constant offset; order preserved.