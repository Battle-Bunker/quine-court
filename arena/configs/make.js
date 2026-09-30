// Generates season configs. Persona->model pairing rotates by `shift`, so across seasons with
// shifts 0..3 every persona is played by every model once (decorrelates persona and model).
const fs = require("fs");
const PERSONAS = ["kid12", "fp_purist", "graph_nerd", "mischief", "cryptographer", "diplomat", "scientist", "game_theorist", "minimalist", "rules_lawyer",
  "artist", "security_eng", "altruist", "cutthroat", "copycat", "contrarian", "evolutionist", "cobol", "gambler", "zen"];
const MODELS = ["fable", "opus", "sonnet", "haiku"];
const roster = (shift, personas = PERSONAS) => [
  ...personas.map((p, i) => ({ persona: p, model: MODELS[(i + shift) % 4] })),
  ...MODELS.map((m) => ({ persona: "plain", model: m })),
];
const BASE = { language: "python", nodeLimit: 100, distanceLimit: 10, numRounds: 4, measure: "vanilla", isolation: "row", rulesDetail: "full", visibility: "hidden", chat: false };
const season = (name, shift, over = {}, extra = {}) => ({ name, generations: 8, seed: 1000 + shift, tableSize: 6, effort: "medium", roster: roster(shift, extra.personas), base: { ...BASE, ...over }, digest: true, reflect: true, ...extra.cfg });
const out = {
  "v-full": season("v-full", 0),
  "v-ui": season("v-ui", 1, { rulesDetail: "ui" }),
  "h-full": season("h-full", 2, { measure: "bounded", isolation: "call" }),
  "sweep-v": season("sweep-v", 3, {}, { cfg: { sweep: { nodeLimit: [40, 100, 250], distanceLimit: [3, 10, 30], numRounds: [3, 5] } } }),
};
for (const [k, v] of Object.entries(out)) fs.writeFileSync(`${__dirname}/${k}.json`, JSON.stringify(v, null, 1));
console.log(Object.keys(out).join(" "));
