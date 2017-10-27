module.exports = {
  root: true,

  parser: 'babel-eslint',

  extends: [
    "standard",
    "standard-react"
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
    "quotes": "off",
    "semi": [2, "never"],
    "comma-dangle": [2, "always-multiline"],
    "space-infix-ops": 0,
    "max-len": [2, 120, 2],
    "react/jsx-no-bind": [1, {
      "allowArrowFunctions": true
    }],
    "object-curly-spacing": "off",
    "no-class-assign": "off",
    "operator-linebreak": "off",
    "no-octal-escape": "off",
    "no-throw-literal": "off",
    "camelcase": ["error", {"properties": "never"}],
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/valid-expect": "error"
  },
}