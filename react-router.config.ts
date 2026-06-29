import { copyFile } from "node:fs/promises";
import { join } from "node:path";

import type { Config } from "@react-router/dev/config";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const frameIds = [
  "cantata-app",
  "forma-app",
  "coach-app",
  "pay-app",
  "vault-app",
];

export default {
  ssr: false,
  basename: isGitHubPages ? "/design-frame/" : "/",
  prerender: ["/", ...frameIds.map((id) => `/frames/${id}`)],
  future: {
    v8_middleware: true,
    v8_passThroughRequests: true,
    v8_splitRouteModules: true,
    v8_trailingSlashAwareDataRequests: true,
    v8_viteEnvironmentApi: true,
  },
  async buildEnd({ viteConfig }) {
    if (!viteConfig.isProduction || !isGitHubPages) return;

    const outDir = join(viteConfig.root, "build/client/design-frame");
    await copyFile(join(outDir, "index.html"), join(outDir, "404.html"));
  },
} satisfies Config;
