const sourcemaps = require("rollup-plugin-sourcemaps")
const nodeResolve = require("rollup-plugin-node-resolve")
const commonjs = require("rollup-plugin-commonjs")
const nodeGlobals = require("rollup-plugin-node-globals")
const json = require("rollup-plugin-json")
const builtins = require("rollup-plugin-node-builtins")
const replace = require("rollup-plugin-replace")
const rollup = require("rollup")
const watch = require("rollup-watch")
const log = require("./log")

let cache

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
  log.buildStarted()
  const duration = log.getDuration()
  return rollup.rollup(options)
    .then((bundle) =>
    {
      return bundle.write(options)
    })
    .then(() =>
    {
      log.buildFinished(duration())
    })
    .catch((reason) =>
    {
      log.buildFailed(reason, duration())
    })
}

function watchRollupBundle (options)
{
  try
  {
    const watcher = watch(rollup, options)
    watcher.on("event", (event) =>
    {
      let duration = log.getDuration()
      if (event.code === "STARTING")
      {
        log.watchStarted()
      }
      else if (event.code === "BUILD_START")
      {
        log.buildStarted()
        duration = log.getDuration()
      }
      else if (event.code === "BUILD_END")
      {
        log.buildFinished(duration())
      }
      else if (event.code === "ERROR")
      {
        log.buildFailed(event.error, duration())
      }
      else
      {
        log.unknownEvent(event)
      }
    })
  }
  catch (error)
  {
    log.buildFailed(error)
  }
}

module.exports = function build (name = "fond", isWatching = false)
{
  const options = getOptions(name)
  if (isWatching)
  {
    watchRollupBundle(options)
  }
  else
  {
    getRollupBundle(options)
  }
}
