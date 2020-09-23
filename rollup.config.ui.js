import path from 'path'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'

const name = `ohbug-extension-ui-rrweb`

const tsPlugin = ts({
  check: process.env.NODE_ENV === 'production',
  tsconfig: path.resolve(__dirname, 'ui/tsconfig.json'),
})
const extensions = ['.js', '.ts']
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
}

const configs = {
  umd: {
    format: `umd`,
  },
}

const input = path.resolve(__dirname, 'ui/component.tsx')
const packageFormats = ['umd']
const external = ['react']

function createConfig(isProduction = false) {
  const output = packageFormats.map((format) => {
    const target = {
      file: path.resolve(`dist/${name}.${format}${isProduction ? '.prod' : ''}.js`),
      format: configs[format].format,
    }
    if (format === 'umd') {
      target.name = 'OhbugExtensionUIRrweb'
    }
    return target
  })
  const plugins = [
    tsPlugin,
    nodeResolve({ extensions }),
    commonjs(commonjsOptions),
    postcss({
      plugins: [],
    }),
  ]
  if (isProduction) {
    plugins.push(terser())
  }
  return {
    input,
    output,
    plugins,
    external,
  }
}

const NODE_ENV = process.env.NODE_ENV

const packageConfigs = [createConfig()]
if (NODE_ENV === 'production') packageConfigs.push(createConfig(true))
export default packageConfigs
