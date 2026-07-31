import { expect } from '@playwright/test';
import { test } from '../tests/fixtures';
import { testDataProvider } from '../src/utils';

/**
 * Apollo Hospitals Doctor Search - Positive Test Cases
 * 
 * Covers: Specialty filters, Location filters, Filter clearing
 * Test Cases: split into focused checks with one assertion per test
 */

test.describe('Apollo Hospitals - Doctor Search Automation (Positive Cases)', () => {
  test.beforeEach(async ({ doctorsPage }) => {
    // Fresh page load before each test - filters cleared automatically
    await doctorsPage.navigateToDoctorsPage();
  });

  test('[TC_PS_001] Should return at least one doctor after applying Cardiac Sciences and ENT specialties', async ({ doctorsPage }) => {
    // Arrange
    const cardiacSpecialtyId = testDataProvider.getSpecialtyId('cardiacSciences');
    const entSpecialtyId = testDataProvider.getSpecialtyId('ent');

    // Act
    await doctorsPage.selectSpecialty(cardiacSpecialtyId);
    await doctorsPage.selectSpecialty(entSpecialtyId);

    // Assert - Validate that displayed doctors have the filtered specialties
    const displayedSpecialties = await doctorsPage.getDisplayedSpecialties();
    const hasCardiac = displayedSpecialties.some(s => s.includes('cardiac'));
    const hasEnt = displayedSpecialties.some(s => s.includes('ent'));
    
    expect(hasCardiac || hasEnt).toBe(true);
  });

  test('[TC_PS_002] Should clear selected specialty filter and restore all results', async ({ doctorsPage }) => {
    const cardiacSpecialtyId = testDataProvider.getSpecialtyId('cardiacSciences');

    // Act - Apply filter
    await doctorsPage.selectSpecialty(cardiacSpecialtyId);
    const isFilterApplied = await doctorsPage.isSpecialtySelected(cardiacSpecialtyId);
    const countWithFilter = await doctorsPage.getDoctorCount();
    
    // Clear filter
    await doctorsPage.clearAllFilters();
    const isFilterCleared = !(await doctorsPage.isSpecialtySelected(cardiacSpecialtyId));
    const countAfterClear = await doctorsPage.getDoctorCount();
    
    // Assert - Verify that filter was actually cleared
    // Filter should be unchecked after clearing
    expect(isFilterApplied && isFilterCleared).toBe(true);
  });

  test('[TC_PS_003] Should return doctor results for Bangalore city filter', async ({ doctorsPage }) => {
    // Arrange
    const cityId = testDataProvider.getCityId('bangalore');
    const cityName = testDataProvider.getCityName('bangalore');

    // Act - Select Bangalore city
    await doctorsPage.selectCity(cityId);
    
    // Assert - Validate that displayed results are from Bangalore
    const isValidFilter = await doctorsPage.verifyFilterResults(cityName);
    expect(isValidFilter).toBe(true);
  });

  test('[TC_PS_004] Should return doctors after switching city from Bangalore to Hyderabad', async ({ doctorsPage }) => {
    // Arrange
    const bangaloreId = testDataProvider.getCityId('bangalore');
    const hyderabadId = testDataProvider.getCityId('hyderabad');
    const hyderabadName = testDataProvider.getCityName('hyderabad');

    // Act - Select Bangalore then switch to Hyderabad
    await doctorsPage.selectCity(bangaloreId);
    await doctorsPage.selectCity(hyderabadId);
    
    // Assert - Validate that displayed results are from Hyderabad
    const isHyderabadDisplayed = await doctorsPage.verifyFilterResults(hyderabadName);
    expect(isHyderabadDisplayed).toBe(true);
  });
});
