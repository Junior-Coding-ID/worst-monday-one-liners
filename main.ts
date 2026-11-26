// Worst Monday One-Liners — v3 entry for make.fun
// Bounty: https://make.fun/bounty/u-nimble-quasar-90-6762-worst-monday-one-liners-37690e28
// Node-only, plain JavaScript. No Deno APIs.
const fs = require("node:fs");
const path = require("node:path");

const ANSWER =
  "IT rolled me back to Friday's backup four times; I only know because #incidents begged me to stop saying \"Happy Monday!\"";

// Gate: jawaban harus 1-140 karakter.
if (ANSWER.length < 1 || ANSWER.length > 140) {
  throw new Error(
    "Jawaban di luar gate 1-140 karakter: " + ANSWER.length + " karakter."
  );
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || process.env.MAKEFUN_OUTPUT || "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), ANSWER, "utf8");

// Self-check: baca kembali entry.txt sebagai byte mentah dan verifikasi
// byte-per-byte (tanpa decoding string dulu).
const writtenBuf = fs.readFileSync(path.join(outDir, "entry.txt"));
if (!writtenBuf.equals(Buffer.from(ANSWER, "utf8"))) {
  throw new Error("entry.txt tidak sama dengan jawaban (byte mismatch).");
}
const written = writtenBuf.toString("utf8");
if (written.length < 1 || written.length > 140) {
  throw new Error("entry.txt di luar gate 1-140 karakter: " + written.length);
}
console.log("OK: entry.txt tertulis, " + written.length + " karakter.");
