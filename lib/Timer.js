import Debug from "./Debug"
const { assert } = Debug

export default class Timer {
  constructor ()
  {
    this.startDate = new Date()
    this.lastDate = this.startDate
    this.dt = 0
  }
  update ()
  {
    const now = new Date()
    this.dt = (now.getTime() - this.lastDate.getTime()) / 1000 || .001
    assert(this.dt > 0, `dt was ${this.dt} and cannot be <= 0`)
    this.lastDate = now
  }
}
