import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

export default defineConfig([

	globalIgnores([
		'dist/**',
		'dist-ssr/**',
		'coverage/**',
		'themes/**',
		 'vite.config.js',
	]),

	{
		files: ['src/**/*.{js,vue}'],
		languageOptions: {
			globals: {
				...globals.browser,
			},
		},
	},

	js.configs.recommended,
	...pluginVue.configs['flat/essential'],

	{
		rules: {
			// 'no-console': 'warn',
			'vue/no-unused-vars': 'error',
			quotes: ['error', 'single'],
			indent: ['warn', 'tab'],
			semi: ['error', 'always'],
		},
	},
]);
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
