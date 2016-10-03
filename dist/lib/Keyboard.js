// import Debug from "./Debug"
// const { assert } = Debug
"use strict";
class Keyboard {
    constructor() {
        this.keyState = {};
        this.keyDownEvent = this.keyDownEvent.bind(this);
        this.keyUpEvent = this.keyUpEvent.bind(this);
        this.addEvents();
    }
    addEvents() {
        document.addEventListener("keydown", this.keyDownEvent);
        document.addEventListener("keyup", this.keyUpEvent);
    }
    removeEvents() {
        document.removeEventListener("keydown", this.keyDownEvent);
        document.removeEventListener("keyup", this.keyUpEvent);
    }
    keyDownEvent(event) {
        this.keyState[event.key] = true;
    }
    keyUpEvent(event) {
        this.keyState[event.key] = false;
    }
    isKeyDown(key) {
        return !!this.keyState[key];
    }
}
exports.Keyboard = Keyboard;
//# sourceMappingURL=Keyboard.js.map