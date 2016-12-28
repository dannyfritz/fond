// IDEA(danny): https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
// TODO(danny): KeyCode Dictionary
export type Code =
  "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight" |
  "KeyW" | "KeyS" | "KeyA" | "KeyD" |
  "Space"

const keyState: { [index: string]: boolean } = {}

export const Keyboard =
{
  addEvents (): void
  {
    document.addEventListener("keydown", Keyboard.keyDownEvent)
    document.addEventListener("keyup", Keyboard.keyUpEvent)
  },
  removeEvents (): void
  {
    document.removeEventListener("keydown", Keyboard.keyDownEvent)
    document.removeEventListener("keyup", Keyboard.keyUpEvent)
  },
  keyDownEvent (event: KeyboardEvent): void
  {
    keyState[event.code] = true
  },
  keyUpEvent (event: KeyboardEvent): void
  {
    keyState[event.code] = false
  },
  isKeyDown (key: Code): boolean
  {
    return !!keyState[key]
  }
}
