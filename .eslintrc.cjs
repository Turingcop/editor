/* eslint-env node */
module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    extraFileExtensions: [".svelte"]
  },
  root: true,
  env: {
    es6: true,
    browser: true
  },
  plugins: ["svelte3"],
  extends: ["eslint", "eslint:recommended"],
  overrides: [
    {
      files: ["*.svelte"],
      processor: "svelte3/svelte3"
    }
  ],
  rules: {
    indent: [1, 2],
    "prefer-const": [1, { destructuring: "any" }],
    "no-trailing-spaces": 1,
    camelcase: [1, { properties: "always" }],
    "object-curly-newline": [1, { multiline: true }],
    "object-curly-spacing": [1, "always"],
    "key-spacing": [1, { beforeColon: false }],
    "comma-spacing": [1, { before: false, after: true }],
    "object-property-newline": [1, { allowAllPropertiesOnSameLine: true }],
    semi: [1, "never"],
    "space-before-blocks": [1, "always"],
    "arrow-spacing": 1,
    "no-console": 0,
    "jsdoc/require-jsdoc": 0,
    "node/no-unpublished-import": 0,
    "comma-dangle": [1, "only-multiline"],
  },
  settings: { "svelte3/ignore-styles": () => false }
}
