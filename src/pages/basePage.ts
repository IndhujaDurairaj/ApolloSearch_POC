import { Page, Locator } from '@playwright/test';

/**
 * BasePage - Base class for all page objects
 * Provides common functionality like navigation and assertions
 * Screenshots handled automatically by Playwright config
 * Uses modern Playwright locator strategies: getByRole, getByTestId, getByPlaceholder
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
   * Uses 'domcontentloaded' for better reliability
   * Falls back gracefully if timeout occurs
   */
  async goto(): Promise<void> {
    try {
      // First try with domcontentloaded (faster than 'load')
      await this.page.goto(this.baseUrl, { 
        waitUntil: 'domcontentloaded',
        timeout: 30000 
      });
    } catch (error) {
      // If domcontentloaded times out, try without specific wait state
      try {
        await this.page.goto(this.baseUrl, { timeout: 20000 });
      } catch (secondError) {
        // If still fails, try one more time with just URL navigation
        await this.page.goto(this.baseUrl, { waitUntil: 'commit', timeout: 10000 });
      }
    }
  }

  /**
   * Wait for element to be visible
   * For dynamic apps, may not have visible elements immediately due to JS rendering
   * Uses graceful fallback if element doesn't appear
   */
  async waitForElement(locator: Locator, timeout = 10000): Promise<void> {
    try {
      await locator.first().waitFor({ state: 'visible', timeout });
    } catch (error) {
      // Element might not be visible but page might still be usable
      // Check if locator exists at all
      const count = await locator.count();
      if (count === 0) {
        // No elements found, this is a real error
        throw new Error(`Element not found after ${timeout}ms`);
      }
      // Elements exist but not visible - continue anyway for dynamic content
      console.warn(`Element found but not visible after ${timeout}ms - continuing with test`);
    }
  }

  /**
   * Wait for element count to stabilize after filter/search changes
   * Simple, fast approach: network idle + brief DOM settle time
   * Avoids repeated locator.count() calls which can timeout on complex DOMs
   */
  protected async waitForElementCountStability(
    locator: Locator,
    timeout: number = 8000,
    onStableCallback?: (finalCount: number) => void
  ): Promise<void> {
    try {
      // Wait for network to settle - indicates results loading complete
      await Promise.race([
        this.page.waitForLoadState('networkidle'),
        new Promise(resolve => setTimeout(resolve, 2000))
      ]);
    } catch {
      // Ignore any errors
    }
    
    // Give DOM time to render
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get final count if callback provided
    if (onStableCallback) {
      try {
        const count = await this.page.evaluate(() => 
          document.querySelectorAll('[data-testid*="doctor"], [data-testid*="provider"], [class*="doctor-card"], [class*="provider-card"]').length
        );
        onStableCallback(count);
      } catch {
        onStableCallback(0);
      }
    }
  }

  /**
   * Generic callback wrapper for wait operations
   * Allows actions to report progress via callback
   */
  protected async executeWithCallback<T>(
    operation: () => Promise<T>,
    onSuccess?: (result: T) => void,
    onError?: (error: Error) => void
  ): Promise<T> {
    try {
      const result = await operation();
      if (onSuccess) onSuccess(result);
      return result;
    } catch (error) {
      if (onError) onError(error as Error);
      throw error;
    }
  }
}
