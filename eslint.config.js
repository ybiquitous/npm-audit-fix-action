import js from "@eslint/js"; // eslint-disable-line n/no-extraneous-import
import { defineConfig } from "eslint/config";

import nodePlugin from "eslint-plugin-n";
import tsPlugin from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["coverage/**", "dist/**", "tmp/**"],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: "error",
      reportUnusedInlineConfigs: "error",
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    extends: [js.configs.recommended, nodePlugin.configs["flat/recommended-module"]],
    rules: {
      "max-lines-per-function": "warn",
      "max-statements": ["warn", 20],
    },
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
    extends: [tsPlugin.configs.eslintRecommended, tsPlugin.configs.strictTypeChecked],
  },
]);
