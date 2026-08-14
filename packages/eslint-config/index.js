// @ts-check

import moduleOrderingPlugin from '@script-augur/eslint-plugin-module-ordering'

/**
 * @param {{
 *   tanstackConfig?: import('eslint').Linter.Config[]
 *   convexConfigs?: import('eslint').Linter.Config[]
 *   reactPlugin?: import('eslint').ESLint.Plugin
 *   aliasPattern?: string
 *   ignores?: string[]
 * }} [options]
 * @returns {import('eslint').Linter.Config[]}
 */
export function createScriptAugurEslintConfig(options = {}) {
  const {
    tanstackConfig = [],
    convexConfigs = [],
    reactPlugin,
    aliasPattern = '~/**',
    ignores = [
      '.output/**',
      '.storybook/**',
      '.tanstack/**',
      '.turbo/**',
      'convex/_generated/**',
      'storybook-static/**',
      'dist/**',
      'node_modules/**',
    ],
  } = options

  /** @type {import('eslint').Linter.Config[]} */
  const configs = [
    {
      ignores,
    },
  ]

  if (reactPlugin) {
    configs.push({
      files: ['**/*.{jsx,tsx}'],
      plugins: {
        react: reactPlugin,
      },
      rules: {
        'react/jsx-newline': ['error', { prevent: false }],
      },
    })
  }

  configs.push(...tanstackConfig, ...convexConfigs, {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'module-ordering': moduleOrderingPlugin,
    },
    rules: {
      'module-ordering/module-ordering': 'warn',
      // Packages → alias → relative, with blank lines between groups.
      // Import sorting lives in ESLint (not Prettier) to avoid format/fix fights.
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: aliasPattern,
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  })

  return configs
}

export default createScriptAugurEslintConfig
