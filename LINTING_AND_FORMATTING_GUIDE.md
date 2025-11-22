# BOB Rentalz - ESLint & Prettier Configuration Guide

**Last Updated:** November 22, 2025  
**Author:** Manus AI

---

## Overview

This document describes the ESLint and Prettier setup for the BOB Rentalz project. This configuration ensures consistent code style, catches common errors, and improves overall code quality for our **Vite + React + TypeScript** application.

All required dependencies are installed and all configuration files are in place and ready to use.

---

## Configuration Files

### `.eslintrc.cjs`

This is the main ESLint configuration file. It defines parsing rules, plugins, and style guides.

**Location:** `./.eslintrc.cjs`

**Key Features:**
- Uses `@typescript-eslint/parser` for TypeScript support
- Extends recommended configs for ESLint, TypeScript, React, React Hooks, and Import
- Integrates with Prettier via `plugin:prettier/recommended`
- Enforces import ordering and alphabetization
- Detects React version automatically
- Configures TypeScript import resolution

**Full configuration:**

```javascript
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended', // Must be last to override other configs
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-refresh', 'import', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    // React rules
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react/prop-types': 'off', // Using TypeScript for prop validation
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

    // TypeScript rules
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Import rules
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-unresolved': 'error',
    'import/no-named-as-default': 'off',

    // General rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prettier/prettier': 'warn',
  },
  ignorePatterns: ['dist', 'node_modules', 'coverage', 'build', '*.config.js', '*.config.ts'],
};
```

---

### `.prettierrc`

This file configures Prettier, our automatic code formatter.

**Location:** `./.prettierrc`

**Full configuration:**

```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "all",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": []
}
```

---

### `.eslintignore` & `.prettierignore`

These files tell ESLint and Prettier which files and directories to ignore.

**Ignored paths include:**
- `dist/` - Build outputs
- `node_modules/` - Dependencies
- `coverage/` - Test coverage reports
- `*.config.js`, `*.config.ts` - Configuration files
- `.env*` - Environment files

**For full details, see:** `./.eslintignore` and `./.prettierignore`

---

## Scripts in `package.json`

The following scripts are available for linting, formatting, and type-checking:

| Script | Command | Description |
|--------|---------|-------------|
| `npm run lint` | `eslint src --ext .ts,.tsx --report-unused-disable-directives --max-warnings 0` | Reports all linting errors and warnings. Fails if any warnings exist. |
| `npm run lint:fix` | `eslint src --ext .ts,.tsx --fix` | Automatically fixes all fixable ESLint issues. |
| `npm run format` | `prettier --write "src/**/*.{ts,tsx,css,md,json}"` | Formats all relevant files in the `src` directory with Prettier. |
| `npm run format:check` | `prettier --check "src/**/*.{ts,tsx,css,md,json}"` | Checks for formatting issues without modifying files. |
| `npm run typecheck` | `tsc --noEmit` | Runs the TypeScript compiler to check for type errors. |

---

## Installed Dependencies

All necessary `devDependencies` for this setup are installed:

**Core ESLint & TypeScript:**
- `eslint@8.57.1`
- `@eslint/js@8.57.1`
- `@typescript-eslint/parser@8.47.0`
- `@typescript-eslint/eslint-plugin@8.47.0`

**React Plugins:**
- `eslint-plugin-react@7.37.5`
- `eslint-plugin-react-hooks@7.0.1`
- `eslint-plugin-react-refresh@0.4.24`

**Import Support:**
- `eslint-plugin-import@2.32.0`
- `eslint-import-resolver-typescript@4.4.4`

**Prettier Integration:**
- `prettier@3.6.2`
- `eslint-config-prettier@10.1.8`
- `eslint-plugin-prettier@5.5.4`

---

## How to Use

### During Development

**Check for issues periodically:**
```bash
npm run lint        # See all linting issues
npm run typecheck   # Check for TypeScript errors
```

### Before Committing

**Auto-fix and format your code:**
```bash
npm run lint:fix    # Fix auto-fixable linting issues
npm run format      # Format all code with Prettier
```

### Before Pull Request

**Verify everything is clean:**
```bash
npm run lint          # Ensure no linting errors
npm run format:check  # Ensure code is formatted
npm run typecheck     # Ensure no type errors
```

### Before Deployment

**Run all checks:**
```bash
npm run lint && npm run format:check && npm run typecheck
```

---

## Recommended Workflow

Follow this **3-step workflow** for maintaining code quality:

1. **Write Code** - Develop your features as usual
2. **Check for Issues** - Periodically run `npm run lint` and `npm run typecheck` to catch errors early
3. **Auto-Fix & Format** - Before committing, run `npm run lint:fix` and `npm run format` to clean up your code

This setup provides a strong foundation for maintaining a high-quality and consistent codebase for the BOB Rentalz application.
