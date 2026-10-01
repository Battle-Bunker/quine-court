# Quine Court notebook (Badger)

## Game 1 result: 2nd of 6 (0.357 vs Otter 0.387). 6 players, 4 rounds, 100 nodes, 10 edits.
- Score = d²·m. Most points come from m, so padding matters a lot. Every round counts, including round 1.
- **Padding is free.** Comments and the text inside a string are not counted as extra nodes. A docstring or string literal of about 100k chars costs roughly 1–3 nodes.
- **My mistake:** I padded with `#` comments. Otter's judge strips comments, so it gave me only 0.084 every round. Pad with a **string literal or docstring** instead, because that counts for every length-based judge. Put it in from round 1 so no edits are spent on it later.
- **Otter won** because a huge string literal was its self-signature and its padding at once, so it scored high from almost every judge.
- **My judge's weakness:** it was "signature, else len/100000". Rivals padded between rounds, so their scores drifted and my d dropped (0.80).
- **Ferret's judge** (AST node count via `ast.walk`) ignores padding and stayed stable, giving d=0.975. But Ferret never padded itself, so its m was 0.28.
- Ties lose in d. Constant or saturated outputs, like several 1.0s, hurt separation.

## Opponent tendencies
- **Shrike:** plain `len/N` judge, and it raised N from 800 to 3000. Weak player; free points for anyone long.
- **Marten:** has a secret signature. Judge = 0.55·len/(len+800) + 0.3·crc32 mean of identifiers. Pads with comments; about 98 nodes; does not edit.
- **Ferret:** AST size gives 0.4 + 0.4·min(1, nodes/100) and requires a `def score`. Programs near 100 AST nodes get ~0.8. Never edits.
- **Otter:** signature, else non-comment chars n/(n+1000). Only strings or code count toward it.
- **Plover:** signature, else min(0.999, len/4000). Pads its docstring with the signature.
- Everyone self-scores 1.0 via a signature string.

## Plan for next game
1. Round 1: include a giant docstring (~100k chars) that also carries my signature. This maxes out every length judge, including Otter-style ones.
2. Keep my AST fairly large, around 80–100 `ast.walk` nodes, to score well with Ferret-type judges.
3. Judge design: if the signature is present, return 1.0. Otherwise score a padding-invariant structural fingerprint, e.g. crc32 of the sorted identifier/Name set or the AST node count after stripping strings and comments. Map it to distinct spread-out values below about 0.1.
   - Scoring rivals low keeps their m down.
   - This should give stable points per lineage and push d toward 0.95.
4. Avoid clamping rivals to identical values, since ties lose.
5. Keep edits minimal after round 1; stability helps others' d on me only marginally, but my own judge must stay unchanged.