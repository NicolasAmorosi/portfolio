import { defineConfig } from "@playwright/test";

// End-to-end checks that only a real browser can make (scroll, navigation).
// Runs against the production build on a spare port, with the installed Chrome.
export default defineConfig({
  testDir: "e2e",
  testMatch: "*.e2e.ts",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: "http://localhost:3200", channel: "chrome" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { viewport: { width: 375, height: 812 } } },
  ],
  webServer: {
    command: "pnpm build && pnpm start -p 3200",
    url: "http://localhost:3200",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
