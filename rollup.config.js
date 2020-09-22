import path from "path";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import ts from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

const name = `ohbug-extension-rrweb`;

const tsPlugin = ts({
  check: process.env.NODE_ENV === "production",
  tsconfig: path.resolve("tsconfig.json"),
});
const extensions = [".js", ".ts"];
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
};

const configs = {
  esm: {
    format: `es`,
  },
  umd: {
    format: `umd`,
  },
  global: {
    format: `iife`,
  },
  cjs: {
    format: `cjs`,
  },
};

const input = path.resolve("src/index.ts");
const packageFormats = ["esm", "umd", "global", "cjs"];
const external = ["rrweb"];

function createConfig(isProduction = false) {
  const output = packageFormats.map((format) => {
    const target = {
      file: path.resolve(
        `dist/${name}.${format}${isProduction ? ".prod" : ""}.js`
      ),
      format: configs[format].format,
    };
    if (format === "umd" || format === "global") {
      target.name = "OhbugExtensionRrweb";
    }
    return target;
  });
  const plugins = [
    tsPlugin,
    nodeResolve({ extensions }),
    commonjs(commonjsOptions),
  ];
  if (isProduction) {
    plugins.push(terser());
  }
  return {
    input,
    output,
    plugins,
    external,
  };
}

const NODE_ENV = process.env.NODE_ENV;

const packageConfigs = [createConfig()];
if (NODE_ENV === "production") packageConfigs.push(createConfig(true));

export default packageConfigs;
