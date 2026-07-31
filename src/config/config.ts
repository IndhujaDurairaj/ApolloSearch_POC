/**
 * Application configuration
 * Reads environment variables that were already loaded by playwright.config.ts
 * 
 * IMPORTANT: playwright.config.ts loads .env file FIRST, then config.ts uses those values
 * Do NOT load dotenv here - it causes duplicate loading
 */

const baseUrl = process.env.BASE_URL || 'https://www.apollohospitals.com/doctors';

export const config = {
  /**
   * Base URL for the Apollo Hospitals application
   * Source: .env file (BASE_URL=https://www.apollohospitals.com/doctors)
   * Reader: playwright.config.ts loads it via dotenv
   * Flow: .env → dotenv → process.env.BASE_URL → config.ts
   */
  baseUrl,
};

export default config;
