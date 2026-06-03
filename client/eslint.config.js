import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import react from "eslint-plugin-react";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react,
      import: importPlugin,
    },
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      react.configs.flat.recommended,
    ],
    rules: {
      "react/jsx-no-undef": "error",
      "no-undef": "error",
      "no-unused-vars": "warn",
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        node: true,
      },
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
]);
