module.exports = {
  extends: ['stylelint-config-sass-guidelines', 'stylelint-config-idiomatic-order'],
  plugins: [
    'stylelint-scss',
  ],
  customSyntax: 'postcss-scss',
  rules: {
    'order/properties-alphabetical-order': null,
  },
};
