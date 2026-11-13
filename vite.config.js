import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const root = path.dirname(fileURLToPath(import.meta.url));
const sourceDirectory = path.resolve(root, "src");
const sourceAliases = [
  "assets",
  "common",
  "components",
  "constants",
  "features",
  "hooks",
  "layout",
  "menu-items",
  "pages",
  "routes",
  "sections",
  "store",
  "themes",
  "utils",
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, root, "");
  const apiUrl = env.VITE_API_URL || env.REACT_APP_API_URL;

  if (!apiUrl) {
    throw new Error("Set VITE_API_URL in .env before starting or building the app.");
  }

  return {
    plugins: [react({ include: /\.[jt]sx?$/ })],
    esbuild: {
      loader: "jsx",
      include: /\.js$/,
      exclude: [],
    },
    resolve: {
      alias: sourceAliases.map((name) => ({
        find: new RegExp(`^${name}/`),
        replacement: `${path.join(sourceDirectory, name)}${path.sep}`,
      })),
    },
    define: {
      "import.meta.env.VITE_API_URL": JSON.stringify(apiUrl),
      "import.meta.env.VITE_APP_VERSION": JSON.stringify(
        env.VITE_APP_VERSION || env.REACT_APP_VERSION || "1.1.2"
      ),
    },
    build: {
      outDir: "build",
      sourcemap: false,
      emptyOutDir: true,
    },
    test: {
      environment: "jsdom",
      setupFiles: ["./src/setupTests.js"],
    },
  };
});
