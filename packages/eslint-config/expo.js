import expoConfig from "eslint-config-expo/flat.js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import onlyWarn from "eslint-plugin-only-warn";

/**
 * A custom ESLint configuration for apps that use Expo/React Native.
 *
 * Note: unlike the other shared configs, this does not spread `base.js`.
 * `eslint-config-expo` already bundles its own recommended JS/TS/React
 * configs (RN-tuned), and re-adding `tseslint.configs.recommended` on top
 * causes ESLint to error on redefining the `@typescript-eslint` plugin.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const config = [
  ...expoConfig,
  eslintConfigPrettier,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
