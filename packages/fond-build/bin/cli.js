#!/usr/bin/env node

/* eslint-disable no-console */

const meow = require("meow")
const build = require("../lib")

const cli = meow(`
    Usage
      $ fond-build <name> [--development] [--watch]

    Options
      -d, --development  set process.env.NODE_ENV to "development"
      -w, --watch        create a new build on save

    Examples
      $ fond-build myGame\n`,
  {
    alias: {
      d: "development",
      w: "watch",
    },
  }
)

const development = cli.flags.development
process.env.NODE_ENV = development ? "development" : process.env.NODE_ENV

build(cli.input[0], cli.flags.watch)
