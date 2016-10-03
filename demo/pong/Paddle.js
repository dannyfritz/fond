"use strict"

const fond = require("../..")
const SAT = require("sat")
const { Keyboard } = fond
const keyboard = new Keyboard

class Paddle
{
  constructor (position, controls)
  {
    this.position = position
    this.controls = controls
    this.size = { height: 20, width: 5 }
    this.speed = 50
  }
  update (dt)
  {
    if (keyboard.isKeyDown(this.controls.up))
    {
      this.position.y -= dt * this.speed
    }
    if (keyboard.isKeyDown(this.controls.down))
    {
      this.position.y += dt * this.speed
    }
    this.position.y = Math.max(0, this.position.y)
    this.position.y = Math.min(100 - this.size.height, this.position.y)
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
  draw (graphics)
  {
    graphics.polygon(this.getShape().points)
  }
}

module.exports = Paddle
