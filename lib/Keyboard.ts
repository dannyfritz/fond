import Debug from "./Debug"
const { assert } = Debug

export type KeyCode =
  "up" | "down" | "left" | "right" |
  "w" | "s" | "a" | "d" |
  "space"

export default class Keyboard {
  //TODO: KeyCode Dictionary
  private keyState : { [index: string] : boolean }
  constructor ()
  {
    this.keyState = {}
    this.keyDownEvent = this.keyDownEvent.bind(this)
    this.keyUpEvent = this.keyUpEvent.bind(this)
    this.addEvents()
  }
  addEvents () : void
  {
    document.addEventListener("keydown", this.keyDownEvent)
    document.addEventListener("keyup", this.keyUpEvent)
  }
  removeEvents () : void
  {
    document.removeEventListener("keydown", this.keyDownEvent)
    document.removeEventListener("keyup", this.keyUpEvent)
  }
  keyDownEvent (event : KeyboardEvent) : void
  {
    this.keyState[event.key] = true
  }
  keyUpEvent (event : KeyboardEvent) : void
  {
    this.keyState[event.key] = false
  }
  isKeyDown (key : KeyCode) : boolean
  {
    return !!this.keyState[key]
  }
}
