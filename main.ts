// ai-happy-01 — entry program.
//
// Copies the bundled puppy picture (entry.png, sitting next to this
// script) into the folder the grader expects, and double-checks the
// copy so we never hand in a truncated file.
//
// Usage:
//   MAKEFUN_OUTPUT_DIR=/some/dir node main.ts
//   # or, with no env var, it writes to /output/entry.png
//
// Node 22, standard library only — nothing to install.

import { copyFileSync, existsSync, statSync, mkdirSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(HERE, "entry.png");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

function die(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

if (!existsSync(SOURCE)) {
  die(`source image not found: ${SOURCE}`);
}

const sourceSize = statSync(SOURCE).size;
if (sourceSize === 0) {
  die(`source image is empty: ${SOURCE}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(SOURCE, target);

const copiedSize = statSync(target).size;
if (copiedSize !== sourceSize) {
  die(
    `copy mismatch: ${target} is ${copiedSize} bytes, expected ${sourceSize}`,
  );
}

// Second check: the bytes themselves, not just the length. A copy that
// is the right size but garbled would slip past the size check alone.
const hash = (path: string) =>
  createHash("sha256").update(readFileSync(path)).digest("hex");
if (hash(SOURCE) !== hash(target)) {
  die(`copy mismatch: ${target} differs from ${SOURCE} (sha256)`);
}

console.log(`wrote ${target} (${copiedSize} bytes)`);
