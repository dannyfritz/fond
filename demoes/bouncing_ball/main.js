const fond = require("../../dist/fond")

const runtime = new fond.Runtime()
const graphics = new fond.Graphics("canvas")

let x = 0

runtime.load = function () {
  console.log(fond)
}

runtime.update = function (dt) {
  // console.log(dt)
  x = x + 10 * dt
}

runtime.draw = function () {
  graphics.clear()
  graphics.push()
  graphics.translate(x, 20)
  graphics.rotate(0.1 * x)
  graphics.translate(-10, -10)
  graphics.setColor({ r:1, g:0, b:0, a:1 })
  graphics.rectangle("fill", 0, 0, 20, 20)
  graphics.pop()
}

runtime.run()
