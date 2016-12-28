import {
  Canvas2d,
  Keyboard,
  Runnable,
} from "../../"
import * as SAT from "sat"
import Background from "./Background"
import Raven from "./Raven"

export default class Game implements Runnable
{
  private canvas2d: Canvas2d
  private background: Background
  private raven: Raven
  private x: number
  enter () : void
  {
    this.canvas2d = new Canvas2d()
    this.canvas2d.resize(500, 500)
    this.canvas2d.addToDom()
    Keyboard.addEvents()
    this.raven = new Raven()
    this.background = new Background()
    this.x = 0
  }
  leave () : void
  {
    this.canvas2d.removeFromDom()
    Keyboard.removeEvents()
  }
  update (dt: number) : void
  {
    this.x += -dt*180
    this.background.setX(this.x)
    this.background.update(dt)
    this.raven.update(dt)
  }
  draw () : void
  {
    const canvas = this.canvas2d
    canvas.clear()
    this.background.draw(canvas)
    this.raven.draw(canvas)
  }
}
