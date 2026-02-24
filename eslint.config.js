import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,mjs,jsx}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
 // Custom rules
  {
    rules: {
      'no-console': 'warn', // Warns when console.log is used
      'vue/no-unused-vars': 'error', // Errors for unused variables in Vue
      'quotes': ['error', 'single'], // Enforce single quotes
      // Add other rules as needed
    },
  },
])

//indent: Enforce consistent indentation (e.g., spaces vs. tabs).
//quotes: Enforce the use of single or double quotes for strings.
//semi: Require or disallow semicolons at the end of statements.
//max-len: Enforce a maximum line length.
//camelcase: Enforce camelCase naming convention.
//no-undef: Disallow the use of undeclared variables.
//vue/no-unused-vars: Disallow unused variables in Vue components.
//no-magic-numbers: Disallow magic numbers, encouraging named constants instead.
//no-multi-spaces: Disallow multiple spaces.
//no-duplicate-imports: Disallow duplicate imports in a module.

