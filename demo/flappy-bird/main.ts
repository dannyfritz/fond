import runtime from "./runtime"
import Game from "./Game"

//eslint-disable-next-line no-console
console.log("Flappy Bird is running.")

runtime.push(new Game())
runtime.run()
