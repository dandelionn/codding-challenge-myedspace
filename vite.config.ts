/// <reference types="vitest/config" />
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["lcov", "html", "text"],
      reportsDirectory: "test-report/coverage",
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["**/index.tsx"],
    },
    reporters: ["default", "junit"],
    outputFile: {
      junit: "test-report/results/report.xml",
    },
  },
});
