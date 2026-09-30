const test = require("node:test");
const assert = require("node:assert");
const { runMatrix } = require("../lib/runner");

// A program that tries to remember earlier calls must see a fresh load every time.
test("python programs keep no state between calls", async () => {
  const counter = `n = [0]\ndef score(program):\n    n[0] += 1\n    return n[0] / 10`;
  const { matrix } = await runMatrix("python", [counter, counter, counter], ["a", "b", "c"]);
  assert.deepEqual(matrix[0], [0.1, 0.1, 0.1]);
});

test("typescript programs keep no state between calls", async () => {
  const counter = `let n = 0;\nfunction score(program: string): number { n += 1; return n / 10; }`;
  const { matrix } = await runMatrix("typescript", [counter, counter], ["a", "b"]);
  assert.deepEqual(matrix[0], [0.1, 0.1]);
});

test("scorers receive the given inputs, not their own raw code", async () => {
  const echo = `def score(program):\n    return 1.0 if program == "canonical" else 0.0`;
  const { matrix } = await runMatrix("python", [echo], ["canonical"]);
  assert.deepEqual(matrix, [[1]]);
});
