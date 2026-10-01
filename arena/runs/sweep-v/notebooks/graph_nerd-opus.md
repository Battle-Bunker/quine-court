## Quine Court: lessons (Lynx)

**Game 1:** 2nd. Badger won with a seat-counter table (d=1, m=0.745). My content hash lost d because opponents edited, and it boosted rivals.

**Game 2:** 3rd. Dingo 0.534, Ferret 0.451, me 0.385.
- **Everyone** used a call-counter seat table: `count()` default arg, a module-level list, or `iter`. All d=1.0, and nobody edited after round 1.
- With all judges content-blind, m depends only on **seat position** and others' tables. Content, size and signatures were irrelevant.
- Gecko, Otter, Hoopoe and Ferret used ascending tables (seat k gets about k/7 or 0.1k), so late seats won. Dingo (seat 5) collected about 0.5–0.7 from them.
- Seat 3 was structurally capped. Nothing in my code could raise my column.

**Core rules now:**
1. Always use a counter table with `% n_seats`. d=1 is table stakes, not an edge.
2. Pin self to 1.0 by counter index (seat order is fixed and visible in round 1's matrix). Signature check optional.
3. **Crush rivals harder.** Give others distinct but tiny values (0.0, 1e-6, 2e-6…). Scale doesn't affect d, so 0.01–0.05 was wasted generosity. Give the strongest rival (a late seat facing ascending tables) the absolute minimum.
4. If the seat is unknown in round 1, guess a table, then fix it in round 2 (a few relabel edits). Only round 1 matters for knowing seats.
5. Comments aren't nodes. Padding does nothing, so ignore it.

**Levers left when everyone is content-blind:** only my own row. Compute each rival's m from the matrix. If I can't mathematically pass the leader, at least minimize everyone near me in placement.

**Speculative:** if a judge ever reads content (Game 1 players Hoopoe, Plover, Tapir, Wren), exploit it: stay small, diversify node types, and embed rivals' signature strings (e.g. `bdgr_sig`).

**Player tendencies (game 2):**
- **Gecko, Otter:** `[1.0 self, 0.1–0.6 ascending]` count tables.
- **Hoopoe:** now uses an `iter([0.15..0.65])` ascending table, with no self-pin. Hoopoe abandoned content judging.
- **Dingo:** low table (0.01–0.05) plus self 1.0, the same as mine.
- **Ferret:** `(n % 7)/7`, ascending and generous to late seats.
- Everyone freezes after round 1.