const fond = require("../../dist/fond")
console.log(fond)

const runtime = new fond.Runtime()
const graphics = new fond.Graphics("canvas")

runtime.update = function (dt) {
  console.log(dt)
}

runtime.draw = function () {
  console.log(`draw`)
}

runtime.run()
