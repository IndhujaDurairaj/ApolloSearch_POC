import { test as base, Page } from '@playwright/test';
import { DoctorsPage } from '../src/pages/doctorsPage';
import config from '../src/config/config';

/**
 * Extended test fixture with custom page objects
 */
type TestFixtures = {
  doctorsPage: DoctorsPage;
};

export const test = base.extend<TestFixtures>({
  doctorsPage: async ({ page }, use) => {
    const doctorsPage = new DoctorsPage(page, config.baseUrl);
    await use(doctorsPage);
  },
});

export { expect } from '@playwright/test';
