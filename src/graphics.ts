import { createProgram, createShader, SIZEOF } from "./util"
const assert = require("assert")
const fs = require("fs")
const path = require("path")

export type DRAWMODE = "FILL" | "LINE"

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
    this.glInit()
  }

  private glInit ()
  : void
  {
    const gl = this.gl
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
    const vertexShaderSource = fs.readFileSync(path.join(__dirname, "./shader.vs.glsl"), "utf8")
    const fragmentShaderSource = fs.readFileSync(path.join(__dirname, "./shader.fs.glsl"), "utf8")
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    this.program = createProgram(gl, vertexShader, fragmentShader)
    gl.useProgram(this.program)
    gl.clearColor(0, 0, 0, 1)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
    const v_resolution = gl.getUniformLocation(this.program, "v_resolution")
    gl.uniform2f(v_resolution, gl.canvas.width, gl.canvas.height)
  }

  public setClearColor (r : number, g : number, b : number, a : number)
  : void
  {
    this.gl.clearColor(r, g, b, a)
  }

  public clear ()
  : void
  {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
  }

  public setColor (r : number, g : number, b : number, a : number)
  : void
  {
    const gl = this.gl

    const colorUniform = gl.getUniformLocation(this.program, "f_color")
    gl.uniform4f(colorUniform, r, g, b, a)
  }

  public rectangle (mode : DRAWMODE, x : number, y : number, width : number, height : number)
  : void
  {
    const gl = this.gl
    const vertices = [
       x, y,
       x + width, y,
       x + width, y + height,
       x, y + height,
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    const elements = [
      0, 1, 2,
      0, 2, 3,
    ]
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(elements), gl.STATIC_DRAW)
    const v_position = gl.getAttribLocation(this.program, "v_position")
    gl.enableVertexAttribArray(v_position)
    gl.vertexAttribPointer(v_position, 2, gl.FLOAT, false, 0, 0)
    gl.drawElements(gl.TRIANGLES, elements.length, gl.UNSIGNED_BYTE, 0)
  }
}
