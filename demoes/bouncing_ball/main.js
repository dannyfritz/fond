const fond = require("../../dist/fond")

const runtime = new fond.Runtime()
const graphics = new fond.Graphics("canvas")

let x = 0

runtime.load = function () {
  console.log(fond)
}

runtime.update = function (dt) {
  // console.log(dt)
  x = x + 5 * dt
}

runtime.draw = function () {
  // console.log(`draw`)
  graphics.clear()
  // graphics.setColor(1, 0, 0, 1)
  graphics.rectangle("fill", x, 10, 20, 30)
}

runtime.run()
