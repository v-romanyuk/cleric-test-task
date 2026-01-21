import { defineConfig, globalIgnores } from 'eslint/config'
import tseslint from 'typescript-eslint'
import astroPlugin from 'eslint-plugin-astro'
import astroParser from 'astro-eslint-parser'
import stylisticEslintPlugin from '@stylistic/eslint-plugin'
import type { Linter } from 'eslint'

const ignores = globalIgnores([
  '**/public/**',
  '**/dist/**',
  '**/node_modules/**',
  '**/.astro/**'
])

const baseRules: Linter.Config = {
  name: 'rules/base',
  files: ['**/*.{js,ts,mts,tsx,astro}'],
  rules: {
    'max-len': ['error', {
      code: 120,
      ignoreComments: true,
      ignoreTrailingComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignorePattern: 'url\\('
    }],
    'no-undef': 'off',
    'no-useless-escape': 'off',
    'no-prototype-builtins': 'off',
    'array-callback-return': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }]
  }
}

const stylisticRules: Linter.Config = {
  name: 'rules/stylistic',
  files: ['**/*.{js,ts,mts,tsx,astro}'],
  plugins: {
    '@stylistic': stylisticEslintPlugin
  },
  rules: {
    '@stylistic/array-bracket-newline': ['error', 'consistent'],
    '@stylistic/array-bracket-spacing': ['error', 'never'],
    '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    '@stylistic/comma-dangle': ['error', 'never'],
    '@stylistic/comma-spacing': ['error', { before: false, after: true }],
    '@stylistic/comma-style': ['error', 'last'],
    '@stylistic/computed-property-spacing': ['error', 'never'],
    '@stylistic/eol-last': ['error', 'always'],
    '@stylistic/function-call-spacing': ['error', 'never'],
    '@stylistic/function-call-argument-newline': ['error', 'consistent'],
    '@stylistic/implicit-arrow-linebreak': ['error', 'beside'],
    '@stylistic/indent': ['error', 2, { SwitchCase: 1 }],
    '@stylistic/jsx-quotes': ['error', 'prefer-double'],
    '@stylistic/key-spacing': ['error', { beforeColon: false, afterColon: true }],
    '@stylistic/keyword-spacing': ['error', { before: true, after: true }],
    '@stylistic/linebreak-style': ['error', 'unix'],
    '@stylistic/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    '@stylistic/newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
    '@stylistic/no-mixed-spaces-and-tabs': ['error'],
    '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    '@stylistic/no-tabs': ['error'],
    '@stylistic/no-trailing-spaces': ['error'],
    '@stylistic/no-whitespace-before-property': ['error'],
    '@stylistic/nonblock-statement-body-position': ['error', 'beside'],
    '@stylistic/object-curly-spacing': ['error', 'always', { objectsInObjects: true }],
    '@stylistic/object-curly-newline': ['error', { consistent: true, multiline: true }],
    '@stylistic/object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    '@stylistic/operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    '@stylistic/padded-blocks': ['error', { blocks: 'never' }],
    '@stylistic/quote-props': ['error', 'as-needed'],
    '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
    '@stylistic/semi': ['error', 'never'],
    '@stylistic/semi-spacing': ['error', { before: false, after: true }],
    '@stylistic/semi-style': ['error', 'last'],
    '@stylistic/space-before-blocks': ['error', 'always'],
    '@stylistic/space-before-function-paren': ['error', 'always'],
    '@stylistic/space-in-parens': ['error', 'never'],
    '@stylistic/space-infix-ops': ['error'],
    '@stylistic/space-unary-ops': ['error', { words: true, nonwords: false }],
    '@stylistic/template-curly-spacing': ['error', 'never'],
    '@stylistic/arrow-spacing': ['error', { before: true, after: true }],
    '@stylistic/rest-spread-spacing': ['error'],
    '@stylistic/no-multi-spaces': ['error'],
    '@stylistic/curly-newline': ['error', { multiline: true, minElements: 3, consistent: true }],
    '@stylistic/type-annotation-spacing': ['error', { before: false, after: true }],
    '@stylistic/member-delimiter-style': ['error', {
      multiline: {
        delimiter: 'none',
        requireLast: false
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false
      }
    }]
  }
}

const tsRules: Linter.RulesRecord = {
  '@typescript-eslint/no-unsafe-function-type': 'off',
  '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
  '@typescript-eslint/no-unnecessary-type-assertion': 'off',
  '@typescript-eslint/no-redundant-type-constituents': 'off',
  '@typescript-eslint/array-type': 'off',
  '@typescript-eslint/no-floating-promises': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/consistent-type-definitions': 'off',
  '@typescript-eslint/consistent-indexed-object-style': 'off',
  '@typescript-eslint/no-duplicate-enum-values': 'off',
  '@typescript-eslint/no-empty-function': ['error', { allow: ['functions', 'arrowFunctions', 'asyncFunctions'] }],
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'interface',
      format: ['PascalCase'],
      prefix: ['I'],
      filter: {
        regex: '^Props$',
        match: false
      }
    },
    {
      selector: 'typeAlias',
      format: ['PascalCase'],
      prefix: ['T']
    },
    {
      selector: 'enum',
      format: ['PascalCase'],
      prefix: ['E']
    }
  ]
}

const typescriptConfig: Linter.Config = {
  name: 'rules/typescript',
  files: ['**/*.{js,ts,mts,tsx}'],
  plugins: {
    '@typescript-eslint': tseslint.plugin
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  rules: tsRules
}

const astroConfig: Linter.Config = {
  name: 'rules/astro',
  files: ['**/*.astro'],
  plugins: {
    '@typescript-eslint': tseslint.plugin
  },
  languageOptions: {
    parser: astroParser,
    parserOptions: {
      parser: tseslint.parser,
      extraFileExtensions: ['.astro']
    }
  },
  rules: tsRules
}

export default defineConfig(
  ignores,
  astroPlugin.configs['flat/recommended'],
  baseRules,
  stylisticRules,
  typescriptConfig,
  astroConfig
)
