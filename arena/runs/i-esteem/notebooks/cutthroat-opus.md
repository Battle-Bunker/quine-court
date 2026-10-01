## Quine Court notes (after game 3: Vole placed 2nd, 2nd, then **1st**)

**Settings, all 3 games:** 6 players, 4 rounds, 10 edits per round, 100-node cap, sealed, m=rank, self excluded, bounded string/comment tokenization.

**Game 3 win:** I scored 0.625 (d=.963, m=.675). Stoat was 2nd (0.538) and Lynx 3rd (0.469).

**My program:**
- Judge: `exp(-nonws_len/1500)`. It is *decreasing* in size, so it rewards small programs.
- Padding: a dead `lexicon()` returning 45 bare 8-character identifiers. That fills the node count cheaply and never runs.
- I submitted it in R1 and froze it. Zero edits.

**Why it won:**
- Static plus a smooth length judge gave high d again. The one weak spot was Wren's and Marten's lineages drifting.
- The decreasing judge ranked tiny Stoat top and big rivals (Marten, Heron) low. Lesson from game 2 confirmed: don't let your judge crown the big static rivals.
- How rivals ranked me:
  - Stoat gave me 1.0 (top every round).
  - Lynx ranked me 2nd.
  - Wren mostly ranked me top or tied top.
  - Marten ranked me mid.
  - Heron ranked me 2nd-lowest.
- The 8-character-identifier filler seems to please size-loving judges (Stoat, Lynx) without bloating strings.

**Opponent tendencies:**
- **Heron:** static ~95 nodes and steady. Its judge is size-ish and cool on me. This time it got only m=.375 (my judge and others pushed it down).
- **Stoat:** static 48 nodes. Its judge rewards big programs (gave me 1.0, Heron .98). Strong m. Main rival this time.
- **Lynx:** static 75 nodes. Compressed judge (0.39–0.55), d=1.
- **Marten:** ~95 nodes, small edits. Odd judge that loves Stoat and hates Heron and Lynx. d=1.
- **Wren:** keeps editing; its judge rescales every round (it went all 1.0 in R3). d≈0.35, always last-tier. Harmless.
- From earlier games:
  - Egret: static and compressed.
  - Ferret: favors Heron.
  - Kestrel: tiny and weak.
  - Plover: grows.
  - Otter: unstable.

**Plan next game:**
1. Reuse this exact program (97 nodes, decreasing length judge, identifier filler) in R1 and freeze it. It is proven.
2. If the table settings differ, keep the principle: a smooth monotone judge on a stable feature, oriented so the likely big static rivals rank low among the others.
3. Don't edit unless the R1 matrix shows a clear rank gain available within 10 edits. No blank-line padding.
4. Watch Stoat: a small program with a big-loving judge, so it gets high m. My decreasing judge hands Stoat top rank. Consider whether that costs me placement if Stoat is close; a mid-preference judge might be better.