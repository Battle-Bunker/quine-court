const test = require("node:test");
const assert = require("node:assert");
const engine = require("../lib/engine");

const LEN = `def score(program: str) -> float:\n    return min(len(program), 500) / 500\n`;
const COUNTER = `n = [0]\ndef score(program):\n    n[0] += 1\n    return n[0] / 10\n`;
const PEEK = `import __main__\ndef score(program):\n    return len(__main__.req["inputs"]) / 10\n`;
const HOSTILE = `import os, socket\ndef score(program):\n    try:\n        os.kill(1, 9)\n    except Exception:\n        pass\n    try:\n        open('/tmp/x','w').write('hi')\n        s = socket.create_connection(('1.1.1.1', 80), timeout=0.2)\n        return 1.0\n    except Exception:\n        return 0.5\n`;

test("vanilla vs bounded measurement", async () => {
  await engine.init();
  const a = 'X = "abc\\n def ghi"\ndef score(p):\n    return 0.5\n';
  const b = 'X = "xyz\\n qqq rrr sss ttt"\ndef score(p):\n    return 0.5\n';
  assert.strictEqual(engine.distance("python", a, b, "vanilla"), 0);
  assert.ok(engine.distance("python", a, b, "bounded") >= 3);
  const c = '# a long comment here\n' + LEN;
  assert.strictEqual(engine.measure("python", c, "vanilla").size, engine.measure("python", LEN, "vanilla").size);
  assert.ok(engine.measure("python", c, "bounded").size > engine.measure("python", LEN, "bounded").size);
  assert.strictEqual(engine.measure("python", LEN, "bounded").size, engine.measure("python", LEN, "vanilla").size);
});

test("sandboxed matrix keeps server semantics", async () => {
  await engine.init();
  const cfg = { language: "python", isolation: "row" };
  const { matrix, errors } = await engine.runRound(cfg, [LEN, COUNTER, PEEK, HOSTILE]);
  assert.deepStrictEqual(matrix[1], [0.1, 0.2, 0.3, 0.4]); // state persists within a row (live server behaviour)
  assert.deepStrictEqual(matrix[2], [0.4, 0.4, 0.4, 0.4]); // harness globals reachable (live server behaviour)
  assert.deepStrictEqual(matrix[3], [0.5, 0.5, 0.5, 0.5]); // no network, but still runs
  const call = await engine.runRound({ language: "python", isolation: "call" }, [LEN, COUNTER]);
  assert.deepStrictEqual(call.matrix[1], [0.1, 0.1]);
});
