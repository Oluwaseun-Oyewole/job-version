import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "./app/generated",
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off", // Disable unused variables rule
      "no-unused-vars": "off", // Also disable the base rule
    },
  },
];

export default eslintConfig;
