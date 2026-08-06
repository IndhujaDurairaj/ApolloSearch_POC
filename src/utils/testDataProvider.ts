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

  /**
   * Get specialty name
   */
  getSpecialtyName(key: string): string {
    return this.testData.specialties[key]?.displayName || '';
  }

  /**
   * Get complete specialty object
   */
  getSpecialty(key: string) {
    const specialty = this.testData.specialties[key];
    if (!specialty) {
      throw new Error(`Specialty not found: ${key}`);
    }
    return specialty;
  }

  /**
   * Get all specialty IDs
   */
  getAllSpecialtyIds(): string[] {
    return Object.values(this.testData.specialties).map((s: any) => s.id);
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

  /**
   * Get complete city object
   */
  getCity(key: string) {
    const city = this.testData.cities[key];
    if (!city) {
      throw new Error(`City not found: ${key}`);
    }
    return city;
  }

  /**
   * Get all city IDs
   */
  getAllCityIds(): string[] {
    return Object.values(this.testData.cities).map((c: any) => c.id);
  }

  // ==================== DOCTOR DATA METHODS ====================

  /**
   * Get doctor test data
   */
  getInvalidDoctorName(): string {
    return this.testData.doctors?.invalidDoctor || 'NonExistentDoctor12345';
  }

  /**
   * Get valid doctor name for search
   */
  getValidDoctorName(): string {
    return this.testData.doctors?.validDoctor || '';
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

  /**
   * Get language name
   */
  getLanguageName(key: string): string {
    return this.testData.languages[key]?.displayName || '';
  }

  /**
   * Get all language IDs
   */
  getAllLanguageIds(): string[] {
    return Object.values(this.testData.languages).map((l: any) => l.id);
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

  /**
   * Get gender name
   */
  getGenderName(key: string): string {
    return this.testData.genders?.[key]?.displayName || '';
  }

  /**
   * Get complete gender object
   */
  getGender(key: string) {
    const gender = this.testData.genders?.[key];
    if (!gender) {
      throw new Error(`Gender not found: ${key}`);
    }
    return gender;
  }

  /**
   * Get all gender IDs
   */
  getAllGenderIds(): string[] {
    return Object.values(this.testData.genders || {}).map((g: any) => g.id);
  }

  /**
   * Validate if gender exists
   */
  genderExists(key: string): boolean {
    return key in (this.testData.genders || {});
  }

  // ==================== BULK RETRIEVAL ====================

  /**
   * Get multiple specialties
   */
  getSpecialties(...keys: string[]) {
    return keys.map(key => ({
      key,
      ...this.testData.specialties[key]
    }));
  }

  /**
   * Get multiple cities
   */
  getCities(...keys: string[]) {
    return keys.map(key => ({
      key,
      ...this.testData.cities[key]
    }));
  }

  // ==================== VALIDATION METHODS ====================

  /**
   * Validate if specialty exists
   */
  specialtyExists(key: string): boolean {
    return key in this.testData.specialties;
  }

  /**
   * Validate if city exists
   */
  cityExists(key: string): boolean {
    return key in this.testData.cities;
  }
}

export default TestDataProvider.getInstance();
