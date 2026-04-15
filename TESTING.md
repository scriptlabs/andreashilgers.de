# Testing Strategy - andreashilgers.de

This project follows a modern testing strategy focusing on reliability, speed, and developer experience.

## 🧪 Testing Stack

- **Unit & Component Tests:** [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
- **End-to-End (E2E) Tests:** [Playwright](https://playwright.dev/).
- **Code Quality:** [ESLint](https://eslint.org/), [Commitlint](https://commitlint.js.org/), and [Husky](https://typicode.github.io/husky/).

## 🏃 Running Tests

### Unit Tests
Run all unit tests once:
```bash
npm run test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### End-to-End Tests
Run Playwright tests:
```bash
npm run e2e
```
*Note: This will automatically start the development server if it's not already running.*

## 📐 Testing Guidelines

### 1. Unit Testing
- Test utility functions (e.g., `cn`, dictionary helpers).
- Aim for high coverage on complex business logic.
- Files should be named `[filename].test.ts`.

### 2. Component Testing
- Use React Testing Library to test user interactions.
- Focus on accessibility and behavioral correctness rather than implementation details.

### 3. E2E Testing
- Focus on "Happy Paths" and critical user journeys:
  - Language switching.
  - Theme switching.
  - Secure Vault access.
  - Contact links.
- Tests are located in `tests/e2e/`.

## 🛠️ Quality Automation

### Conventional Commits
We use `commitlint` to enforce [Conventional Commits](https://www.conventionalcommits.org/). This ensures a clean and readable project history.

Example commit messages:
- `feat: add new project to portfolio`
- `fix: resolve mobile navigation bug`
- `docs: update testing instructions`

### Git Hooks
`Husky` is configured to run the following checks:
- **pre-commit:** Runs `npm run lint` to ensure code style consistency.
- **commit-msg:** Runs `commitlint` to verify the commit message format.
