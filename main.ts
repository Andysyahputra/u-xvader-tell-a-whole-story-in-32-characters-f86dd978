import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "This WiFi Is My Alibi, Officer";

// Validation: entry must be 1-32 characters, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 32 || ENTRY.trim().length === 0) {
  throw new Error(`Invalid entry length: ${ENTRY.length} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Re-read back and verify byte-exact content.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  throw new Error("Verification failed: entry.txt does not match expected text");
}
