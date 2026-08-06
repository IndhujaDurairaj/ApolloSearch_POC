# Apollo Hospitals - Test Automation Framework

Enterprise-grade test automation framework for Apollo Hospitals doctor search functionality using **Playwright** and **TypeScript**.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Cases](#test-cases)
- [Page Object Model](#page-object-model)
- [Test Data](#test-data)
- [Reporting](#reporting)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This framework automates the Apollo Hospitals doctor search functionality with comprehensive test coverage. It follows industry best practices including:

- **Page Object Model (POM)** design pattern
- **TypeScript** for type safety
- **Playwright** for browser automation
- **Environment-based configuration** management
- **JSON-based test data** organization
- **HTML reporting** with screenshots and videos
- **Modular and scalable** architecture

## ✨ Features

✅ Page Object Model (POM) architecture
✅ TypeScript strict mode enabled
✅ Environment-based configuration (.env)
✅ JSON test data with centralized provider
✅ Smart filter validation assertions
✅ Playwright assertions with role-based locators
✅ HTML Report generation
✅ Screenshots on test failure
✅ Video recording on failure
✅ Parallel test execution
✅ Chromium browser automation
✅ CI/CD ready
✅ Reusable page objects and utilities

## 📁 Project Structure

```
apollo-hospitals-automation/
├── src/
│   ├── config/
│   │   ├── config.ts              # Configuration loader
│   │   └── index.ts               # Config exports
│   ├── pages/
│   │   ├── basePage.ts            # Base class for all page objects
│   │   └── doctorsPage.ts         # Doctors search page object (20+ methods)
│   ├── data/
│   │   └── testData.json          # Test data (specialties, cities, languages, doctors)
│   └── utils/
│       ├── helpers.ts             # Utility functions (formatTestData)
│       ├── testDataProvider.ts    # Centralized test data access (Singleton)
│       └── index.ts               # Exports
├── tests/
│   ├── fixtures.ts                # Custom Playwright fixtures
│   ├── doctors.positive.spec.ts   # Positive test cases (4 tests)
│   └── doctors.negative.spec.ts   # Negative test cases (2 tests)
├── .env                           # Environment variables (not in git)
├── .env.example                   # Example environment file
├── .gitignore                     # Git ignore patterns
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies
├── test-results/                  # Test results & reports (gitignored)
├── README.md                      # This file
└── .github/
    └── workflows/
        └── tests.yml              # GitHub Actions CI/CD
```

## 📦 Prerequisites

- **Node.js** >= 16.x
- **npm** >= 8.x or **yarn** >= 3.x
- **Git** >= 2.x

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/apollo-hospitals-automation.git
cd apollo-hospitals-automation
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- Playwright test framework
- TypeScript compiler
- dotenv for environment management
- All peer dependencies

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Setup Environment Configuration

Copy the example environment file and configure:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
BASE_URL=https://www.apollohospitals.com/doctors
HEADLESS=true
BROWSER=chromium
TIMEOUT=30000
RETRY=2
SCREENSHOT_ON_FAILURE=true
```

## ⚙️ Configuration

### Environment Variables (.env)

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `https://www.apollohospitals.com/doctors` | Apollo Hospitals doctors page URL |
| `HEADLESS` | `true` | Run browser in headless mode |
| `BROWSER` | `chromium` | Browser to use (chromium) |
| `SLOW_MO` | `0` | Slow down browser by ms (debugging) |
| `TIMEOUT` | `30000` | Test timeout in milliseconds |
| `RETRY` | `2` | Number of retries on failure |
| `SCREENSHOT_ON_FAILURE` | `true` | Capture screenshot on test failure |
| `REPORT_DIR` | `test-results` | Directory for test reports |
| `VIDEO_ON_FAILURE` | `false` | Record video on test failure |

## 🧪 Running Tests

### Run All Tests

```bash
npm test
```

### Browser Automation

#### Run All Tests

```bash
npm test
```

#### Run Tests in Headed Mode

```bash
npx playwright test --headed
```

#### Parallel Test Execution

```bash
# Run tests in parallel (respects workers config in playwright.config.ts)
npm test
```

#### Sequential Test Execution

```bash
# Run all tests on Chromium, then Firefox, then Safari (no parallelization)
npx playwright test --workers=1
```

### Interactive Testing Modes

#### Run Tests in UI Mode (Interactive)

```bash
npm run test:ui
```

Great for debugging and development. Features:
- Real-time test execution in browser
- Step through tests
- Inspect elements
- Watch test execution live

#### Run Tests in Headed Mode (Visible Browser)

```bash
npm run test:headed
```

Shows browser window during execution - useful for:
- Visual debugging
- Verifying locators
- Understanding test flow
- Recording behavior

#### Run Tests in Debug Mode

```bash
npm run test:debug
```

Enables Playwright Inspector for:
- Step-by-step execution
- Console inspection
- Source code analysis
- Network monitoring

### Filtering & Selection

#### Run Specific Test File

```bash
npx playwright test tests/doctors.positive.spec.ts
```

#### Run Tests with Specific Tag/Pattern

```bash
npx playwright test -g "TC_PS_001"
npx playwright test -g "filter"  # Runs all tests with "filter" in name
```

#### Run Tests Excluding Pattern

```bash
npx playwright test -g "negative"  # Skip negative tests
```

### Reporting

#### Generate and View HTML Report

After tests complete:

```bash
npm run test:report
```

Opens interactive HTML report showing:
- Test results summary (passed/failed/skipped)
- Detailed test execution timeline
- Screenshots on failure
- Video recordings (if enabled)
- Error logs and stack traces
- Execution time per test

#### View Latest Report (if HTML server still running)

```bash
npx playwright show-report test-results
```

### Advanced Test Execution

#### Run Tests with Custom Timeout

```bash
# 120 seconds timeout per test
npx playwright test --timeout=120000
```

#### Run Failed Tests Only (from last run)

```bash
npx playwright test --last-failed
```

#### Run Tests with Retry Count

```bash
# Retry failed tests 3 times
npx playwright test --retries=3
```

#### Run Tests with Output Verbosity

```bash
# Verbose output
npx playwright test --reporter=verbose

# List reporter
npx playwright test --reporter=list
```

### CI/CD Execution

#### Run in CI Environment (Headless, No Video, Screenshot on Fail)

```bash
HEADLESS=true npm test
```

#### GitHub Actions

Tests run automatically on:
- Push to main branch
- Pull requests

See `.github/workflows/tests.yml` for CI configuration.

## 📝 Test Cases

### Coverage Summary

| Test Type | Count | Complexity | Status |
|-----------|-------|-----------|--------|
| **Edge Cases** | 4 | Advanced | ✅ |
| **Negative Tests** | 5 | Intermediate | ✅ |
| **Positive Tests** | 11 | Basic→Advanced | ✅ |
| **Total** | 20 | Mixed | ✅ |

### Edge Case Tests (Advanced Scenarios)

| ID | Test Name | Scenario | Validation | File |
|----|-----------|----------|-----------|------|
| **TC_EDGE_001** | Empty search query handling | User enters empty text | Page remains stable, all doctors displayed | `doctors.edgecases.spec.ts` |
| **TC_EDGE_002** | Security - Special characters & injection | XSS/SQL injection patterns | Page handles safely without errors | `doctors.edgecases.spec.ts` |
| **TC_EDGE_003** | Case insensitivity in search | lowercase, UPPERCASE, MixedCase | Search returns results regardless of case | `doctors.edgecases.spec.ts` |
| **TC_EDGE_004** | Partial name search | Searching by name fragments | Returns doctors matching partial names | `doctors.edgecases.spec.ts` |

### Positive Test Cases (Basic → Advanced)

| ID | Test Name | Scenario | Validation | Complexity |
|----|-----------|----------|-----------|-----------|
| **TC_PS_001** | Multiple specialties filter | Cardiac Sciences + ENT | Displays doctors from either specialty | Basic |
| **TC_PS_002** | Clear filters | Clear → Restore defaults | Filter cleared, all doctors restored | Basic |
| **TC_PS_003** | Single city filter | Bangalore selection | Results from Bangalore only | Basic |
| **TC_PS_004** | Switch cities | Bangalore → Hyderabad | Correctly switches city results | Intermediate |
| **TC_PS_006** | Language filter | English-speaking doctors | Filter applied and verified | Intermediate |
| **TC_PS_007** | Multi-filter combination | Specialty + City | Both filters work together | Intermediate |
| **TC_PS_008** | Specialty only | ENT specialty | Returns ENT doctors | Intermediate |
| **TC_PS_009** | Multi-filter advanced | Specialty + City | Orthopedics + Delhi | Intermediate |
| **TC_PS_010** | Male gender filter | Male doctors only | Gender filter applied | Advanced |
| **TC_PS_011** | Female gender filter | Female doctors only | Gender filter applied | Advanced |

### Negative Test Cases (Error States & Boundaries)

| ID | Test Name | Scenario | Expected Behavior | Validation |
|----|-----------|----------|------------------|-----------|
| **TC_NEG_001** | Rare filter combination | Lung Transplant + Bilaspur | Results reduced or empty | Filters apply correctly |
| **TC_NEG_002** | Single specialty validation | Orthopedics filter | Correct specialty displayed | No wrong specialty shown |
| **TC_NEG_003** | Invalid search input | Searching for "Dr XYZ ABC Invalid" | No results or graceful handling | Page stable |
| **TC_NEG_004** | Gender filter switching | Male → Female → Male | Filters switch correctly | Filter state maintained |

## 🏗️ Page Object Model

### Base Page (`basePage.ts`)

Provides common functionality:

```typescript
// Navigation
async goto()

// Element interaction
async waitForElement(locator, timeout)
async waitForElementCountStability(locator, timeout)

// Utilities
async getPageTitle()
getCurrentUrl()
```

### Doctors Page (`doctorsPage.ts`)

Encapsulates doctor search page interactions with **20+ methods**:

```typescript
// Navigation
async navigateToDoctorsPage()

// Filter Selection
async selectSpecialty(specialtyId)
async unselectSpecialty(specialtyId)
async selectCity(cityValue)
async selectLanguage(languageId)
async searchDoctorByName(name)

// Filter Verification & Validation
async isSpecialtySelected(specialtyId)
async verifySpecialtyFilterApplied(specialtyId)

// Result Retrieval
async getDoctorCount()
async getDoctorInfo(index)
async getAllDoctorNames()

// Filter Validation Methods (NEW)
async getDisplayedSpecialties()           // Extract all specialties from visible doctors
async getDisplayedCities()                 // Extract all cities from visible doctors
async verifyFilteredSpecialty(name)        // Validate specialty filter is active
async verifyFilteredCity(name)             // Validate city filter is active
async verifyFilterResults(filterName)      // Validate filter results are correct

// Utilities
async clearAllFilters()
async isNoResultsDisplayed()
async canGoToNextPage()
async goToNextPage()
async canGoToPreviousPage()
async goToPreviousPage()
async getAppliedFilters()
async scrollToDoctorCards()
```

## 📊 Test Data

### Test Data Provider (Singleton Pattern)

Centralized test data access using `testDataProvider`:

```typescript
import { testDataProvider } from '../src/utils';

// Get by key
const cardiacId = testDataProvider.getSpecialtyId('cardiacSciences');
const cardiacName = testDataProvider.getSpecialtyName('cardiacSciences');

// Get city data
const bangaloreId = testDataProvider.getCityId('bangalore');
const bangaloreName = testDataProvider.getCityName('bangalore');

// Get language data
const englishId = testDataProvider.getLanguageId('english');

// Get doctor data
const invalidDoctor = testDataProvider.getInvalidDoctorName();
const validDoctor = testDataProvider.getValidDoctorName();

// Get all IDs
const allSpecialtyIds = testDataProvider.getAllSpecialtyIds();
const allCityIds = testDataProvider.getAllCityIds();
```

### Test Data Structure (`testData.json`)

```json
{
  "specialties": {
    "cardiacSciences": { "id": "19", "name": "Cardiac Sciences", "displayName": "Cardiac Sciences" },
    "ent": { "id": "3332", "name": "ENT", "displayName": "ENT" },
    "generalMedicine": { "id": "4104", "name": "General Medicine", "displayName": "General Medicine" },
    "orthopedics": { "id": "3100", "name": "Orthopedics", "displayName": "Orthopedics" },
    "dermatology": { "id": "4387", "name": "Dermatology", "displayName": "Dermatology" },
    "lungTransplant": { "id": "13898", "name": "Lung Transplant", "displayName": "Lung Transplant" }
  },
  "cities": {
    "bangalore": { "id": "3015", "name": "Bangalore", "displayName": "Bangalore" },
    "hyderabad": { "id": "12", "name": "Hyderabad", "displayName": "Hyderabad" },
    "chennai": { "id": "1", "name": "Chennai", "displayName": "Chennai" },
    "delhi": { "id": "2741", "name": "Delhi", "displayName": "Delhi" },
    "mumbai": { "id": "3989", "name": "Mumbai", "displayName": "Mumbai" },
    "bilaspur": { "id": "6373", "name": "Bilaspur", "displayName": "Bilaspur" }
  },
  "languages": {
    "english": { "id": "7", "name": "English", "displayName": "English" },
    "hindi": { "id": "8", "name": "Hindi", "displayName": "Hindi" },
    "tamil": { "id": "3103", "name": "Tamil", "displayName": "Tamil" },
    "telugu": { "id": "3102", "name": "Telugu", "displayName": "Telugu" },
    "kannada": { "id": "9", "name": "Kannada", "displayName": "Kannada" }
  },
  "doctors": {
    "validDoctor": "Dr P L Dhingra",
    "invalidDoctor": "Dr XYZ ABC Invalid",
    "partialSearch": "Dr"
  }
}
```

### Advantages of TestDataProvider

✅ **Singleton Pattern** - Single instance across all tests
✅ **Type-Safe** - Returns typed data
✅ **Centralized** - All test data in one place
✅ **Reusable** - Import and use in any test
✅ **Maintainable** - Change data once, reflects everywhere

## 📈 Reporting

### HTML Report

Test results are automatically generated in `test-results/` directory:

```
test-results/
├── index.html                 # Main report
├── results.json              # Test results in JSON
└── trace/                    # Playwright traces
```

**View Report:**
```bash
npm run test:report
```

### Report Features

✅ Test summary and statistics
✅ Individual test details
✅ Screenshots on failure
✅ Video recordings
✅ Browser and OS information
✅ Execution time and duration
✅ Full trace of interactions

## 🔄 CI/CD Integration

### GitHub Actions Workflow

See `.github/workflows/tests.yml` for automated testing on:
- Push to main/develop branches
- Pull requests
- Scheduled runs

### Running Tests in CI

```bash
npm test
```

The CI environment automatically:
- Installs dependencies
- Installs Playwright browsers
- Runs all tests
- Generates reports
- Uploads artifacts

## 🎯 Best Practices

### 1. Filter Validation (NEW)

✅ **DO** - Validate displayed filter results instead of just counting:

```typescript
// Good: Validates that displayed doctors have the filtered specialty
const isCardiacDisplayed = await doctorsPage.verifyFilteredSpecialty('Cardiac Sciences');
expect(isCardiacDisplayed).toBe(true);

// Or validate multiple filters
const displayedCities = await doctorsPage.getDisplayedCities();
expect(displayedCities).toContain('bangalore');
```

❌ **DON'T** - Just count results:

```typescript
// Avoid - doesn't verify filter was actually applied
const count = await doctorsPage.getDoctorCount();
expect(count).toBeGreaterThan(0);
```

### 2. Locator Selection

**Prefer this order:**
1. Role-based: `page.getByRole('button', { name: 'Click me' })`
2. Label: `page.getByLabel('User name')`
3. Placeholder: `page.getByPlaceholder('name')`
4. Test ID: `page.getByTestId('unique-id')`
5. CSS/XPath: Last resort

### 3. Wait Strategies

✅ **DO** - Use built-in waits:
```typescript
await page.waitForLoadState('load');
await expect(locator).toBeVisible();
```

❌ **DON'T** - Use arbitrary delays:
```typescript
// Avoid this!
await page.waitForTimeout(5000);
```

### 4. Assertions

✅ **DO** - Use Playwright assertions:
```typescript
expect(await doctorsPage.getDoctorCount()).toBeGreaterThan(0);
```

❌ **DON'T** - Use external assertion libraries:
```typescript
// Avoid this
assert(count > 0);
```

### 5. Page Objects

✅ **DO** - Encapsulate interactions:
```typescript
async selectSpecialty(id) {
  await checkbox.check();
  await this.waitForElementCountStability(this.doctorCards, 5000);
}
```

❌ **DON'T** - Expose implementation:
```typescript
// Avoid in test files
await page.locator('input[name="speciality[19]"]').check();
```

### 6. Test Data Access

✅ **DO** - Use testDataProvider:
```typescript
const specialtyId = testDataProvider.getSpecialtyId('cardiacSciences');
const specialtyName = testDataProvider.getSpecialtyName('cardiacSciences');
```

❌ **DON'T** - Hard-code test data:
```typescript
// Avoid hardcoding
const specialtyId = '19';
const specialtyName = 'Cardiac Sciences';
```

### 7. Test Naming

Use clear, descriptive test names with IDs:

```typescript
test('[TC_PS_001] Should filter doctors by specialty', ...);
test('[TC_PS_NEG_001] Should validate Lung Transplant filter', ...);
```

### 8. Test Organization

Group related tests:

```typescript
test.describe('Apollo Hospitals - Doctor Search Automation (Positive Cases)', () => {
  test.beforeEach(async ({ doctorsPage }) => {
    await doctorsPage.navigateToDoctorsPage();
  });

  test('[TC_PS_001] ...', ...);
  test('[TC_PS_002] ...', ...);
});
```

## 🐛 Troubleshooting

### Issue: Tests timeout

**Solution:**
```bash
# Increase timeout in .env
TIMEOUT=60000

# Or in specific test
test.setTimeout(60000);
```

### Issue: Locators not found

**Debug:**
```bash
npm run test:debug

# In debug mode, use:
await page.pause();
```

Then inspect the page manually.

### Issue: Screenshots not captured

**Check:**
```env
# Ensure in .env:
SCREENSHOT_ON_FAILURE=true
```

### Issue: Port already in use

**Solution:**
```bash
# Kill process using the port
lsof -i :3000
kill -9 <PID>
```

### Issue: Browser not installed

**Solution:**
```bash
npx playwright install
npx playwright install-deps
```

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
- [Assertion Methods](https://playwright.dev/docs/test-assertions)

## 📄 License

MIT License - see LICENSE file for details

## 👥 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📧 Support

For issues, questions, or suggestions:
- Create an Issue on GitHub
- Contact: [your-email@example.com]

---

**Happy Testing! 🎉**

Built with ❤️ using Playwright + TypeScript
