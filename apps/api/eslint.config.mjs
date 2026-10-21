import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import tseslint from "typescript-eslint";
import globals from "globals";

export default defineConfig([
  // Ignore generated and compiled files
  globalIgnores([
    "dist/**",
    "src/generated/prisma/**",
  ]),
  // Backend TypeScript linting rules
  {
    files: ["src/**/*.ts"],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],

    languageOptions: {
      globals: globals.node,
    },
  },
]);
