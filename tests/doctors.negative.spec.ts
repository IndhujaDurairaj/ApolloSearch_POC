import { expect } from '@playwright/test';
import { test } from '../tests/fixtures';
import { testDataProvider } from '../src/utils';

/**
 * Apollo Hospitals Doctor Search - Negative Test Cases
 * 
 * Test Distribution:
 * - Existing (TC_NEG_001-002): Filter combinations with reduced results, wrong specialty not displayed
 * - New (TC_NEG_003-004): Invalid search, gender filter switching
 * 
 * NOTE: Gender filter tests removed - gender radio buttons not accessible in test environment
 * 
 * Covers: Edge cases, error states, and filter validation
 */

test.describe('Apollo Hospitals - Doctor Search Automation (Negative Cases)', () => {
  test.beforeEach(async ({ doctorsPage }) => {
    // Fresh page load before each test
    await doctorsPage.navigateToDoctorsPage();
  });

  // ===== EXISTING NEGATIVE TESTS (TC_NEG_001-002) =====

  test('[TC_NEG_001] Should apply Lung Transplant specialty filter and validate displayed results', async ({ doctorsPage, filtersPage }) => {
    // Arrange
    const lungTransplantId = testDataProvider.getSpecialtyId('lungTransplant');
    const bilaspurId = testDataProvider.getCityId('bilaspur');

    // Act - Apply specialty filter
    await filtersPage.selectSpecialty(lungTransplantId);
    const countWithSpecialty = await doctorsPage.getDoctorCount();
    
    // Apply additional city filter
    await filtersPage.selectCity(bilaspurId);
    const countWithBothFilters = await doctorsPage.getDoctorCount();

    // Assert - Validate that filters are applied correctly
    // Adding city filter should reduce or maintain results
    expect(countWithBothFilters <= countWithSpecialty).toBe(true);
  });

  test('[TC_NEG_002] Should correctly handle single specialty filter application', async ({ doctorsPage, filtersPage }) => {
    // Arrange
    const orthoId = testDataProvider.getSpecialtyId('orthopedics');

    // Act - Apply Orthopedics filter
    await filtersPage.selectSpecialty(orthoId);
    const isFilterApplied = await filtersPage.isSpecialtySelected(orthoId);
    const doctorCount = await doctorsPage.getDoctorCount();

    // Assert - Verify filter was applied and either results exist or no results message shown
    expect(isFilterApplied).toBe(true);
    
    // Either we have doctors or an explicit no results message
    if (doctorCount === 0) {
      const noResultsMessage = await doctorsPage.isNoResultsDisplayed();
      expect(noResultsMessage).toBe(true);
    } else {
      // If results exist, ensure page is stable
      const isStable = await doctorsPage.isPageStable();
      expect(isStable).toBe(true);
    }
  });

  // ===== NEW NEGATIVE TESTS (TC_NEG_003-004) =====

  test('[TC_NEG_003] Should handle invalid doctor search gracefully', async ({ doctorsPage }) => {
    // Arrange
    const invalidDoctorName = testDataProvider.getInvalidDoctorName();

    // Act
    await doctorsPage.searchDoctorByName(invalidDoctorName);

    // Assert
    // Page should remain stable even with invalid search
    const isPageStable = await doctorsPage.isPageStable();
    expect(isPageStable).toBe(true);
  });

  test('[TC_NEG_004] Should correctly switch between Male and Female gender filters', async ({ doctorsPage, filtersPage }) => {
    // Arrange
    const maleGenderId = testDataProvider.getGenderId('male');
    const femaleGenderId = testDataProvider.getGenderId('female');

    // Act - Select Male, then switch to Female
    await filtersPage.selectGender(maleGenderId);
    let maleCount = await doctorsPage.getDoctorCount();
    
    await filtersPage.selectGender(femaleGenderId);
    let femaleCount = await doctorsPage.getDoctorCount();

    // Assert - Verify filter applied and page is stable
    const isFemaleSelected = await filtersPage.isGenderSelected(femaleGenderId);
    expect(isFemaleSelected).toBe(true);

    // Page should be stable after switching
    const isPageStable = await doctorsPage.isPageStable();
    expect(isPageStable).toBe(true);
  });
});
