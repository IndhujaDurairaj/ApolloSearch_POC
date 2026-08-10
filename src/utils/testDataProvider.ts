import testData from '../data/testData.json' assert { type: 'json' };

function loadTestData() {
  return testData;
}

/**
 * Test Data Provider - Centralized test data access
 * Real-world best practice: Never access test data directly
 * Always use provider methods for consistency, type safety, and maintainability
 */
class TestDataProvider {
  private static instance: TestDataProvider;
  private testData: any;

  private constructor() {
    this.testData = loadTestData();
  }

  /**
   * Singleton pattern - ensure single instance
   */
  static getInstance(): TestDataProvider {
    if (!TestDataProvider.instance) {
      TestDataProvider.instance = new TestDataProvider();
    }
    return TestDataProvider.instance;
  }

  // ==================== SPECIALTY METHODS ====================

  /**
   * Get specialty ID by key
   * @param key - specialty key (e.g., 'cardiacSciences')
   */
  getSpecialtyId(key: string): string {
    const specialty = this.testData.specialties[key];
    if (!specialty?.id) {
      throw new Error(`Specialty not found: ${key}`);
    }
    return specialty.id;
  }

  // ==================== CITY METHODS ====================

  /**
   * Get city ID by key
   */
  getCityId(key: string): string {
    const city = this.testData.cities[key];
    if (!city?.id) {
      throw new Error(`City not found: ${key}`);
    }
    return city.id;
  }

  /**
   * Get city name
   */
  getCityName(key: string): string {
    return this.testData.cities[key]?.displayName || '';
  }

  // ==================== DOCTOR DATA METHODS ====================

  /**
   * Get valid doctor name
   */
  getValidDoctorName(): string {
    return this.testData.doctors?.validDoctor || 'Dr P L Dhingra';
  }

  /**
   * Get doctor test data
   */
  getInvalidDoctorName(): string {
    return this.testData.doctors?.invalidDoctor || 'NonExistentDoctor12345';
  }

  // ==================== LANGUAGE METHODS ====================

  /**
   * Get language ID by key
   */
  getLanguageId(key: string): string {
    const language = this.testData.languages[key];
    if (!language?.id) {
      throw new Error(`Language not found: ${key}`);
    }
    return language.id;
  }

  // ==================== GENDER METHODS ====================

  /**
   * Get gender ID by key
   */
  getGenderId(key: string): string {
    const gender = this.testData.genders?.[key];
    if (!gender?.id) {
      throw new Error(`Gender not found: ${key}`);
    }
    return gender.id;
  }
}

export default TestDataProvider.getInstance();
