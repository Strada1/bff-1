module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'import/prefer-default-export': 0,
    'linebreak-style': 0,
    'object-curly-newline': 0,
    'no-console': 0,
    'comma-dangle': 0,
    'consistent-return': 0,
    'import/no-extraneous-dependencies': 0,
    'implicit-arrow-linebreak': 0,
    'no-underscore-dangle': 0,
    'operator-linebreak': 0,
    'newline-per-chained-call': 0,
    'no-prototype-builtins': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
