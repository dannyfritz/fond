import * as nodeAssert from "assert"

const DEBUG = process.env.NODE_ENV ? process.env.NODE_ENV === "development" : true

// eslint-disable-next-line no-empty, brace-style
let assert: any = () => {}
if (DEBUG)
{
  assert = nodeAssert
}

export const Debug = { assert, DEBUG }
