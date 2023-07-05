module.exports = {
  rules: {
    'react-refresh/only-export-components': 'warn',
    'unicorn/filename-case': 'off',
    'unicorn/prevent-abbreviations': ["error", {"replacements": {"e": false , "res": false}}],
    'unicorn/no-await-expression-member': 'off'
  },
  reportUnusedDisableDirectives: true,
  ignorePatterns: ['dist/*'],
  env: { browser: true, es2020: true, node: true },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  plugins: ['react-refresh'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:unicorn/recommended"
  ],
  parser: '@typescript-eslint/parser'
}
