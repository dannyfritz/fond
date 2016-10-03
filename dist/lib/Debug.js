"use strict";
const nodeAssert = require("assert");
const DEBUG = process.env.NODE_ENV ? process.env.NODE_ENV === "development" : true;
// eslint-disable-next-line no-empty, brace-style
let assert = () => { };
if (DEBUG) {
    assert = nodeAssert;
}
// eslint-disable-next-line no-console
const log = console.log;
// eslint-disable-next-line no-console
const error = console.error;
exports.Debug = { assert, error, log, DEBUG };
//# sourceMappingURL=Debug.js.map