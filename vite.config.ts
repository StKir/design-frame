import path from "node:path";
import { fileURLToPath } from "node:url";

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const appDir = path.dirname(fileURLToPath(import.meta.url));
const appPath = path.resolve(appDir, "app");
const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  base: isGitHubPages ? "/design-frame/" : "/",
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve: {
    alias: [
      { find: /^~\/(.*)/, replacement: `${appPath}/$1` },
      { find: /^~$/, replacement: appPath },
    ],
  },
});
