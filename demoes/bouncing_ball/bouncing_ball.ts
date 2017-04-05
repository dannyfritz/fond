import Fond, { Graphics } from "../../src/fond"
console.log(Fond, Graphics)
const fond = new Fond()
const graphics = new Graphics("canvas")

console.log(Graphics)

fond.update = function (dt : number) {

}

fond.draw = function () {

}

fond.run()


console.log(fond)
