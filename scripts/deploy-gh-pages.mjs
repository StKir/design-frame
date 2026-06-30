import { execSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { join } from "node:path";

import ghpages from 'gh-pages';

const root = process.cwd();
const pagesDir = join(root, "build/pages");
const remote = execSync("git remote get-url origin", { cwd: root, encoding: "utf8" }).trim();

execSync("npm run build:pages", { stdio: "inherit", cwd: root });

await writeFile(join(pagesDir, ".nojekyll"), "");

await new Promise((resolve, reject) => {
  ghpages.publish(
    pagesDir,
    {
      branch: "gh-pages",
      repo: remote,
      dotfiles: true,
      history: false,
      message: "deploy",
    },
    (error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    },
  );
});

console.log("Deployed to gh-pages");
