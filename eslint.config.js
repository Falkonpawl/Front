import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import prettier from "eslint-config-prettier"
import { globalIgnores } from "eslint/config"

export default tseslint.config(
  ...[
    // Глобальные игноры
    globalIgnores(["dist", "node_modules"]),

    // Основная конфигурация для TypeScript/JS файлов
    {
      files: ["**/*.{ts,tsx,js,jsx}"],
      extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        reactHooks.configs["recommended-latest"],
        reactRefresh.configs.vite,
        "plugin:prettier/recommended", // Должен быть последним!
      ],
      plugins: {
        "react-hooks": reactHooks,
        "react-refresh": reactRefresh,
      },
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        globals: {
          ...globals.browser,
          ...globals.node,
        },
      },
      rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react-refresh/only-export-components": [
          "warn",
          { allowConstantExport: true },
        ],
        "@typescript-eslint/no-unused-vars": "warn",
        "prettier/prettier": "error",
      },
      settings: {
        react: {
          version: "detect",
        },
      },
    },
  ]
)
