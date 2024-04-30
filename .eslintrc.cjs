/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-typescript'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        'eqeqeq': ['error', 'always'],
        'no-empty-function': 'warn',
        'no-multi-spaces': 'error',
        'no-redeclare': 'error',
        'no-unused-expressions': 'error',
        'no-use-before-define': 'error',
        'no-undef': 'error',
        'indent': ['error', 4],
        'quotes': ['error', 'single', { 'avoidEscape': true }],
        'semi': ['error', 'always'],
        'no-var': 'error',
        'prefer-const': ['error', { 'destructuring': 'any', 'ignoreReadBeforeAssign': false }],
        '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }], // TypeScript-specific rule
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
        'eol-last': ['error', 'always'],
        'space-infix-ops': ['error', { 'int32Hint': false }],
        'keyword-spacing': ['error', { 'before': true, 'after': true }],
        'space-before-blocks': 'error',
        'space-before-function-paren': ['error', 'always'],
        'block-spacing': ['error', 'always'],
        'object-curly-spacing': ['error', 'always'],
        'array-bracket-spacing': ['error', 'never'],
        'no-trailing-spaces': ['error', { 'skipBlankLines': false, 'ignoreComments': false }],
        'comma-dangle': 'error',
        'vue/no-unused-vars': 'error',
        'vue/multi-word-component-names': 'off',
        'vue/component-name-in-template-casing': ['error', 'kebab-case', {
            'registeredComponentsOnly': false,
            'ignores': []
        }],
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        }]
    }
};
