import nodeAssert from "Assert"

const DEBUG = process.env.NODE_ENV === "development"

//eslint-disable-next-line brace-style
let assert = () => {}
if (DEBUG)
{
  assert = nodeAssert
}

//eslint-disable-next-line brace-style
let log = () => {}
if (DEBUG)
{
  // eslint-disable-next-line no-console
  log = console.log
}

// eslint-disable-next-line no-console
const error = () => console.error

export default { assert, error, log, DEBUG }
