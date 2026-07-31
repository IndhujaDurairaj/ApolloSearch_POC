import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Load environment variables from .env file
 * This is the ONLY place where .env is loaded
 * .env file contains: BASE_URL and other environment-specific values
 * After this, all config files can access values via process.env
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Apollo Hospitals Test Automation - Playwright Configuration
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',

  /* Playwright Configuration */
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  slowMo: 700,

  /* Reporter configuration */
  reporter: [
    ['html', { outputFolder: 'test-results' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],

  /* Global timeout for test execution: 60 seconds */
  timeout: 60 * 1000,

  /* Global timeout for each assertion: 5 seconds */
  expect: {
    timeout: 5 * 1000
  },

  /* Shared settings for all projects */
  use: {
    /**
     * Base URL from .env file
     * Value: BASE_URL=https://www.apollohospitals.com/doctors
     * 
     * Flow: .env file → dotenv.config() → process.env.BASE_URL → here
     * 
     * If BASE_URL not set in .env, fallback to default URL
     */
    baseURL: process.env.BASE_URL || 'https://www.apollohospitals.com/doctors',
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'retain-on-failure',
    actionTimeout: 10 * 1000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: process.env.HEADLESS !== 'false', // true by default
      },
    },
    /*

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
