import { test as base, Page, expect } from '@playwright/test';
import { DoctorsPage, DoctorsFiltersPage } from '../src/pages';
import config from '../src/config/config';

/**
 * Extended test fixture with custom page objects and lifecycle callbacks
 * Provides:
 * - DoctorsPage (results/navigation)
 * - DoctorsFiltersPage (filters)
 * - Automatic logging and reporting
 * - Error handling callbacks
 * - Performance monitoring
 */
type TestFixtures = {
  doctorsPage: DoctorsPage;
  filtersPage: DoctorsFiltersPage;
};

export const test = base.extend<TestFixtures>({
  doctorsPage: async ({ page }, use) => {
    const doctorsPage = new DoctorsPage(page, config.baseUrl);
    await use(doctorsPage);
  },
  
  filtersPage: async ({ page }, use) => {
    const filtersPage = new DoctorsFiltersPage(page, config.baseUrl);
    await use(filtersPage);
  },
});

/**
 * Global test setup - runs before all tests
 */
test.beforeAll(async () => {
  console.log('\n📋 Test Suite Started');
  console.log(`🌐 Base URL: ${config.baseUrl}`);
  console.log(`🔧 Browser: ${process.env.BROWSER || 'chromium'}`);
});

/**
 * Global test teardown - runs after all tests
 */
test.afterAll(async () => {
  console.log('\n✅ Test Suite Completed');
});

/**
 * Before each test - setup and logging
 */
test.beforeEach(async ({ page }) => {
  const startTime = Date.now();
  
  // Listen for console messages (callback for logging)
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log(`  ⚠️  Console Error: ${msg.text()}`);
    } else if (msg.type() === 'warning') {
      console.log(`  ⚠️  Console Warning: ${msg.text()}`);
    }
  });
  
  // Listen for dialog events
  page.on('dialog', async (dialog) => {
    console.log(`  💬 Dialog: ${dialog.message()}`);
    await dialog.dismiss();
  });
  
  // Listen for page crashes
  page.on('pageerror', (error: Error) => {
    console.log(`  ❌ Page Error: ${error.message}`);
  });
  
  // Attach timing info to page context for afterEach to access
  (page as any).__testStartTime = startTime;
});

/**
 * After each test - cleanup and result reporting
 */
test.afterEach(async ({ page }) => {
  const startTime = (page as any).__testStartTime || Date.now();
  const duration = Date.now() - startTime;
  console.log(`⏱️  Duration: ${(duration / 1000).toFixed(2)}s`);
});

export { expect } from '@playwright/test';
