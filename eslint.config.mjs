import globals from 'globals'
import importPlugin from 'eslint-plugin-import'
import nodePlugin from 'eslint-plugin-n'
import pluginPromise from 'eslint-plugin-promise'
import config from 'eslint-config-standard'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...config.globals,
        ...config.env,
        ...globals.node },
      parserOptions: config.parserOptions
    },
    plugins: {
      standard: config.plugins,
      n: nodePlugin,
      promise: pluginPromise,
      import: importPlugin
    },
    rules: config.rules
  }
]
