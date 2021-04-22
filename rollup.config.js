import path from 'path'
import { createConfig, createMinifiedConfig } from './rollup.config.base'

const name = `index`
const pkg = require('./package.json')
const extensionName = pkg.ohbug.name
const input = path.resolve('src/index.ts')
const packageFormats = {
  umd: {
    file: path.resolve(`dist/${name}.umd.js`),
    format: `umd`,
    name: extensionName,
    globals: {
      rrweb: 'rrweb',
    },
  },
  esm: {
    file: path.resolve(`dist/${name}.esm.js`),
    format: `es`,
  },
  cjs: {
    file: path.resolve(`dist/${name}.cjs.js`),
    format: `cjs`,
  },
}
const external = ['rrweb']

const packageConfigs = Object.keys(packageFormats).map((format) =>
  createConfig(input, packageFormats[format], [], external)
)
if (process.env.NODE_ENV === 'production') {
  Object.keys(packageFormats).forEach((format) => {
    if (format === 'umd' || format === 'esm') {
      packageConfigs.push(
        createMinifiedConfig(input, packageFormats[format], [], external)
      )
    }
  })
}

export default packageConfigs
