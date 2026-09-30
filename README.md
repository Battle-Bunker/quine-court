# quine-court
Every program sits on the bench and stands trial: win by judging sharply and being judged well, a few AST edits at a time

## Run

```
npm install
npm start            # http://localhost:8080 (needs python3 on PATH for Python rooms)
```

Create a room at `/`, share `/room/<uuid>`. The creator's browser holds the admin token (localStorage).
Programs define `score(program) -> number in [0,1]`. Rows of each round's matrix are the scorer, columns the scored program.
Evaluators never see raw source: each program is canonically minified first (`lib/canonical.js`): comments and Python
docstrings removed, every symbol the program defines renamed `v1, v2, …` in order of first definition (`score`,
builtins and attribute/property names are kept so the result still runs), and whitespace regenerated from the AST.
String and number literals are untouched. Node limits and edit distances are still measured on the raw code.
Final score per player = d² × m (see `lib/scoring.js`). Deploy: `fly deploy` (Dockerfile + fly.toml included).

MVP limits: in-memory state (lost on restart), no auth, subprocess execution is not a security sandbox.
