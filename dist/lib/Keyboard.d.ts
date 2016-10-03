export declare type KeyCode = "ArrowUp" | "arrowDown" | "arrowLeft" | "arrowRight" | "w" | "s" | "a" | "d" | "space";
export declare class Keyboard {
    private keyState;
    constructor();
    addEvents(): void;
    removeEvents(): void;
    private keyDownEvent(event);
    private keyUpEvent(event);
    isKeyDown(key: KeyCode): boolean;
}
