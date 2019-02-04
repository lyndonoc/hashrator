module.exports = {
  env: {
    es6: true,
    jest: true,
    jasmine: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:node/recommended',
    'plugin:promise/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['dependencies', 'import', 'node', 'promise'],
  rules: {
    'dependencies/case-sensitive': 1,
    'dependencies/no-cycles': 1,
    'dependencies/no-unresolved': 1,
    'dependencies/require-json-ext': 1,
    'import/order': [
      2,
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
    'import/newline-after-import': [2],
    'linebreak-style': ['error', 'unix'],
    'no-console': 'off',
    'promise/no-callback-in-promise': [
      'error',
      {
        'exceptions': ['next']
      }
    ],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
  },
};
