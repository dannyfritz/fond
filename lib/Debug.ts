import * as nodeAssert from "assert"

const DEBUG = process.env.NODE_ENV === "development"

//eslint-disable-next-line brace-style
let assert : any = () => {}
if (DEBUG)
{
  assert = nodeAssert
}

const log = console.log

const error = console.error

export default { assert, error, log, DEBUG }
