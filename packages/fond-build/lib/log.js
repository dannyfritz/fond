/* eslint-disable no-console */

const chalk = require("chalk")
const moment = require("moment")

function timestamp (time)
{
  time = time || moment()
  return `[${time.format("HH:mm")}]`
}

function getDuration ()
{
  const started = moment()
  return function logDurationStarted ()
  {
    return moment.duration(moment() - started).humanize()
  }
}

function watchStarted ()
{
  console.log(chalk.bold.green(`${timestamp()} Fond build getting ready to watch...`))
}

function buildStarted ()
{
  console.log(chalk.bold.green(`${timestamp()} Fond build started`))
}

function buildFinished (duration)
{
  console.log(chalk.bold.green(`${timestamp()} Fond build finished in ${duration}`))
}

function buildFailed (reason, duration)
{
  console.error(chalk.bold.red(`${timestamp()} Fond build failed after ${duration}!`))
  console.error(chalk.bold.red(reason))
}

function unknownEvent (event)
{
  console.error(chalk.bold.orange(`${timestamp()} Fond build unhandled exception!`))
  console.error(chalk.bold.orange(event))
}

module.exports = {
  getDuration,
  buildStarted,
  buildFinished,
  buildFailed,
  watchStarted,
  unknownEvent,
}
