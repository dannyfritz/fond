"use strict"

const runtime = require("./runtime")
const Game = require("./Game")

//eslint-disable-next-line no-console
console.log("Fong is running.")

runtime.push(new Game())
runtime.run()
