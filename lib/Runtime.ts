import { Timer } from "./Timer"
import { Moody } from "moody"

export interface Runnable
{
  update (dt: number) : void
  draw () : void
}

export class Runtime
{
  private timer: Timer
  private moody: Moody
  constructor ()
  {
    this.timer = new Timer()
    this.moody = new Moody()
  }
  public run ()
  {
    this.timer.update()
    this.moody.execute("update", this.timer.dt)
    this.moody.execute("draw")
    requestAnimationFrame(() => this.run())
  }
  public push (newState: Runnable, ...args: any[])
  {
    return this.moody.push(newState, ...args)
  }
  public pop ()
  {
    return this.moody.pop()
  }
  public swap (newState: Runnable, ...args: any[])
  {
    return this.moody.swap(newState, ...args)
  }
}
