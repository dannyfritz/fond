// IDEA(danny): https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
// TODO(danny): KeyCode Dictionary
export type KeyCode =
  "ArrowUp" | "arrowDown" | "arrowLeft" | "arrowRight" |
  "w" | "s" | "a" | "d" |
  "space"

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
    keyState[event.key] = true
  },
  keyUpEvent (event: KeyboardEvent): void
  {
    keyState[event.key] = false
  },
  isKeyDown (key: KeyCode): boolean
  {
    return !!keyState[key]
  }
}
