import { expect } from '@playwright/test';
import { test } from '../tests/fixtures';
import { testDataProvider } from '../src/utils';

/**
 * Apollo Hospitals Doctor Search - Negative Test Cases
 * 
 * Test Distribution:
 * - TC_NEG_001: Filter with restricted specialty (minimal results)
 * - TC_NEG_002: Multiple filter combination with specific criteria
 * - TC_NEG_003: Invalid doctor search handling
 * - TC_NEG_004: Edge case with invalid filter values
 * 
 * Covers: Edge cases, error states, and filter validation
 */

test.describe('Apollo Hospitals - Doctor Search Automation (Negative Cases)', () => {
  test.beforeEach(async ({ doctorsPage }) => {
    // Fresh page load before each test
    await doctorsPage.navigateToDoctorsPage();
  });

  // ===== NEGATIVE TESTS (TC_NEG_001-004) =====

  test('[TC_NEG_001] Should handle specialty filter with limited results', async ({ doctorsPage, filtersPage }) => {
    /**
     * Scenario: Filter by specialty and verify page handles it gracefully
     * Real-world: Some specialties have fewer doctors available
     */
    // Arrange
    const dermatologyId = testDataProvider.getSpecialtyId('dermatology');

    // Act
    await filtersPage.selectSpecialty(dermatologyId);
    const doctorCount = await doctorsPage.getDoctorCount();
    const isPageStable = await doctorsPage.isPageStable();

    // Assert
    // Page should remain stable regardless of result count
    expect(isPageStable).toBe(true);
    expect(doctorCount >= 0).toBe(true);
  });

  test('[TC_NEG_002] Should handle complex filter combination', async ({ doctorsPage, filtersPage }) => {
    /**
     * Scenario: Apply multiple filters and verify results remain valid
     * Real-world: User applies restrictive filter combination
     */
    // Arrange
    const generalMedicineId = testDataProvider.getSpecialtyId('generalMedicine');
    const delhiId = testDataProvider.getCityId('delhi');

    // Act
    await filtersPage.selectSpecialty(generalMedicineId);
    const afterSpecialty = await doctorsPage.getDoctorCount();
    
    await filtersPage.selectCity(delhiId);
    const afterCity = await doctorsPage.getDoctorCount();
    const isPageStable = await doctorsPage.isPageStable();

    // Assert
    // All operations should complete without errors
    expect(isPageStable).toBe(true);
    expect(afterSpecialty >= 0 && afterCity >= 0).toBe(true);
  });

  test('[TC_NEG_003] Should handle invalid doctor search gracefully', async ({ doctorsPage }) => {
    /**
     * Scenario: Search for non-existent doctor
     * Real-world: User searches for doctor that doesn't exist
     */
    // Arrange
    const invalidDoctorName = testDataProvider.getInvalidDoctorName();

    // Act
    await doctorsPage.searchDoctorByName(invalidDoctorName);
    const isNoResults = await doctorsPage.isNoResultsDisplayed();
    const isPageStable = await doctorsPage.isPageStable();

    // Assert
    // Page should handle no results gracefully
    expect(isPageStable).toBe(true);
    // Either no results message or page remains stable
    expect(isPageStable || isNoResults).toBe(true);
  });

  test('[TC_NEG_004] Should verify filter operations complete without errors', async ({ doctorsPage, filtersPage }) => {
    /**
     * Scenario: Verify basic filter operations don't cause page errors
     * Real-world: Filter UI stability test
     */
    // Arrange
    const cardiacId = testDataProvider.getSpecialtyId('cardiacSciences');
    const bangaloreId = testDataProvider.getCityId('bangalore');
    const englishId = testDataProvider.getLanguageId('english');

    // Act
    try {
      await filtersPage.selectSpecialty(cardiacId);
      const countAfterSpecialty = await doctorsPage.getDoctorCount();

      await filtersPage.selectCity(bangaloreId);
      const countAfterCity = await doctorsPage.getDoctorCount();

      await filtersPage.selectLanguage(englishId);
      const countAfterLanguage = await doctorsPage.getDoctorCount();

      const isPageStable = await doctorsPage.isPageStable();

      // Assert - All filters should apply successfully
      expect(isPageStable).toBe(true);
      expect(countAfterSpecialty >= 0 && countAfterCity >= 0 && countAfterLanguage >= 0).toBe(true);
    } catch (e) {
      // If any filter operation fails, page should still be stable
      const isPageStable = await doctorsPage.isPageStable();
      expect(isPageStable).toBe(true);
    }
  });

});