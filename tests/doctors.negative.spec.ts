import { expect } from '@playwright/test';
import { test } from '../tests/fixtures';
import { testDataProvider } from '../src/utils';

/**
 * Apollo Hospitals Doctor Search - Negative Test Cases
 * 
 * Covers: Filter behavior validation and edge cases
 * Test Cases: split into focused checks with one assertion per test
 */

test.describe('Apollo Hospitals - Doctor Search Automation (Negative Cases)', () => {
  test.beforeEach(async ({ doctorsPage }) => {
    // Fresh page load before each test
    await doctorsPage.navigateToDoctorsPage();
  });

  test('[TC_PS_NEG_001] Should apply Lung Transplant specialty filter and validate displayed results', async ({ doctorsPage }) => {
    // Arrange
    const lungTransplantId = testDataProvider.getSpecialtyId('lungTransplant');
    const bilaspurId = testDataProvider.getCityId('bilaspur');

    // Act - Apply specialty filter
    await doctorsPage.selectSpecialty(lungTransplantId);
    const countWithSpecialty = await doctorsPage.getDoctorCount();
    
    // Apply additional city filter
    await doctorsPage.selectCity(bilaspurId);
    const countWithBothFilters = await doctorsPage.getDoctorCount();

    // Assert - Validate that filters are applied correctly
    // Adding city filter should reduce or maintain results
    expect(countWithBothFilters <= countWithSpecialty).toBe(true);
  });

  test('[TC_PS_NEG_002] Should NOT display doctors from wrong specialty when Orthopedics filter is applied', async ({ doctorsPage }) => {
    // Arrange
    const orthoId = testDataProvider.getSpecialtyId('orthopedics');
    const wrongSpecialtyName = testDataProvider.getSpecialtyName('cardiacSciences');

    // Act - Apply Orthopedics filter
    await doctorsPage.selectSpecialty(orthoId);
    
    // Assert - Verify that doctors with WRONG specialty (Cardiac Sciences) are NOT displayed
    // This is a negative assertion: if Orthopedics is selected, Cardiac doctors should not appear
    const hasWrongSpecialty = await doctorsPage.verifyFilterResults(wrongSpecialtyName);
    expect(hasWrongSpecialty).toBe(false);
  });
});
