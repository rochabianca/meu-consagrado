import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue, { rules } from "eslint-plugin-vue";


export default [
  {
    files: ["**/*.{js,mjs,cjs,vue}"]
  },
  {
    languageOptions: { globals: globals.browser }
  },
  rules: {
    'vue/no-v-html': 0,
    'vue/no-multiple-template-root': 'off',
    'vue/valid-template-root': 0,
    enforceForLogicalOperands: 0,
    'jest/expect-expect': 'off',
    indent: ['error', 2],
    'no-cond-assign': 0,
    'arrow-parens': 0,
    'no-unused-expressions': 0,
    'no-extra-boolean-cast': 0,
    'generator-star-spacing': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'vue/require-default-prop': 0,
    'vue/attribute-hyphenation': [2, 'always'],
    'vue/return-in-computed-property': [2, { treatUndefinedAsUnspecified: true }],
    'vue/no-dupe-keys': 2,
    'vue/attributes-order': 0,
    camelcase: 0,
    'vue/html-self-closing': [2, {
      html: {
        normal: 'always',
        void: 'always',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }],
    quotes: ['error', 'single', { avoidEscape: true }],
    'vue/html-quotes': ['error', 'double', { avoidEscape: true }],
    'space-before-function-paren': ['error', {
      anonymous: 'always',
      named: 'always',
      asyncArrow: 'always'
    }],
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: false,
      ignores: []
    }],
    semi: ['error', 'never'],
    'no-console': 'error',
    curly: ['error', 'multi-line', 'consistent'],
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1
      },
      multiline: {
        max: 1
      }
    }],
    'vue/multi-word-component-names': 0,
    'vue/require-prop-types': 0,
    'cypress/no-unnecessary-waiting': 0,
    'no-useless-escape': 0
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"]
];