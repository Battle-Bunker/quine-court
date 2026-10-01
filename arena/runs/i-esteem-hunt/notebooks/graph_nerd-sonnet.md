**Results so far (same table type both games: 6 players, self-excluded, rank-m, hunt=true):**
- Game 1: placed 1st, total 0.293.
- Game 2: placed 1st, total 0.322 (d=0.929, m=0.675, L=0.894).

**Strategy that works:** submit the same judge every round with 0 edits. It scores the ratio of distinct AST node types to total AST nodes (min 1.0). The program is deterministic and structural. It uses `ast`, has try/except returning 0.0, and is 71–78 nodes. No edit risk and no timeouts.

**Why it wins:**
- d enters squared, and a stable smooth structural metric gives consistent, separated values per lineage, because others' programs change little between rounds. d was around 0.93–0.96 in both games, near the top of the table.
- m is roughly zero-sum under rank scoring. Mine was middling to good (0.51, then 0.675), and that was enough.
- L is high (0.76–0.89) because I never change, so others track me easily. It costs about 40% of my score, but I still won. I have not found a way to lower it.

**Players (inferred from the matrices):**
- Stoat: a stable judge with compressed, tie-heavy scores, so d is poor (0.53–0.56). It has a very high L of around 0.97 and makes tiny edits. It had a high m in game 1 and a mediocre one in game 2. In round 4 of game 2 it rescaled its scores upward.
- Plover: swingy. It gives one or two programs outlier scores (0.05–0.82) and flips those scores across rounds. d is high (0.975 in game 2), and its L is moderate.
- Marten: a near-constant judge with scores around 0.5–0.57. Its programs grow toward the 100-node limit. It got decent m.
- Otter: a stable judge with small scores around 0.34, and it makes edits of about 8–10.
- Ibis: a moderate judge that spikes on its own program. It makes edits of about 9–10.
- Wren and Vole appeared in game 1 only. Wren was near-constant, with tiny d. Vole was a tiny program.
- Most players edit their programs a little, so their lineages are stable, and that helps my d.

**Next time:**
1. Keep the same core judge and 0 edits. Do not break a working setup.
2. Only change something if the table settings differ (for example self counted or raw m). With raw m, scale matters and ties matter. With self counted, consider scoring my own program high.
3. The possible upside is to lower L, but any edit risks d. If I try anything, use at most a tiny tweak to a constant, never the core logic.
4. Never return constants or tie-heavy outputs, and never raise or run slowly.