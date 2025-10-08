import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30000,
  retries: 1,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  workers: 1, // run serially to observe actions
  reporter: 'html',
  globalSetup: './e2e/auth.setup.ts',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    storageState: '.auth/user.json',
    launchOptions: { slowMo: 200 }, // slow down actions slightly
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    cwd: './',
  },
})
