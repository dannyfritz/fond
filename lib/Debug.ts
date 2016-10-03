import * as nodeAssert from "assert"

const DEBUG = process.env.NODE_ENV ? process.env.NODE_ENV === "development" : true

// eslint-disable-next-line no-empty, brace-style
let assert: any = () => {}
if (DEBUG)
{
  assert = nodeAssert
}

// eslint-disable-next-line no-console
const log = console.log

// eslint-disable-next-line no-console
const error = console.error

export const Debug = { assert, error, log, DEBUG }
