import nodeAssert from "Assert"

const DEBUG = process.env.NODE_ENV === "development"

//eslint-disable-next-line brace-style
let assert = () => {}
//eslint-disable-next-line brace-style
let log = () => {}

if (DEBUG)
{
  assert = nodeAssert
  // eslint-disable-next-line no-console
  log = console.log
}

export default { assert, log, DEBUG }
