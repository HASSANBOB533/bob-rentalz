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
    // OPTIMIZATION: Don't generate full type information unless needed
    // This significantly speeds up parsing
    project: null, // Disable type-aware linting (was using './tsconfig.json')
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'react-refresh', 'import', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      // OPTIMIZATION: Simplify import resolution
      typescript: {
        alwaysTryTypes: false, // Changed from true - don't always try type files
        // project: './tsconfig.json', // Removed - let it use default resolution
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    // OPTIMIZATION: Cache import resolution results
    'import/cache': {
      lifetime: Infinity,
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
    'import/no-unresolved': ['error', { ignore: ['^figma:'] }],
    'import/default': 'off', // Disabled due to false positives with React imports
    'import/no-named-as-default': 'off',
    // OPTIMIZATION: Disable expensive import rules
    'import/namespace': 'off', // Expensive rule, disable if not critical
    'import/no-named-as-default-member': 'off', // Expensive rule

    // General rules
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'prettier/prettier': 'warn',
  },
  ignorePatterns: ['dist', 'node_modules', 'coverage', 'build', '*.config.js', '*.config.ts'],
};
