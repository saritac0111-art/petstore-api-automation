# Petstore API Automation

API automation framework built using Playwright and TypeScript for the Swagger Petstore API.

## Tech Stack

- TypeScript
- Playwright Test
- REST API
- dotenv
- Git

## API Coverage

The following Pet endpoints are automated:

- POST /pet - Create Pet
- GET /pet/{petId} - Get Pet
- PUT /pet - Update Pet
- DELETE /pet/{petId} - Delete Pet

Negative scenario:

- GET /pet/{invalidPetId} - Verify 404 response

## Validations

The framework validates:

- HTTP 200 responses
- HTTP 404 response
- Created Pet ID
- Pet name
- Pet status
- Category
- Photo URLs
- Tags
- POST response against GET response

## Project Structure

petstore-api-automation
│
├── api
│   └── petApi.ts
│
├── data
│   └── petData.ts
│
├── environments
│   ├── qa.env
│   └── dev.env
│
├── fixtures
│   └── apiFixture.ts
│
├── tests
│   └── pet.spec.ts
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md

## Installation

Clone the repository:

git clone <YOUR_GITHUB_REPOSITORY_URL>

Navigate to the project:

cd petstore-api-automation

Install dependencies:

npm install

## Run Tests

Run all tests:

npx playwright test

Run tests with 5 parallel workers:

npx playwright test --workers=5

Run QA environment:

ENV=qa npx playwright test --workers=5

Run DEV environment:

ENV=dev npx playwright test --workers=5

## View HTML Report

After test execution:

npx playwright show-report

## List Tests

npx playwright test --list

## Framework Features

- TypeScript based automation
- Playwright APIRequestContext
- Reusable API service layer
- Custom Playwright fixture
- Environment-specific configuration
- Parallel test execution
- HTML reporting
- Positive and negative API scenarios
- Response body assertions
- POST vs GET response validation
- Test data generation
- Cleanup after test execution
- Polling for transient API behavior
- Independent tests suitable for parallel execution

## Environment Configuration

Environment-specific configuration is maintained under:

environments/

The environment can be selected using the ENV variable.

Example:

ENV=qa npx playwright test --workers=5

BASE_URL is configured through the environment file and is not hard-coded inside the tests.

## Test Cases

The current test suite contains:

1. Create Pet - POST
2. Create Pet and Verify with GET
3. Update Pet - PUT
4. Delete Pet - DELETE
5. Get Non-Existing Pet - 404

## Reporting

Playwright HTML reporting is enabled in the project configuration.

Generated reports are excluded from Git using .gitignore.

## Notes

The project uses the public Swagger Petstore API:

https://petstore.swagger.io/

Because this is a shared public API, transient behavior can occasionally occur during parallel execution. Polling is used for the POST-to-GET verification scenario to improve test reliability.