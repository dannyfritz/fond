"use strict"

const Ball = require("./Ball")
const Paddle = require("./Paddle")
const SAT = require("sat")
const fond = require("../..")
const { Canvas2d, Keyboard } = fond

class Game
{
  constructor ()
  {
    this.ball = new Ball()
    this.paddles = [
      new Paddle({ x: 0, y: 250 }, { up: "w", down: "s" }),
      new Paddle({ x: 475, y: 250 }, { up: "ArrowUp", down: "ArrowDown" }),
    ]
  }
  enter ()
  {
    this.canvas2d = new Canvas2d()
    this.canvas2d.resize(500, 500)
    this.canvas2d.addToDom()
    Keyboard.addEvents()
  }
  leave ()
  {
    this.canvas2d.removeFromDom()
    Keyboard.removeEvents()
  }
  update (dt)
  {
    this.paddles.forEach((paddle) => paddle.update(dt))
    this.ball.update(dt)
    const ballShape = this.ball.getShape()
    const response = new SAT.Response()
    const collision = this.paddles.some((paddle) =>
    {
      const paddleShape = paddle.getShape()
      response.clear()
      return SAT.testPolygonCircle(paddleShape, ballShape, response)
    })
    if (collision)
    {
      this.ball.position.x += response.overlapV.x
      this.ball.position.y += response.overlapV.y
    }
    if (collision && response.overlapV.y === 0)
    {
      this.ball.paddleBounce()
    }
    else if (collision && response.overlapV.y !== 0)
    {
      this.ball.wallBounce()
    }
    if (this.ball.position.y < 0 + this.ball.radius)
    {
      this.ball.wallBounce()
    }
    else if (this.ball.position.y > 500 - this.ball.radius)
    {
      this.ball.wallBounce()
    }
  }
  draw ()
  {
    this.canvas2d.clear()
    this.ball.draw(this.canvas2d)
    this.paddles.forEach((paddle) => paddle.draw(this.canvas2d))
  }
}

module.exports = Game
