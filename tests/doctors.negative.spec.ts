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

  test('[TC_PS_NEG_002] Should validate Orthopedics filter displays correct specialty in results', async ({ doctorsPage }) => {
    // Arrange
    const orthoId = testDataProvider.getSpecialtyId('orthopedics');
    const orthoName = testDataProvider.getSpecialtyName('orthopedics');
    const bilaspurId = testDataProvider.getCityId('bilaspur');

    // Act - Apply Orthopedics filter
    await doctorsPage.selectSpecialty(orthoId);
    
    // Assert - Verify that displayed doctors have Orthopedics specialty
    // Either showing results with specialty OR showing no-results message
    const isValidResult = await doctorsPage.verifyFilterResults(orthoName);
    expect(isValidResult).toBe(true);
  });
});
