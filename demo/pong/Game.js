"use strict"

const Ball = require("./Ball")
const Paddle = require("./Paddle")
const SAT = require("sat")
const fond = require("../..")
const { Graphics } = fond

class Game
{
  constructor ()
  {
    this.ball = new Ball()
    this.paddles = [
      new Paddle({ x: 0, y: 40 }, { up: "w", down: "s" }),
      new Paddle({ x: 95, y: 40 }, { up: "ArrowUp", down: "ArrowDown" }),
    ]
  }
  enter ()
  {
    this.graphics = new Graphics()
    this.graphics.addToDom()
    this.graphics.fitWindow()
  }
  leave ()
  {
    this.graphics.removeFromDom()
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
    else if (this.ball.position.y > 100 - this.ball.radius)
    {
      this.ball.wallBounce()
    }
  }
  draw ()
  {
    this.graphics.clear()
    this.graphics.letterBox()
    this.ball.draw(this.graphics)
    this.paddles.forEach((paddle) => paddle.draw(this.graphics))
  }
}

module.exports = Game
