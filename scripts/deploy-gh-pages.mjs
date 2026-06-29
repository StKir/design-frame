import { execSync } from "node:child_process";
import { cp, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = process.cwd();
const pagesDir = join(root, "build/pages");
const remote = execSync("git remote get-url origin", { cwd: root, encoding: "utf8" }).trim();

execSync("npm run build:pages", { stdio: "inherit", cwd: root });

const workDir = await mkdtemp(join(tmpdir(), "gh-pages-"));

try {
  await cp(pagesDir, workDir, { recursive: true });
  await writeFile(join(workDir, ".nojekyll"), "");

  execSync("git init", { cwd: workDir, stdio: "inherit" });
  execSync(`git remote add origin ${remote}`, { cwd: workDir, stdio: "inherit" });
  execSync("git checkout -b gh-pages", { cwd: workDir, stdio: "inherit" });
  execSync("git add -A", { cwd: workDir, stdio: "inherit" });
  execSync('git commit -m "deploy"', { cwd: workDir, stdio: "inherit" });
  execSync("git push -f origin gh-pages", { cwd: workDir, stdio: "inherit" });

  console.log("Deployed to gh-pages");
} finally {
  await rm(workDir, { recursive: true, force: true });
}
