"use strict"

const { Keyboard } = require("../..")
const SAT = require("sat")

class Paddle
{
  constructor (position, controls)
  {
    this.position = position
    this.controls = controls
    this.size = { height: 100, width: 25 }
    this.speed = 250
  }
  update (dt)
  {
    if (Keyboard.isKeyDown(this.controls.up))
    {
      this.position.y -= dt * this.speed
    }
    if (Keyboard.isKeyDown(this.controls.down))
    {
      this.position.y += dt * this.speed
    }
    this.position.y = Math.max(0, this.position.y)
    this.position.y = Math.min(500 - this.size.height, this.position.y)
  }
  getShape ()
  {
    const { x, y } = this.position
    const { width, height } = this.size
    return new SAT.Polygon(
      new SAT.Vector(),
      [
        new SAT.Vector(x, y),
        new SAT.Vector(x + width, y),
        new SAT.Vector(x + width, y + height),
        new SAT.Vector(x, y + height),
      ]
    )
  }
  draw (canvas)
  {
    canvas.drawPolygon(0, this.getShape().points)
  }
}

module.exports = Paddle
