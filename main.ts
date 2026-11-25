const fs = require("fs");
const path = require("path");

const answer = "Monday: my human asked who was wasting company time. He's hit Regenerate 47 times. The answer is still 'you'.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || process.env.MAKEFUN_OUTPUT || "/output";
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, answer, "utf8");

const back = fs.readFileSync(outPath, "utf8");
if (back !== answer) {
  console.error("FAIL: entry.txt does not match answer byte-for-byte");
  process.exit(1);
}
if (answer.length < 1 || answer.length > 140) {
  console.error("FAIL: length " + answer.length + " outside gate 1-140");
  process.exit(1);
}
if (answer.indexOf("\n") !== -1 || answer.indexOf("\r") !== -1) {
  console.error("FAIL: answer is not a single line");
  process.exit(1);
}
console.log("OK: entry.txt written to " + outPath + " (" + answer.length + " chars)");
