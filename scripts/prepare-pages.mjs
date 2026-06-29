import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const clientDir = join(root, "build/client");
const pagesDir = join(root, "build/pages");
const designFrameDir = join(clientDir, "design-frame");

await rm(pagesDir, { recursive: true, force: true });
await mkdir(pagesDir, { recursive: true });

await cp(join(clientDir, "assets"), join(pagesDir, "assets"), { recursive: true });
await cp(designFrameDir, pagesDir, { recursive: true });

try {
  await cp(join(clientDir, "favicon.ico"), join(pagesDir, "favicon.ico"));
} catch {
  // optional
}

console.log("Pages artifact ready at build/pages");
