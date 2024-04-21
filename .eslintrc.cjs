module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'standard',
    'standard-jsx',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:perfectionist/recommended-natural',
    'prettier'
  ],
  ignorePatterns: ['!**/*', 'storybook-static'],
  overrides: [
    {
      extends: ['prettier'],
      files: ['*.json', '*.html', '*.yaml', '*.md'],
      rules: {}
    },
    {
      files: ['**/index.ts'],
      rules: {
        'import/prefer-default-export': 'off'
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
    'jsx-a11y',
    '@typescript-eslint',
    'perfectionist',
    'prettier'
  ],
  root: true,
  rules: {
    'perfectionist/sort-enums': [
      'warn',
      {
        order: 'asc'
      }
    ],
    'perfectionist/sort-exports': [
      'warn',
      {
        order: 'asc'
      }
    ],
    'perfectionist/sort-imports': [
      'warn',
      {
        'custom-groups': {
          type: {
            react: 'react'
          },
          value: {
            react: ['react', 'react-*']
          }
        },
        groups: [
          'type',
          'react',
          'nanostores',
          ['builtin', 'external'],
          'internal-type',
          'internal',
          ['parent-type', 'sibling-type', 'index-type'],
          ['parent', 'sibling', 'index'],
          'side-effect',
          'style',
          'object',
          'unknown'
        ],
        'internal-pattern': [
          '@components/**',
          '@database/**',
          '@app/**',
          '@lib/**'
        ],
        'newlines-between': 'always',
        order: 'asc',
        type: 'natural'
      }
    ],
    'perfectionist/sort-intersection-types': [
      'warn',
      {
        order: 'asc',
        type: 'natural'
      }
    ],
    'perfectionist/sort-jsx-props': [
      'warn',
      {
        'custom-groups': {
          callback: 'on*'
        },
        groups: ['multiline', 'unknown', 'shorthand', 'callback'],
        order: 'asc',
        type: 'natural'
      }
    ],
    'perfectionist/sort-union-types': [
      'warn',
      {
        order: 'asc',
        type: 'natural'
      }
    ],
    'prettier/prettier': 'warn'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
}
