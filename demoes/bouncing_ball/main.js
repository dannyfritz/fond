const fond = require("../../dist/fond")

const runtime = new fond.Runtime()
const graphics = new fond.Graphics("canvas")

let x = 50
let y = 50
let vx = 80
let vy = 40
const r = 20

runtime.load = function () {
  console.log(fond)
}

runtime.update = function (dt) {
  x = x + vx * dt
  y = y + vy * dt
  if (y > 150 - r) {
    vy = -vy
  } else if (y < 0 + r) {
    vy = -vy
  }
  if (x > 300 - r) {
    vx = -vx
  } else if (x < 0 + r) {
    vx = -vx
  }
}

runtime.draw = function () {
  graphics.clear()
  graphics.push()
  graphics.translate(x, y)
  // graphics.rotate(0.1 * x)
  // graphics.translate(-10, -10)
  // graphics.setColor({ r:Math.sin(x / 13), g:Math.cos(x / 5) + 0.5, b:Math.tan(x/17), a:1 })
  graphics.setColor({r: 1, g: 0, b: 0, a: 1})
  graphics.circle("fill", 0, 0, r)
  graphics.pop()
}

runtime.run()
