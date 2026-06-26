/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
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
