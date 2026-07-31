import { Page, Locator } from '@playwright/test';

/**
 * BasePage - Base class for all page objects
 * Provides common functionality like navigation and assertions
 * Screenshots handled automatically by Playwright config
 */
export class BasePage {
  protected page: Page;
  protected readonly baseUrl: string;

  constructor(page: Page, baseUrl: string) {
    this.page = page;
    this.baseUrl = baseUrl;
  }

  /**
   * Navigate to the page with optimal wait strategy
   */
  async goto(): Promise<void> {
    await this.page.goto(this.baseUrl, { waitUntil: 'load' });
  }

  /**
   * Wait for element to be visible
   * Playwright automatically handles visibility via waitFor
   */
  async waitForElement(locator: Locator, timeout = 10000): Promise<void> {
    await locator.first().waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element count to stabilize (more reliable than hard timeouts)
   * Used after filter changes to ensure results have loaded
   */
  protected async waitForElementCountStability(
    locator: Locator,
    timeout: number = 8000
  ): Promise<void> {
    const startTime = Date.now();
    let lastCount = -1;
    let stableChecks = 0;

    while (Date.now() - startTime < timeout) {
      const currentCount = await locator.count();

      if (currentCount === lastCount) {
        stableChecks++;
        if (stableChecks >= 2) return; // Stable for 2 consecutive checks
      } else {
        stableChecks = 0;
        lastCount = currentCount;
      }

      await this.page.waitForTimeout(200); // Poll less frequently
    }
  }
}
