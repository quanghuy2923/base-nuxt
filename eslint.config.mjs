// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  plugins: ['prettier'],
  rules: {
    '@stylistic/semi': 'off',
    '@stylistic/quotes': 'off',
    '@stylistic/space-before-function-paren': 'off',
    '@stylistic/indent': 'off',
    'prettier/prettier': 'error',
  },
});
