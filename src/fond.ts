import { createProgram, createShader } from "./util"
const assert = require("assert")
const fs = require("fs")
const path = require("path")

export class Timer
{
  private start : number
  private lastTime : number
  private currentTime : number
  constructor ()
  {
    this.start = performance.now()
  }
  public step ()
  : void
  {
    this.lastTime = this.currentTime
    this.currentTime = performance.now()
  }
  public getDelta ()
  : number
  {
    return this.currentTime - this.lastTime
  }
  public getTime ()
  : number
  {
    return this.currentTime - this.start
  }
}

export class Graphics {
  private canvas : HTMLCanvasElement
  private gl : WebGL2RenderingContext
  private program : WebGLProgram
  constructor (selector : string)
  {
    const canvas : Element = document.querySelector(selector)
    assert(canvas, `No element found for given selector ${selector}.`)
    assert(canvas.nodeName === `CANVAS`, `Expected canvas element. Found ${canvas.nodeName} instead.`)
    this.canvas = canvas as HTMLCanvasElement
    this.gl = this.canvas.getContext("webgl2")
    const vertexShaderSource = fs.readFileSync(path.join(__dirname, "./shader.vs.glsl"), "utf8")
    const fragmentShaderSource = fs.readFileSync(path.join(__dirname, "./shader.fs.glsl"), "utf8")
    const vertexShader = createShader(this.gl, this.gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(this.gl, this.gl.FRAGMENT_SHADER, fragmentShaderSource)
    this.program = createProgram(this.gl, vertexShader, fragmentShader)
  }
  public clear ()
  : void
  {

  }
  public rectangle ()
  : void
  {

  }
}

export default class Fond {
  constructor () {}
  public run ()
  : void
  {
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
  public load ()
  : void
  {}
  public update (dt : number)
  : void
  {}
  public draw ()
  : void
  {}
}
