import { assert } from "chai"
import { createProgram } from "./util"

export class Timer {
  private start : number
  private lastTime : number
  private currentTime : number
  constructor () {
    this.start = performance.now()
  }
  public step () {
    this.lastTime = this.currentTime
    this.currentTime = performance.now()
  }
  public getDelta () : number {
    return this.currentTime - this.lastTime
  }
  public getTime () : number {
    return this.currentTime - this.start
  }
}

export class Graphics {
  private canvas : HTMLCanvasElement
  private context : WebGL2RenderingContext
  private program : WebGLProgram
  constructor (selector : string) {
    const canvas : Element = document.querySelector(selector)
    assert(canvas, `No element found for given selector ${selector}.`)
    assert(canvas.nodeName === `CANVAS`, `Expected canvas element. Found ${canvas.nodeName} instead.`)
    this.canvas = canvas as HTMLCanvasElement
    this.context = this.canvas.getContext("webgl2")
    //FIXME (danny): Need to make sure shaders are bundled correctly, can't rely on fetch
    // this.program = createProgram(this.context, require("./shader.vs.glsl"), require("./shader.fs.glsl"))
  }
  public clear () {

  }
}

export default class Fond {
  constructor () {}
  public run () : void {
    const timer = new Timer()
    timer.step()
    this.load()
    const loop = () => {
      timer.step()
      requestAnimationFrame(loop)
      this.update(timer.getDelta())
      this.draw()
    }
    requestAnimationFrame(loop)
  }
  public load () : void {}
  public update (dt : number) : void {}
  public draw () : void {}
}
