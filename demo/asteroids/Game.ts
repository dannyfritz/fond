import {
  Canvas2d, HslaColor, DrawMode, Transform,
  Vector2d,
  Controllers,
  Runnable
} from "../.."
import Asteroid from "./Asteroid"
import Ship from "./Ship"
import Bullet from "./Bullet"
const SAT = require("sat")

export interface Runnable {
  update (dt: number): void
  draw (canvas: Canvas2d): void
}

const black = new HslaColor(0, 0, 0, 1.0)

function randomInScreen () : number
{
  return Math.random() * 500
}

export default class Game implements Runnable
{
  private canvas2d: Canvas2d
  private asteroids: Asteroid[]
  private ship: Ship
  private bullets: Bullet[]
  enter () : void
  {
    this.canvas2d = new Canvas2d()
    this.canvas2d.resize(500, 500)
    this.canvas2d.addToDom()
    this.asteroids = []
    this.asteroids.push(new Asteroid(randomInScreen(), randomInScreen()))
    this.asteroids.push(new Asteroid(randomInScreen(), randomInScreen()))
    this.asteroids.push(new Asteroid(randomInScreen(), randomInScreen()))
    this.asteroids.push(new Asteroid(randomInScreen(), randomInScreen()))
    this.asteroids.push(new Asteroid(randomInScreen(), randomInScreen()))
    this.asteroids.push(new Asteroid(randomInScreen(), randomInScreen()))
    this.asteroids.push(new Asteroid(randomInScreen(), randomInScreen()))
    this.ship = new Ship()
    this.bullets = []
  }
  leave () : void
  {
    this.canvas2d.removeFromDom()
  }
  update (dt: number) : void
  {
    Controllers.update()
    this.ship.update(dt)
    this.ship.getRunnables()
      .forEach((runnable) =>
        {
          if (runnable instanceof Bullet)
          {
            this.bullets.push(runnable)
          }
        }
      )
    this.asteroids.forEach((asteroid) => asteroid.update(dt))
    this.bullets.forEach((bullet) => bullet.update(dt))
  }
  draw () : void
  {
    const canvas = this.canvas2d
    canvas.clear()
    canvas.push()
    this.drawScene()
    this.translateDraw({ x: -500, y: -500})
    this.translateDraw({ x: 0, y: -500})
    this.translateDraw({ x: 500, y: -500})
    this.translateDraw({ x: 500, y: 0})
    this.translateDraw({ x: 500, y: 500})
    this.translateDraw({ x: 0, y: 500})
    this.translateDraw({ x: -500, y: 500})
    this.translateDraw({ x: -500, y: 0})
    this.canvas2d.pop()
  }
  private translateDraw (distance: Vector2d) : void
  {
    const transform = new Transform()
    transform.translate(distance)
    this.canvas2d.push()
    this.canvas2d.transform(transform)
    this.drawScene()
    this.canvas2d.pop()
  }
  private drawScene () : void
  {
    this.drawSpace()
    this.asteroids.forEach((asteroid) => asteroid.draw(this.canvas2d))
    this.ship.draw(this.canvas2d)
    this.bullets.forEach((bullet) => bullet.draw(this.canvas2d))
  }
  private drawSpace () : void
  {
    this.canvas2d.push()
    const width = this.canvas2d.getWidth()
    const height = this.canvas2d.getHeight()
    this.canvas2d.setFillStyle(black)
    this.canvas2d.drawPolygon(DrawMode.fill, [
      {x: 0, y: 0},
      {x: width, y: 0},
      {x: width, y: height},
      {x: 0, y: height}
    ])
    this.canvas2d.pop()
  }
}
