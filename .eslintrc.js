// /**
//  * @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config}
//  **/
// const config = {
//   parser: '@typescript-eslint/parser',
//   plugins: ['@typescript-eslint', 'tailwindcss'],
//   extends: [
//     'eslint:recommended',
//     'next',
//     'next/core-web-vitals',
//     'plugin:react/recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:tailwindcss/recommended',
//     // Uncomment the following lines to enable eslint-config-prettier
//     // Is not enabled right now to avoid issues with the Next.js repo
//     // 'prettier',
//   ],
//   env: {
//     es6: true,
//     browser: true,
//     jest: true,
//     node: true,
//   },
//   settings: {
//     react: {
//       version: 'detect',
//     },
//   },
//   rules: {
//     'react/react-in-jsx-scope': 0,
//     'react/display-name': 0,
//     'react/prop-types': 0,
//     '@typescript-eslint/explicit-function-return-type': 0,
//     '@typescript-eslint/explicit-member-accessibility': 0,
//     '@typescript-eslint/indent': 0,
//     '@typescript-eslint/member-delimiter-style': 0,
//     '@typescript-eslint/no-explicit-any': 0,
//     '@typescript-eslint/no-var-requires': 0,
//     '@typescript-eslint/no-use-before-define': 0,
//     '@typescript-eslint/no-unused-vars': [
//       2,
//       {
//         argsIgnorePattern: '^_',
//       },
//     ],
//     'no-console': [
//       2,
//       {
//         allow: ['warn', 'error'],
//       },
//     ],
//   },
// }

// module.exports = config

/**
 * @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config}
 **/
const config = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'tailwindcss'],
  extends: [
    'eslint:recommended',
    'next',
    'next/core-web-vitals',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    // Uncomment the following lines to enable eslint-config-prettier
    // Is not enabled right now to avoid issues with the Next.js repo
    // 'prettier',
  ],
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Tailwind CSS rules to be disabled or configured
    'tailwindcss/classnames-order': 'off', // Disable warnings related to classnames order
    'tailwindcss/enforces-shorthand': 'off', // Disable warnings about shorthand usage
    'tailwindcss/no-custom-classname': 'off', // Disable warnings about custom class names
    'tailwindcss/migration-from-tailwind-2': 'off', // Disable migration warnings

    'react/react-in-jsx-scope': 0,
    'react/display-name': 0,
    'react/prop-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/indent': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
  },
  reportUnusedDisableDirectives: true,
  ignorePatterns: ['node_modules/**', '.next/**'],
};

module.exports = config;
