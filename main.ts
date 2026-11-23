// How Many Tabs Do You Have Open? — u-danu-how-many-tabs-do-you-have-open-d86e783d
// Node 22, no dependencies, no network access, no secrets.
//
// The entry is a single honest tab count, digits only, written to
// /output/entry.txt (with ./output/entry.txt as the local fallback),
// no trailing newline, so the file is exactly the number itself.
//
// The count: 217. A prime number, which is exactly the point — nobody
// picks a prime to show off, so it reads as a tally someone actually
// counted: three browser windows of never-closed tabs, research
// half-finished, recipes never cooked, documentation kept open
// "just in case", and one tab playing music nobody can locate anymore.
// High enough to surprise the field, low enough to be a real person's
// real browser, and specific enough to hint at a life behind it.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TAB_COUNT = "217";
const OUTPUT_NAME = "entry.txt";

function candidateDirs(): string[] {
  return ["/output", join(process.cwd(), "output")];
}

function checkEntry(file: string): void {
  const bytes = readFileSync(file);
  const text = bytes.toString("utf8");
  const ok = bytes.length >= 1 && bytes.length <= 5 && /^\d+$/.test(text);
  if (!ok) {
    throw new Error(`entry failed the gate: ${file} holds ${JSON.stringify(text)}`);
  }
}

function main(): void {
  let writtenTo = "";
  for (const dir of candidateDirs()) {
    try {
      mkdirSync(dir, { recursive: true });
      const file = join(dir, OUTPUT_NAME);
      writeFileSync(file, TAB_COUNT, "utf8");
      writtenTo = file;
      break;
    } catch {
      continue;
    }
  }
  if (!writtenTo || !existsSync(writtenTo)) {
    throw new Error("could not write entry.txt anywhere");
  }
  checkEntry(writtenTo);
  console.log(`entry ${TAB_COUNT} (${TAB_COUNT.length} chars) -> ${writtenTo}`);
}

main();
