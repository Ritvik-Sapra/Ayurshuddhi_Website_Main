import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

/** Keeps the frontend / backend / shared split honest (see CLAUDE.md, section 10). */
const boundary = (groups, message) => ({
  "no-restricted-imports": ["error", { patterns: [{ group: groups, message }] }],
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/frontend/**/*.{ts,tsx}"],
    rules: boundary(
      ["@/backend/*", "@/app/*"],
      "Frontend code must not import backend or app code. Call the API routes instead.",
    ),
  },
  {
    files: ["src/backend/**/*.{ts,tsx}"],
    rules: boundary(
      ["@/frontend/*", "@/app/*"],
      "Backend code must not import frontend or app code.",
    ),
  },
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: boundary(
      ["@/frontend/*", "@/backend/*", "@/app/*"],
      "Shared code (schemas, constants) must stay free of frontend, backend and app imports.",
    ),
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "test-results/**",
    "playwright-report/**",
  ]),
]);

export default eslintConfig;
