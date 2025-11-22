# BOB Rentalz - Development Workflow Quick Reference

This card provides a quick summary of the essential commands for maintaining code quality in the BOB Rentalz project.

---

## The 3-Step Workflow

Follow these steps before committing your code to ensure it is clean, consistent, and error-free.

### 1. Write Code

Develop your features as you normally would. Focus on functionality and logic.

### 2. Check for Issues

Periodically run these commands to catch errors early in your development process.

| Command           | Description                                                 |
| ----------------- | ----------------------------------------------------------- |
| `npm run lint`    | **Find Problems**: Reports linting errors and warnings without modifying files. Use this to see what needs fixing. |
| `npm run typecheck` | **Ensure Type Safety**: Runs the TypeScript compiler to check for any type-related errors in your code. |

### 3. Auto-Fix & Format

Before you commit, run these commands to automatically fix what can be fixed and ensure consistent formatting.

| Command           | Description                                                 |
| ----------------- | ----------------------------------------------------------- |
| `npm run lint:fix`| **Auto-Fix Lint Issues**: Automatically fixes all fixable ESLint problems, such as import order and unused variables. |
| `npm run format`  | **Format Code**: Applies Prettier to format all your code, ensuring it adheres to the project's style guide. |

---

**Tip:** Running `npm run format` and `npm run lint:fix` regularly will save you time and keep your commits clean and pull-request-ready.
