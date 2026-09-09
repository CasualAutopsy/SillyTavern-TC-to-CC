import { defineConfig } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default defineConfig([
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { files: ['**/*.{js,mjs,cjs,ts}'], languageOptions: { globals: globals.browser } },
    { files: ['**/*.{js,mjs,cjs,ts}'], plugins: { js }, extends: ['js/recommended'] },
    {
        ignores: ['**/dist/**', '**/node_modules/**'],
    },
    tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                SillyTavern: 'readonly',

                jQuery: 'readonly',
                $: 'readonly',

                toastr: 'readonly',
            },
        },
    },
]);
