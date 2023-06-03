const pluginSortImports = require('@trivago/prettier-plugin-sort-imports')
const pluginTailwindcss = require('prettier-plugin-tailwindcss')

/**
 * @refs  https://github.com/tailwindlabs/prettier-plugin-tailwindcss/issues/31#issuecomment-1195411734
 */
/** @type {import("prettier").Parser}  */
const bothParser = {
  ...pluginSortImports.parsers.typescript,
  parse: pluginTailwindcss.parsers.typescript.parse,
}

/** @type {import("prettier").Plugin}  */
const mixedPlugin = {
  parsers: {
    typescript: bothParser,
  },
}

module.exports = {
  plugins: [mixedPlugin],
  semi: true,
  singleQuote: false,
  printWidth: 140,
  importOrder: ['(^react$|^react/(.*)$)', '(^next$|^next/(.*)$)', '<THIRD_PARTY_MODULES>', '^~/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
