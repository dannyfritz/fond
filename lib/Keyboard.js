import Debug from "./debug"
const { assert } = Debug

export const keyEnum = Object.freeze({
  "up": "ArrowUp",
  "down": "ArrowDown",
  "left": "ArrowLeft",
  "right": "ArrowRight",
  "w": "KeyW",
  "s": "KeyS",
  "a": "KeyA",
  "d": "KeyD",
  " ": "Space",
  "space": "Space",
})

export default class Keyboard {
  constructor ()
  {
    this.keyState = {}
    for (const key in keyEnum)
    {
      this.keyState[keyEnum[key]] = false
    }
    this.keyDownEvent = this.keyDownEvent.bind(this)
    this.keyUpEvent = this.keyUpEvent.bind(this)
    this.addEvents()
  }
  addEvents ()
  {
    document.addEventListener("keydown", this.keyDownEvent)
    document.addEventListener("keyup", this.keyUpEvent)
  }
  removeEvent ()
  {
    document.removeEventListener("keydown", this.keyDownEvent)
    document.removeEventListener("keyup", this.keyUpEvent)
  }
  keyDownEvent (event)
  {
    this.keyState[event.code] = true
  }
  keyUpEvent (event)
  {
    this.keyState[event.code] = false
  }
  keyToCode (key)
  {
    assert(keyEnum[key], `${key} is not in keyEnum`)
    return keyEnum[key]
  }
  isKeyDown (key)
  {
    return this.keyState[this.keyToCode(key)]
  }
}
