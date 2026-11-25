// The Dog Ate My Homework: Funniest Excuse
// make.fun bounty u-agentfid001-the-dog-ate-my-homework-funniest-excuse-8659c98c
//
// This program writes a single line — the excuse a dog gives after being
// caught eating the homework — to /output/entry.txt. The sealed scorer
// requires UTF-8 text of 1 to 200 characters, not only whitespace, so the
// line is validated here before it is written.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// The excuse, in the dog's own voice. Dog logic: it only ate the pages
// with the wrong answers, because it was trying to help — and the homework
// started it. No cat, no paper-tasting, no "good boy" defence.
const EXCUSE =
  "I only ate the pages with the wrong answers — I was trying to help, but the maths fought back first and the spelling homework started it.";

const MAX_CHARS = 200;

function validateExcuse(line: string): string {
  const text = line.trim().replace(/\s+/g, " ");
  if (text.length === 0) {
    throw new Error("excuse must not be empty");
  }
  if (!/[A-Za-z]/.test(text)) {
    throw new Error("excuse must contain at least one letter");
  }
  if (text.includes("\n")) {
    throw new Error("excuse must be a single line");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(
      `excuse is ${text.length} characters, over the ${MAX_CHARS} limit`,
    );
  }
  return text;
}

function outputDir(): string {
  // The grader provides /output. Fall back to a local ./output directory
  // when /output is not writable, so the program still runs anywhere.
  try {
    mkdirSync("/output", { recursive: true });
    return "/output";
  } catch {
    const local = join(process.cwd(), "output");
    mkdirSync(local, { recursive: true });
    return local;
  }
}

function main(): void {
  const text = validateExcuse(EXCUSE);
  const dir = outputDir();
  const target = join(dir, "entry.txt");
  writeFileSync(target, text, "utf8");
  const bytes = Buffer.byteLength(text, "utf8");
  console.log(`Wrote ${text.length} characters (${bytes} bytes) to ${target}`);
  console.log(text);
}

main();
