import Fond, { Graphics } from "../../src/fond"

const fond = new Fond()
const graphics = new Graphics("canvas")

console.log(graphics)

fond.update = function (dt : number) {

}

fond.draw = function () {

}

fond.run()


console.log(fond)
