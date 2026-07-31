/**
 * Utility helpers for test automation
 * Note: Most data access is handled by testDataProvider
 */

/**
 * Format test data for logging (optional utility)
 */
export function formatTestData(data: any): string {
  return JSON.stringify(data, null, 2);
}
