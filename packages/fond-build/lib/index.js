const sourcemaps = require("rollup-plugin-sourcemaps")
const nodeResolve = require("rollup-plugin-node-resolve")
const commonjs = require("rollup-plugin-commonjs")
const nodeGlobals = require("rollup-plugin-node-globals")
const json = require("rollup-plugin-json")
const builtins = require("rollup-plugin-node-builtins")
const replace = require("rollup-plugin-replace")
const rollup = require("rollup")

let cache

module.exports = function build (name = "fond")
{
  return rollup.rollup({
    entry: "./src/index.js",
    cache,
    plugins: [
      sourcemaps(),
      builtins(),
      nodeResolve({ jsnext: true, main: true, browser: true }),
      commonjs({ ignoreGlobal: true }),
      nodeGlobals(),
      json(),
      replace({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  })
  .then((bundle) =>
  {
    return bundle.write({
      dest: `./dist/${name}.js`,
      format: "umd",
      moduleName: name,
      sourceMap: true,
    })
  })
  .catch((reason) =>
  {
    //eslint-disable-next-line no-console
    console.error(reason)
  })
}
