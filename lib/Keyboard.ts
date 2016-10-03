// import Debug from "./Debug"
// const { assert } = Debug

// TODO: KeyCode Dictionary
export type KeyCode =
  "ArrowUp" | "arrowDown" | "arrowLeft" | "arrowRight" |
  "w" | "s" | "a" | "d" |
  "space"

export class Keyboard {
  private keyState: { [index: string]: boolean }
  constructor ()
  {
    this.keyState = {}
    this.keyDownEvent = this.keyDownEvent.bind(this)
    this.keyUpEvent = this.keyUpEvent.bind(this)
    this.addEvents()
  }
  public addEvents (): void
  {
    document.addEventListener("keydown", this.keyDownEvent)
    document.addEventListener("keyup", this.keyUpEvent)
  }
  public removeEvents (): void
  {
    document.removeEventListener("keydown", this.keyDownEvent)
    document.removeEventListener("keyup", this.keyUpEvent)
  }
  private keyDownEvent (event: KeyboardEvent): void
  {
    this.keyState[event.key] = true
  }
  private keyUpEvent (event: KeyboardEvent): void
  {
    this.keyState[event.key] = false
  }
  public isKeyDown (key: KeyCode): boolean
  {
    return !!this.keyState[key]
  }
}
