import runtime from "./runtime"
import Game from "./Game"

//eslint-disable-next-line no-console
console.log("Asteroids is running.")

runtime.push(new Game())
runtime.run()
