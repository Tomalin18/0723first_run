import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // 放寬對 AI 生成代碼常見問題的限制
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-interface": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "react/display-name": "off",
      "react-hooks/exhaustive-deps": "warn",
      "no-console": "warn",
      "prefer-const": "warn",
      
      // 允許使用 require (但仍然建議使用 import)
      "@typescript-eslint/no-require-imports": "warn",
      
      // 對於測試文件的特殊規則
      "no-undef": "off", // Jest globals
    },
    ignores: ["**/node_modules/**", "**/dist/**", "**/.next/**"]
  }
];

export default eslintConfig;
