"use strict"

const SAT = require("sat")
const { Audio } = require("../..")
const audio = new Audio()

class Ball
{
  constructor ()
  {
    this.position = { x: 50, y: 50 }
    this.velocity = { x: 40, y: 40 }
    this.radius = 3
  }
  update (dt)
  {
    this.position.x += this.velocity.x * dt
    this.position.y += this.velocity.y * dt
  }
  getShape ()
  {
    const { x, y } = this.position
    return new SAT.Circle(
      new SAT.Vector(x, y),
      this.radius
    )
  }
  paddleBounce ()
  {
    audio.newSource("bounce.wav")
    this.velocity.x *= -1
  }
  wallBounce ()
  {
    audio.newSource("bounce.wav")
    this.velocity.y *= -1
  }
  draw (graphics)
  {
    graphics.circle(this.position, this.radius)
  }
}

module.exports = Ball
