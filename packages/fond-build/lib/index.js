/* eslint-disable no-console */

const sourcemaps = require("rollup-plugin-sourcemaps")
const nodeResolve = require("rollup-plugin-node-resolve")
const commonjs = require("rollup-plugin-commonjs")
const nodeGlobals = require("rollup-plugin-node-globals")
const json = require("rollup-plugin-json")
const builtins = require("rollup-plugin-node-builtins")
const replace = require("rollup-plugin-replace")
const rollup = require("rollup")
const watch = require("rollup-watch")
const chalk = require("chalk")
const moment = require("moment")

let cache

function timestamp ()
{
  return moment().format("HH:mm")
}

function getOptions (name)
{
  return {
    entry: "./src/index.js",
    dest: `./dist/${name}.js`,
    format: "umd",
    moduleName: name,
    sourceMap: true,
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
  }
}

function getRollupBundle (options)
{
  console.log(chalk.bold.green(`[${timestamp()}] Fond build started`))
  const started = moment()
  return rollup.rollup(options)
    .then((bundle) =>
    {
      return bundle.write(options)
    })
    .then(() =>
    {
      const duration = moment.duration(moment() - started).humanize()
      console.log(chalk.bold.green(`[${timestamp()}] Fond build finished in ${duration}`))
    })
    .catch((reason) =>
    {
      console.error(chalk.bold.red(`[${timestamp()}] Fond build failed!`))
      console.error(chalk.bold.red(reason))
    })
}

module.exports = function build (name = "fond", isWatching = false)
{
  const options = getOptions(name)
  if (isWatching)
  {
    try
    {
      const watcher = watch(rollup, options)
      watcher.on("event", (event) =>
      {
        if (event.code === "STARTING")
        {
          console.log(chalk.bold.green(`[${timestamp()}] Fond build getting ready to watch...`))
        }
        else if (event.code === "BUILD_START")
        {
          console.log(chalk.bold.green(`[${timestamp()}] Fond build started`))
        }
        else if (event.code === "BUILD_END")
        {
          const duration = moment.duration(event.duration).humanize()
          console.log(chalk.bold.green(`[${timestamp()}] Fond build finished in ${duration}`))
        }
        else if (event.code === "ERROR")
        {
          console.error(chalk.bold.red(`[${timestamp()}] Fond build failed!`))
          console.error(chalk.bold.red(event.error))
        }
        else
        {
          console.error(chalk.bold.orange(`[${timestamp()}] Fond build unhandled exception!`))
          console.error(chalk.bold.orange(event))
        }
      })
    }
    catch (error)
    {
      console.error(error)
    }
  }
  else
  {
    return getRollupBundle(options)
  }
}
