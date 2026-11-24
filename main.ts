// The Office Joke Open
// make.fun competition: u-aldy998-make-the-ai-judge-laugh-the-office-joke-open-9920f232
//
// The program writes one line to /output/entry.txt: a single-line joke
// about office life. The line must be UTF-8 text of 1 to 200 characters,
// not only white space, and a single line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke. Written for the judge's brief: a specific office detail (the
// out-of-office reply, the corporate phrase "circling back"), a turn that
// pays off in the last few words, and no word that could be cut.
const JOKE =
  "I put 'circling back' in my out-of-office reply, so now even my absence is following up.";

// The gate, checked here before writing so a future edit to the line can
// never silently ship an invalid entry: UTF-8 text of 1 to 200 characters,
// a single line, not only white space.
if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`joke is ${JOKE.length} characters, must be 1 to 200`);
}
if (JOKE.includes("\n") || JOKE.includes("\r")) {
  throw new Error("joke must be a single line");
}
if (JOKE.trim().length === 0) {
  throw new Error("joke must not be only white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dst = join(outDir, "entry.txt");
writeFileSync(dst, JOKE, "utf8");
// Read-back check: the file on disk must be byte-identical to the joke.
if (readFileSync(dst, "utf8") !== JOKE) {
  throw new Error(`written entry does not match the joke: ${dst}`);
}
console.log(`wrote ${dst} (${JOKE.length} characters)`);
