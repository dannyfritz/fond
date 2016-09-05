/* eslint-disable no-console */

const chalk = require("chalk")
const moment : moment.MomentStatic = require("moment")

export function timestamp (time = moment()) : string
{
  return `[${time.format("HH:mm")}]`
}

 export function getDuration ()
{
  const started = moment()
  return function logDurationStarted () : string
  {
    return moment.duration(moment().unix() - started.unix()).humanize()
  }
}

export function watchStarted ()
{
  console.log(chalk.bold.green(`${timestamp()} Fond build getting ready to watch...`))
}

export function buildStarted ()
{
  console.log(chalk.bold.green(`${timestamp()} Fond build started`))
}

export function buildFinished (duration : string)
{
  console.log(chalk.bold.green(`${timestamp()} Fond build finished in ${duration}`))
}

export function buildFailed (reason : Error, duration? : string)
{
  console.error(chalk.bold.red(`${timestamp()} Fond build failed after ${duration}!`))
  console.error(chalk.bold.red(reason))
}

export function unknownEvent (event : any)
{
  console.error(chalk.bold.orange(`${timestamp()} Fond build unhandled exception!`))
  console.error(chalk.bold.orange(event))
}
