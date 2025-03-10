// @ts-check
import { dirname } from "path";
import { fileURLToPath } from "url";
import nextPlugin from "@next/eslint-plugin-next";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    ignores: ["node_modules", ".next", "out"]
  },
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tsPlugin,
      "@next/next": nextPlugin
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json"
      }
    },
    rules: {
      // Your rules here if needed
    }
  }
];
