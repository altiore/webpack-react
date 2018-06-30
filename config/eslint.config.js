module.exports = {
  root: true,

  parser: 'babel-eslint',

  extends: [
    "standard",
    "standard-react",
    "prettier"
  ],

  plugins: ['import', 'flowtype', 'jsx-a11y', 'react', 'jest'],

  env: {
    browser: true,
    "jest/globals": true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true,
    },
  },

  rules: {
    "space-before-function-paren": [2, {"anonymous": "always", "named": "never", "asyncArrow": "always"}]
  },
}