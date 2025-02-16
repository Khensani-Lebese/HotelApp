export const env = {
  es6: true,
  node: true,
};
export const parserOptions = {
  ecmaVersion: 2018,
};
export const extensions = ["eslint:recommended", "google"];
export const rules = {
  "no-restricted-globals": ["error", "name", "length"],
  "prefer-arrow-callback": "error",
  "no-undef": "off", // Disable "undefined" errors
  "no-unused-vars": "warn",
  quotes: ["error", "double", { allowTemplateLiterals: true }],
};
export const overrides = [
  {
    files: ["**/*.spec.*"],
    env: {
      mocha: true,
    },
    rules: {},
  },
];
export const globals = {};
