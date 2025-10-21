// eslint.config.mjs
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    ignores: ["node_modules/", "build/", ".docusaurus/", "static/", "dist/"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        React: "readonly",
        window: "readonly",
        document: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    ignores: ["node_modules/", "build/", ".docusaurus/", "static/", "dist/"],
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
      },
    },
    rules: {
      "no-console": "off",
    },
  },
];
