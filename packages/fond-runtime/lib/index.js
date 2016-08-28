import Timer from "fond-timer"
import newMoody from "moody"

export default class Runtime {
  constructor ()
  {
    this.timer = new Timer()
    this.moody = newMoody()
  }
  run ()
  {
    this.timer.update()
    this.moody.execute("update", this.timer.dt)
    this.moody.execute("draw")
    requestAnimationFrame(() => this.run())
  }
  push (newState, ...args)
  {
    return this.moody.push(newState, args)
  }
  pop ()
  {
    return this.moody.pop()
  }
  swap (newState, ...args)
  {
    return this.moody.switch(newState, args)
  }
}
