/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('../.eslintrc.cjs')

module.exports = {
  ...base,
  rules: {
    ...base.rules,
    'import/no-unresolved': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
}
