import { Timer } from "./timer"

export class Runtime {

  constructor () {}

  public run ()
  : void
  {
    const timer = new Timer()
    timer.step()
    this.load()
    const loop = () => {
      timer.step()
      requestAnimationFrame(loop)
      this.update(timer.getDelta())
      this.draw()
    }
    requestAnimationFrame(loop)
  }

  public load ()
  : void
  {}

  public update (dt : number)
  : void
  {}

  public draw ()
  : void
  {}

}
