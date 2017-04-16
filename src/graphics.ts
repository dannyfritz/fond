import { createProgram, createShader, SIZEOF } from "./util"
import { Texture } from "./image"
import * as glMatrix from "gl-matrix"
const { mat4 } = glMatrix
const assert = require("assert")
const fs = require("fs")
const path = require("path")

export type DRAWMODE = "FILL" | "LINE"

export type color = {
  r: number,
  g: number,
  b: number,
  a: number,
}

export class Graphics {

  private canvas : HTMLCanvasElement
  private gl : WebGL2RenderingContext
  private program : WebGLProgram
  private transformStack : glMatrix.mat4[]
  private v_position : number
  private v_texcoord : number
  private lastTexture : Texture

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
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 1)
    gl.bindTexture(gl.TEXTURE_2D, gl.createTexture())
    gl.activeTexture(gl.TEXTURE0)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
    this.v_position = gl.getAttribLocation(this.program, "v_position")
    gl.enableVertexAttribArray(this.v_position)
    this.v_texcoord = gl.getAttribLocation(this.program, "v_texcoord")
    gl.enableVertexAttribArray(this.v_texcoord)
    gl.uniform1i(gl.getUniformLocation(this.program, "tex0"), 0)
    const u_projectionMatrix = gl.getUniformLocation(this.program, "u_projectionMatrix")
    const projection = mat4.ortho(
      mat4.create(),
      0, gl.canvas.clientWidth,
      gl.canvas.clientHeight, 0,
      -400, 400
    )
    gl.uniformMatrix4fv(u_projectionMatrix, false, projection)
    this.origin()
    this.setColor({r: 1, g: 1, b: 1, a: 1})
  }

  private getTransform ()
  : glMatrix.mat4
  {
    return this.transformStack[this.transformStack.length - 1]
  }

  private setTransform ()
  : void
  {
    const gl = this.gl
    const current = this.transformStack[this.transformStack.length - 1]
    const u_transformMatrix = gl.getUniformLocation(this.program, "u_transformMatrix")
    gl.uniformMatrix4fv(u_transformMatrix, false, current)
  }

  public push ()
  : void
  {
    this.transformStack.push(mat4.clone(this.getTransform()))
  }

  public pop ()
  : void
  {
    if (this.transformStack.length === 1) {
      return
    }
    this.transformStack.pop()
  }

  public origin ()
  : void
  {
    const identity = mat4.create()
    this.transformStack = [ identity ]

    this.setTransform()
  }

  public scale (x : number, y : number)
  : void
  {
    const current = this.getTransform()
    mat4.scale(current, current, [x, y, 1])
  }

  public rotate (radians : number)
  : void
  {
    const current = this.getTransform()
    mat4.rotate(current, current, radians, [0, 0, 1])
  }

  public translate (x : number, y : number)
  : void
  {
    const current = this.getTransform()
    mat4.translate(current, current, [x, y, 0])
  }

  public getClearColor ()
  : color
  {
    const gl = this.gl
    const [r, g, b, a] = gl.getParameter(gl.COLOR_CLEAR_VALUE)
    return { r, g, b, a }
  }

  public setClearColor (color : color)
  : void
  {
    this.gl.clearColor(color.r, color.g, color.b, color.a)
  }

  public clear ()
  : void
  {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
  }

  public getColor ()
  : color
  {
    const gl = this.gl
    const colorUniform = gl.getUniformLocation(this.program, "u_constantColor")
    const [r, g, b, a] = gl.getUniform(this.program, colorUniform)
    return { r, g, b, a }
  }

  public setColor (color : color)
  : void
  {
    const gl = this.gl

    const colorUniform = gl.getUniformLocation(this.program, "u_constantColor")
    gl.uniform4f(colorUniform, color.r, color.g, color.b, color.a)
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
    const v_position = gl.getAttribLocation(this.program, "v_position")
    gl.enableVertexAttribArray(v_position)
    gl.vertexAttribPointer(v_position, 2, gl.FLOAT, false, 0, 0)
    const elements = [
      0, 1, 2,
      0, 2, 3,
    ]
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(elements), gl.STATIC_DRAW)
    this.setTransform()
    gl.drawElements(gl.TRIANGLES, elements.length, gl.UNSIGNED_BYTE, 0)
  }

  public circle (mode : DRAWMODE, x : number, y : number, radius : number, segments : number = 20)
  : void
  {
    const gl = this.gl
    const vertices = [
       x, y,
    ]
    for (let i=0; i<segments; i++) {
      vertices.push(x + radius * Math.cos(2 * Math.PI / segments * i))
      vertices.push(y + radius * Math.sin(2 * Math.PI / segments * i))
    }
    vertices.push(x, y)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    const v_position = gl.getAttribLocation(this.program, "v_position")
    gl.enableVertexAttribArray(v_position)
    gl.vertexAttribPointer(v_position, 2, gl.FLOAT, false, 0, 0)
    const elements = []
    for (let i=1; i<segments; i++) {
      elements.push(0, i, i+1)
    }
    elements.push(0, segments, 1)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(elements), gl.STATIC_DRAW)
    this.setTransform()
    gl.drawElements(gl.TRIANGLES, elements.length, gl.UNSIGNED_BYTE, 0)
  }

  public newTexture (path : string)
  : Texture
  {
    return new Texture(path)
  }

  private textureElements = Uint8Array.from([
    0, 1, 3,
    1, 2, 3,
  ])

  public drawTexture (texture : Texture, x : number = 0, y : number = 0)
  : void
  {
    const gl = this.gl
    if (this.lastTexture !== texture) {
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image)
      this.lastTexture = texture
    }
    const width = texture.image.width
    const height = texture.image.height
    const vertices = [
      x,         y,          0, 0,
      x + width, y,          1, 0,
      x + width, y + height, 1, 1,
      x,         y + height, 0, 1,
    ]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)
    gl.vertexAttribPointer(
      this.v_position, 2, gl.FLOAT, false, 4 * SIZEOF.FLOAT, 0
    )
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.textureElements, gl.STATIC_DRAW)
    gl.vertexAttribPointer(
      this.v_texcoord, 2, gl.FLOAT, false, 4 * SIZEOF.FLOAT, 2 * SIZEOF.FLOAT
    )
    this.setTransform()
    gl.drawElements(gl.TRIANGLES, this.textureElements.length, gl.UNSIGNED_BYTE, 0)
  }

}
