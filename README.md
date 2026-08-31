# Petstore API Automation

API automation framework built using Playwright and TypeScript for the Swagger Petstore API.

## Tech Stack

* TypeScript
* Playwright Test
* REST API
* dotenv
* Git

## API Coverage

The following Pet endpoints are automated:

* `POST /pet` - Create Pet
* `GET /pet/{petId}` - Get Pet
* `PUT /pet` - Update Pet
* `DELETE /pet/{petId}` - Delete Pet

Negative scenario:

* `GET /pet/{petId}` - Verify 404 response after deleting the pet

## Validations

The framework validates:

* HTTP 200 responses
* HTTP 404 response
* Created Pet ID
* Pet name
* Pet status
* Category
* Photo URLs
* Tags
* POST response against GET response

## Project Structure

```text
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
├── utils
│   └── apiAssertions.ts
│
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Installation

Clone the repository:

```bash
git clone https://github.com/saritac0111-art/petstore-api-automation.git
```

Navigate to the project:

```bash
cd petstore-api-automation
```

Install dependencies:

```bash
npm install
```

## Run Tests

Run all tests:

```bash
npx playwright test
```

Run tests with 5 parallel workers:

```bash
npx playwright test --workers=5
```

Run QA environment:

```bash
npm run test:qa
```

Run DEV environment:

```bash
npm run test:dev
```

Run QA and DEV environments in parallel:

```bash
npm run test:parallel:env
```

## View HTML Reports

QA report:

```bash
npx playwright show-report playwright-report/qa
```

DEV report:

```bash
npx playwright show-report playwright-report/dev
```

## List Tests

To list all available tests without executing them:

```bash
npx playwright test --list
```

## Framework Features

* TypeScript-based API automation
* Playwright `APIRequestContext`
* Reusable API service layer
* Custom Playwright fixture
* Environment-specific configuration
* Parallel test execution
* HTML reporting
* Positive and negative API scenarios
* Response body assertions
* POST vs GET response validation
* Dynamic test data generation
* Cleanup after test execution
* Independent tests suitable for parallel execution

## Environment Configuration

Environment-specific configuration is maintained under:

```text
environments/
├── qa.env
└── dev.env
```

The environment can be selected using the `ENV` variable.

For example:

```bash
ENV=qa npx playwright test --workers=5
```

or:

```bash
ENV=dev npx playwright test --workers=5
```

`BASE_URL` is configured through the environment file and is not hard-coded inside the tests.

## Test Cases

The current test suite contains:

1. Create Pet - POST
2. Create Pet and Verify with GET
3. Update Pet - PUT
4. Delete Pet - DELETE
5. Get Deleted Pet - 404

## Reporting

Playwright HTML reporting is enabled in the project configuration.

Reports are separated by environment:

```text
playwright-report/
├── qa/
└── dev/
```

Generated reports are excluded from Git using `.gitignore`.

## Test Data and Cleanup

Test data is generated dynamically using `Date.now()` to reduce the possibility of test data collision during repeated or parallel execution.

Tests that create pets also clean up the created data by deleting the pet after validation.

The negative test creates and deletes a pet first, and then verifies that retrieving the deleted pet returns a `404` response. This avoids depending on an arbitrary hardcoded pet ID.

## Notes

The project uses the public Swagger Petstore API:

https://petstore.swagger.io/

Because this is a shared public API, transient behavior can occasionally occur during parallel execution. The tests are designed to use independent test data and cleanup to improve reliability.
