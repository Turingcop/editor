/* eslint-env node */
module.exports = {
  extends: ["eslint", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser", // add the TypeScript parser
  plugins: [
    "svelte3", "@typescript-eslint" // add the TypeScript plugin
  ],
  overrides: [ // this stays the same
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
    "array-element-newline": [1, { multiline: true }],
    semi: [1, "never"],
    "space-before-blocks": [1, "always"],
    "arrow-spacing": 1,
    "no-console": 0,
    "jsdoc/require-jsdoc": 0,
    "node/no-unpublished-import": 0,
    "comma-dangle": [1, "only-multiline"],
    "node/no-unsupported-features/es-syntax": 0,
    "no-underscore-dangle": 0
  },
  settings: {
    "svelte3/typescript": true,
    node: { tryExtensions: [".js", ".json", ".node", ".ts", ".d.ts"] }
  }
}
