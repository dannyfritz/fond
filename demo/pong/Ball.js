"use strict"

const SAT = require("sat")
const { Audio, Transform } = require("../..")
const audio = new Audio()

class Ball
{
  constructor ()
  {
    this.position = { x: 250, y: 250 }
    if (Math.random() < 0.5)
    {
      this.velocity = { x: 40, y: 40 }
    }
    else
    {
      this.velocity = { x: -40, y: 40 }
    }
    this.radius = 15
    this.speed = 5
  }
  update (dt)
  {
    this.position.x += this.velocity.x * this.speed * dt
    this.position.y += this.velocity.y * this.speed * dt
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
  draw (canvas)
  {
    canvas.push()
    const transform = new Transform()
    transform.translate(this.position)
    canvas.transform(transform)
    canvas.drawCircle(0, this.radius)
    canvas.pop()
  }
}

module.exports = Ball
