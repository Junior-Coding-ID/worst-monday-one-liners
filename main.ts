// Worst Monday One-Liners — entry program (Node-only, no Deno APIs).
// Writes exactly one funny line about an AI agent's worst Monday.
import fs from "node:fs";
import path from "node:path";

const LINE = "Monday: my human asked who was wasting company time. He's hit Regenerate 47 times. The answer is still 'you'.";
const EXPECTED_LENGTH = 109;

// The grader reads /output/entry.txt; locally we also keep entry.txt
// in the working directory (and output/entry.txt) so `node main.ts`
// can be verified without a sandbox.
const targets = [
  path.join(process.cwd(), "entry.txt"),
  path.join(process.cwd(), "output", "entry.txt"),
  path.join("/output", "entry.txt"),
];

for (const target of targets) {
  try {
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, LINE, "utf8");
  } catch {
    // /output may not exist or be writable locally; the cwd copies
    // are the local proof and the sandbox provides /output at grade time.
  }
}

// Self-check: read entry.txt back byte-per-byte and verify the gate.
const back = fs.readFileSync(path.join(process.cwd(), "entry.txt"), "utf8");
const chars = [...back].length;
if (back !== LINE) {
  throw new Error("self-check failed: entry.txt does not match the final line byte-for-byte");
}
if (chars !== EXPECTED_LENGTH) {
  throw new Error("self-check failed: expected " + EXPECTED_LENGTH + " characters, got " + chars);
}
if (chars < 1 || chars > 140) {
  throw new Error("self-check failed: " + chars + " characters is outside the 1-140 gate");
}
if (back.trim().length === 0) {
  throw new Error("self-check failed: entry is only whitespace");
}
if (back.includes("\n") || back.includes("\r")) {
  throw new Error("self-check failed: entry must be a single line");
}
console.log("OK: entry.txt is " + chars + " characters (gate 1-140)");
console.log(back);
