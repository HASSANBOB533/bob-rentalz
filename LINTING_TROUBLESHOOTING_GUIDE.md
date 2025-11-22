# BOB Rentalz - Linting Troubleshooting Guide

**Last Updated:** November 22, 2025  
**Author:** Manus AI

---

## Overview

This document provides a guide for troubleshooting and fixing common ESLint and TypeScript errors that you may encounter in the BOB Rentalz project. Our tooling is configured to be strict to maintain high code quality, but many common issues have simple solutions.

---

## Common Lint Issues & Quick Fixes

Here are some of the most frequent issues you'll see when running `npm run lint` and how to resolve them.

### `@typescript-eslint/no-unused-vars`

**Problem:** You have declared a variable, function, or import that is never used.

**Solution:**
- **Delete it:** If the variable is truly not needed, the cleanest solution is to remove it.
- **Prefix with `_`:** If a variable must be declared but is intentionally unused (e.g., a function argument you must accept but don't use), prefix its name with an underscore `_`.

```ts
// Before
import { useState } from 'react';
const MyComponent = (props) => { // props is unused
  const unusedValue = 10;
  return <div>Hello</div>;
};

// After
const MyComponent = (_props) => { // Prefixed with _
  return <div>Hello</div>;
};
```

### `import/no-unresolved`

**Problem:** ESLint cannot find the module you are trying to import.

**Solution:**
- **Check the Path:** Double-check that the import path is correct and that the file exists at that location. Pay close attention to relative paths (`../`, `./`).
- **Verify Aliases:** If you are using path aliases (e.g., `@/components/...`), ensure they are correctly configured in both `tsconfig.json` (under `paths`) and in `.eslintrc.cjs` (under `settings['import/resolver']`).

### `react-refresh/only-export-components`

**Problem:** A file containing a React component or hook is also exporting non-component values (like constants or helper functions).

**Solution:**
- **Move Non-Component Exports:** The best practice is to move constants, helper functions, and other non-component logic into separate utility files (e.g., `src/utils/helpers.ts`).
- **Allow Constant Exports (If Necessary):** Our ESLint rule is configured to `warn` but allow constant exports. However, it is still better to separate concerns.

### TypeScript Prop Typing (`@typescript-eslint/no-explicit-any`)

**Problem:** A component's props are typed as `any`, which defeats the purpose of TypeScript.

**Solution:**
- **Define a Type/Interface:** Create a specific type or interface for your component's props.

```ts
// Before
function PropertyCard(props: any) { ... }

// After
interface PropertyCardProps {
  title: string;
  price: number;
  location: string;
}

function PropertyCard({ title, price, location }: PropertyCardProps) { ... }
```

### `no-console`

**Problem:** You have `console.log()` statements in your code, which are generally not suitable for production.

**Solution:**
- **Remove Them:** For debugging purposes, `console.log` is fine, but it should be removed before committing.
- **Use `warn` or `error`:** Our configuration allows `console.warn` and `console.error` for cases where you need to log important warnings or errors to the console.

### `prettier/prettier`

**Problem:** Your code's formatting does not match the project's Prettier style guide (e.g., wrong quotes, spacing, line breaks).

**Solution:**
- **Run Auto-Fix Commands:** This is the easiest fix. These two commands will resolve almost all formatting and simple lint issues automatically.

```bash
npm run lint:fix
npm run format
```

---

## General Troubleshooting Workflow

1. **Run `npm run lint`** to see the list of issues.
2. **Run `npm run format` and `npm run lint:fix`** to automatically solve as many problems as possible.
3. **Manually Fix the Rest:** For the remaining errors, consult this guide to apply the correct fix.
4. **Run `npm run typecheck`** to ensure there are no underlying TypeScript errors.
