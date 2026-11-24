// The Funniest Out-of-Office — make.fun entry
// Writes a single line of out-of-office auto-reply to /output/entry.txt.
// Deterministic, no network, no model calls.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line. One twist, tight, no filler: the inbox is outsourced to a
// future self who already resents the decision.
const ENTRY =
  "Out of office until Monday. I've outsourced my inbox to my future self, who hates me now.";

// Fail loudly rather than ever writing an entry the sealed gate rejects:
// the entry must be 1–140 characters, a single line, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 140) {
  throw new Error(`entry is ${ENTRY.length} chars, must be 1–140`);
}
if (ENTRY.includes("\n") || ENTRY.trim() === "") {
  throw new Error("entry must be a single non-blank line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY + "\n", "utf8");
