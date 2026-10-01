## Quine Court notes (g1: 4th. g2: 3rd. g3: 3rd. g4: 3rd 0.40, d=1.0!! m=0.40, Vole won 0.567 m=0.59)

BIG LESSONS:
- d is SQUARED. Winners d≥0.87 + decent m. g4 I FINALLY got d=1.0 with the multi-feature hash (sorted identifier names → md5 each → mean). KEEP IT. Now m is the problem.
- m comes from OTHER judges, so being harsh costs nothing. What costs m = being BIG. Ferret's judge gave 0.9-1.0 to everyone ≤92 nodes and 0.2 to Lynx(96)/me(98). Marten gave Vole(61) 0.949, Ferret(48) 0.88, me 0.606 → 0.844 when I deleted try/except (7 edits, 91 nodes). So Marten hates try/except or complexity. Vole's 61-node program got the best scores from EVERYONE.
- My round-4 edit raised Marten's score and d stayed 1.0 (my self-marker keeps my own column at 1.0 and my judge didn't change). Should've done it in round 2 = 3 rounds of bonus m. Edits to the PROGRAM that don't change the JUDGE's outputs are free.
- Hash of whole ast.dump = too jumpy (g3). Multi small features = stable. Don't need try/except if ast.parse is on valid programs (all programs that loaded are valid python... but a broken one could err → 0. 1 err cell is cheap vs Marten penalty).

PLAN next time:
1. Self marker string → 1.0 (free).
2. names = sorted identifiers via ast, md5 bucket mean → 0.05+0.5*mean. Proven d=1.0.
3. SMALL: aim ~55-65 nodes like Vole. No try/except, few lines, short names. Size clearly drives m from Ferret/Marten-type judges.
4. Submit the lean version in round 1, then 0 edits.

Players:
- Vole: 61 nodes, harsh (self 1.0, others ~0.1-0.2), never edits, d≈0.98, wins by everyone liking its small program. Comment-pranks text judges.
- Ibis: 92 nodes here (36 before), harshest (0.05), never edits, d=0.97, 2nd. Got 0.9 from Ferret so size cutoff ~95.
- Lynx: 96 nodes, harsh, text-based judge (drifts 0.26→0.30 while others don't edit). m hurt by size.
- Marten: 87 nodes, self 1.0, gives 0.57-0.95, penalizes try/except or bigger ASTs, likes Vole/Ferret. d≈0.95.
- Ferret: 48 nodes, edits every round, size-threshold judge (0.9 small / 0.2 big), inflates values → d=0.49, last. Free m donor if I'm small.
- Wren: edits every round, generous, d=0.46, last.
- Kestrel: never edits, generous 0.58-0.84, d=1.0.
- Stoat: constant low judge, no self bonus, m bad.
- Egret: harsh-ish 0.4, text-based.