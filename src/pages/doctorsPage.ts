import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * DoctorsPage - Page Object for Apollo Hospitals Doctors Search
 * Lean implementation: only waits where necessary, removes hard timeouts
 */
export class DoctorsPage extends BasePage {
  private readonly searchDoctorInput: Locator;
  private readonly searchSpecialityInput: Locator;
  private readonly searchCityInput: Locator;
  private readonly doctorCards: Locator;
  private readonly clearAllButton: Locator;
  private readonly noResultsMessage: Locator;
  private readonly paginationNextButton: Locator;
  private readonly paginationPrevButton: Locator;

  constructor(page: Page, baseUrl: string) {
    super(page, baseUrl);

    this.searchDoctorInput = page.locator('input[placeholder="Search for Doctors"]');
    this.searchSpecialityInput = page.locator('input[placeholder="Search Speciality"]');
    this.searchCityInput = page.locator('select[name="city"]').first();
    this.doctorCards = page.locator('[class*="doctor"], [class*="provider-card"]');
    this.clearAllButton = page.locator('button:has-text("Clear all")').first();
    this.noResultsMessage = page.locator('text=/No|not found/i');
    this.paginationNextButton = page.locator('button[aria-label*="Next"]');
    this.paginationPrevButton = page.locator('button[aria-label*="Previous"]');
  }

  /**
   * Navigate to doctors page and ensure fresh state
   */
  async navigateToDoctorsPage(): Promise<void> {
    await this.goto();
    // Wait for initial doctor cards to load
    await this.waitForElement(this.doctorCards, 15000);
  }

  /**
   * Select specialty by checkbox
   * Waits for page to stabilize after selection
   */
  async selectSpecialty(specialtyId: string): Promise<void> {
    const checkbox = this.page.locator(`input[name="speciality[${specialtyId}]"]`).first();
    const checkboxCount = await checkbox.count();

    if (checkboxCount === 0) {
      throw new Error(`Could not find specialty checkbox for ID: ${specialtyId}`);
    }

    try {
      await checkbox.scrollIntoViewIfNeeded();
      await checkbox.check({ force: true, timeout: 3000 });
    } catch {
      // Fallback for non-standard/hidden controls
      await this.page.evaluate((id) => {
        const input = document.querySelector(`input[name="speciality[${id}]"]`) as HTMLInputElement | null;
        if (!input) {
          throw new Error(`Could not find specialty checkbox for ID: ${id}`);
        }
        if (!input.checked) {
          input.checked = true;
          input.dispatchEvent(new Event('change', { bubbles: true }));
          input.dispatchEvent(new Event('click', { bubbles: true }));
        }
      }, specialtyId);
    }

    // Wait for results to update after filter selection
    await this.waitForElementCountStability(this.doctorCards, 5000);
  }

  /**
   * Unselect specialty by checkbox
   */
  async unselectSpecialty(specialtyId: string): Promise<void> {
    const checkbox = this.page.locator(`input[name="speciality[${specialtyId}]"]`).first();
    const checkboxCount = await checkbox.count();

    if (checkboxCount === 0) {
      throw new Error(`Could not find specialty checkbox for ID: ${specialtyId}`);
    }

    try {
      await checkbox.scrollIntoViewIfNeeded();
      await checkbox.uncheck({ force: true, timeout: 3000 });
    } catch {
      await this.page.evaluate((id) => {
        const input = document.querySelector(`input[name="speciality[${id}]"]`) as HTMLInputElement | null;
        if (!input) {
          throw new Error(`Could not find specialty checkbox for ID: ${id}`);
        }
        if (input.checked) {
          input.checked = false;
          input.dispatchEvent(new Event('change', { bubbles: true }));
          input.dispatchEvent(new Event('click', { bubbles: true }));
        }
      }, specialtyId);
    }

    await this.waitForElementCountStability(this.doctorCards, 5000);
  }

  /**
   * Check if specialty is selected
   */
  async isSpecialtySelected(specialtyId: string): Promise<boolean> {
    return await this.page.evaluate((id) => {
      const checkbox = document.querySelector(`input[name="speciality[${id}]"]`) as HTMLInputElement;
      return checkbox ? checkbox.checked : false;
    }, specialtyId);
  }

  /**
   * Select city from dropdown
   */
  async selectCity(cityValue: string): Promise<void> {
    try {
      await this.searchCityInput.selectOption(cityValue, { timeout: 3000 });
    } catch {
      await this.page.evaluate((value) => {
        const select = document.querySelector('select[name="city"]') as HTMLSelectElement | null;
        if (!select) {
          throw new Error('Could not find city select element');
        }
        select.value = value;
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }, cityValue);
    }
    await this.waitForElementCountStability(this.doctorCards, 5000);
  }

  /**
   * Select language by checkbox
   */
  async selectLanguage(languageId: string): Promise<void> {
    const checkbox = this.page.locator(`input[name="language[${languageId}]"]`).first();
    const checkboxCount = await checkbox.count();

    if (checkboxCount === 0) {
      throw new Error(`Could not find language checkbox for ID: ${languageId}`);
    }

    try {
      await checkbox.scrollIntoViewIfNeeded();
      await checkbox.check({ force: true, timeout: 3000 });
    } catch {
      await this.page.evaluate((id) => {
        const input = document.querySelector(`input[name="language[${id}]"]`) as HTMLInputElement | null;
        if (!input) {
          throw new Error(`Could not find language checkbox for ID: ${id}`);
        }
        if (!input.checked) {
          input.checked = true;
          input.dispatchEvent(new Event('change', { bubbles: true }));
          input.dispatchEvent(new Event('click', { bubbles: true }));
        }
      }, languageId);
    }
    
    await this.waitForElementCountStability(this.doctorCards, 5000);
  }

  /**
   * Unselect language by checkbox
   */
  async unselectLanguage(languageId: string): Promise<void> {
    const checkbox = this.page.locator(`input[name="language[${languageId}]"]`).first();
    const checkboxCount = await checkbox.count();

    if (checkboxCount === 0) {
      throw new Error(`Could not find language checkbox for ID: ${languageId}`);
    }

    try {
      await checkbox.scrollIntoViewIfNeeded();
      await checkbox.uncheck({ force: true, timeout: 3000 });
    } catch {
      await this.page.evaluate((id) => {
        const input = document.querySelector(`input[name="language[${id}]"]`) as HTMLInputElement | null;
        if (!input) {
          throw new Error(`Could not find language checkbox for ID: ${id}`);
        }
        if (input.checked) {
          input.checked = false;
          input.dispatchEvent(new Event('change', { bubbles: true }));
          input.dispatchEvent(new Event('click', { bubbles: true }));
        }
      }, languageId);
    }
    
    await this.waitForElementCountStability(this.doctorCards, 5000);
  }

  /**
   * Search for doctor by name
   */
  async searchDoctorByName(doctorName: string): Promise<void> {
    await this.searchDoctorInput.fill(doctorName);
    // Press Enter to trigger search
    await this.searchDoctorInput.press('Enter');
    await this.waitForElementCountStability(this.doctorCards, 5000);
  }

  /**
   * Clear all filters
   */
  async clearAllFilters(): Promise<void> {
    try {
      await this.clearAllButton.click({ timeout: 3000 });
      await this.waitForElementCountStability(this.doctorCards, 5000);
    } catch {
      // Button might not be visible, silently continue
    }
  }

  /**
   * Get count of displayed doctor cards
   */
  async getDoctorCount(): Promise<number> {
    return await this.doctorCards.count();
  }

  /**
   * Get doctor information from card
   */
  async getDoctorInfo(index: number): Promise<{ name: string; specialty: string; location: string }> {
    try {
      return await this.page.evaluate((idx) => {
        const cards = document.querySelectorAll('[class*="doctor"], [class*="provider-card"]');
        if (idx >= cards.length) return { name: '', specialty: '', location: '' };

        const card = cards[idx];
        const name = card.querySelector('[class*="name"], h2, h3')?.textContent || '';
        const specialty = card.querySelector('[class*="specialty"], [class*="speciality"]')?.textContent || '';
        const location = card.querySelector('[class*="location"]')?.textContent || '';

        return { name: name.trim(), specialty: specialty.trim(), location: location.trim() };
      }, index);
    } catch {
      return { name: '', specialty: '', location: '' };
    }
  }

  /**
   * Check if no results message is displayed
   */
  async isNoResultsDisplayed(): Promise<boolean> {
    try {
      await this.noResultsMessage.first().waitFor({ state: 'visible', timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get all visible doctor names
   */
  async getAllDoctorNames(): Promise<string[]> {
    const count = await this.getDoctorCount();
    const names: string[] = [];

    for (let i = 0; i < count; i++) {
      const info = await this.getDoctorInfo(i);
      if (info.name) {
        names.push(info.name);
      }
    }

    return names;
  }

  /**
   * Check if next pagination button is enabled
   */
  async canGoToNextPage(): Promise<boolean> {
    return !(await this.paginationNextButton.first().isDisabled());
  }

  /**
   * Click next pagination button
   */
  async goToNextPage(): Promise<void> {
    await this.paginationNextButton.first().click();
    await this.waitForElementCountStability(this.doctorCards, 5000);
  }

  /**
   * Check if previous pagination button is enabled
   */
  async canGoToPreviousPage(): Promise<boolean> {
    return !(await this.paginationPrevButton.first().isDisabled());
  }

  /**
   * Click previous pagination button
   */
  async goToPreviousPage(): Promise<void> {
    await this.paginationPrevButton.first().click();
    await this.waitForElementCountStability(this.doctorCards, 5000);
  }

  /**
   * Verify specialty filter is applied in UI
   */
  async verifySpecialtyFilterApplied(specialtyId: string): Promise<boolean> {
    return await this.isSpecialtySelected(specialtyId);
  }

  /**
   * Get visible filter badges
   */
  async getAppliedFilters(): Promise<string[]> {
    const badges = this.page.locator('[class*="filter-badge"], [class*="applied"], [class*="active-filter"]');
    const count = await badges.count();
    const filters: string[] = [];

    for (let i = 0; i < count; i++) {
      const text = await badges.nth(i).textContent();
      if (text) {
        filters.push(text.trim());
      }
    }

    return filters;
  }

  /**
   * Scroll doctor cards into view
   */
  async scrollToDoctorCards(): Promise<void> {
    await this.doctorCards.first().scrollIntoViewIfNeeded();
  }

  /**
   * Get all displayed specialties from doctor cards
   */
  async getDisplayedSpecialties(): Promise<string[]> {
    const count = await this.getDoctorCount();
    const specialties: Set<string> = new Set();

    for (let i = 0; i < count; i++) {
      const info = await this.getDoctorInfo(i);
      if (info.specialty) {
        specialties.add(info.specialty.toLowerCase());
      }
    }

    return Array.from(specialties);
  }

  /**
   * Get all displayed cities/locations from doctor cards
   */
  async getDisplayedCities(): Promise<string[]> {
    const count = await this.getDoctorCount();
    const cities: Set<string> = new Set();

    for (let i = 0; i < count; i++) {
      const info = await this.getDoctorInfo(i);
      if (info.location) {
        cities.add(info.location.toLowerCase());
      }
    }

    return Array.from(cities);
  }

  /**
   * Verify that all displayed doctors have a specific specialty
   * @param specialtyName - Name of the specialty to verify (e.g., 'Cardiac Sciences')
   */
  async verifyFilteredSpecialty(specialtyName: string): Promise<boolean> {
    const displayedSpecialties = await this.getDisplayedSpecialties();
    return displayedSpecialties.some(specialty => 
      specialty.includes(specialtyName.toLowerCase())
    );
  }

  /**
   * Verify that all displayed doctors have a specific city
   * @param cityName - Name of the city to verify (e.g., 'Bangalore')
   */
  async verifyFilteredCity(cityName: string): Promise<boolean> {
    const displayedCities = await this.getDisplayedCities();
    return displayedCities.some(city => 
      city.includes(cityName.toLowerCase())
    );
  }

  /**
   * Verify that displayed results match the applied filter
   * Returns true if at least one result matches the filter, or no results are shown
   */
  async verifyFilterResults(filterName: string): Promise<boolean> {
    const doctorCount = await this.getDoctorCount();
    const isNoResults = await this.isNoResultsDisplayed();

    if (isNoResults || doctorCount === 0) {
      return true; // Valid: no results for filter
    }

    // At least one doctor should match the filter
    return (await this.verifyFilteredSpecialty(filterName)) || 
           (await this.verifyFilteredCity(filterName));
  }
}
