import { Debug } from "./Debug"
import { IVector2d } from "./Vector"
const { assert } = Debug

export class Graphics {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private aspectRatio: Number
  constructor (aspectRatio = 1)
  {
    this.canvas = document.createElement("canvas")
    this.context = this.canvas.getContext("2d")
    assert(this.context !== null, "Browser must support Canvas 2d")
    this.aspectRatio = aspectRatio
  }
  public addToDom (targetDomElement = document.body)
  {
    targetDomElement.appendChild(this.canvas)
  }
  public removeFromDom ()
  {
    this.canvas.remove()
  }
  public fitWindow ()
  {
    this.canvas.style.display = "block"
    this.resizeCanvas()
    window.addEventListener("resize", () =>
      {
        this.resizeCanvas()
      }
    )
  }
  public resizeCanvas ()
  {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }
  public getLongestEdge (): number
  {
    const width = this.canvas.width
    const height = this.canvas.height
    return width > height ? width : height
  }
  public getShortestEdge (): number
  {
    const width = this.canvas.width
    const height = this.canvas.height
    return width < height ? width : height
  }
  public worldVToScreen (v: IVector2d): IVector2d
  {
    return {
      x: this.worldXToScreen(v.x),
      y: this.worldYToScreen(v.y),
    }
  }
  public worldXToScreen (x: number): number
  {
    let offset = 0
    if (this.getShortestEdge() === this.canvas.height)
    {
      offset = (this.getLongestEdge() - this.getShortestEdge()) / 2
    }
    return x * this.getShortestEdge() / 100 + offset
  }
  public worldYToScreen (y: number): number
  {
    let offset = 0
    if (this.getShortestEdge() === this.canvas.width)
    {
      offset = (this.getLongestEdge() - this.getShortestEdge()) / 2
    }
    return y * this.getShortestEdge() / 100 + offset
  }
  public worldScalerToScreen (l: number): number
  {
    return l * this.getShortestEdge() / 100
  }
  public letterBox ()
  {
    this.push()
    const edge = this.getShortestEdge()
    const spaceRemaining = this.getLongestEdge() - this.getShortestEdge()
    const letterBoxSize = spaceRemaining / 2
    this.context.fillStyle = "hsl(0, 0%, 0%)"
    if (edge === this.canvas.width)
    {
      this.context.fillRect(0, 0, this.canvas.width, letterBoxSize)
      this.context.fillRect(
        0, this.canvas.height - letterBoxSize,
        this.canvas.width, letterBoxSize
      )
    }
    else
    {
      this.context.fillRect(0, 0, letterBoxSize, this.canvas.height)
      this.context.fillRect(
        this.canvas.width - letterBoxSize, 0,
        this.canvas.width, this.canvas.height
      )
    }
    this.pop()
  }
  public clear ()
  {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
  public circle (worldV: IVector2d, worldRadius: number)
  {
    const screenV = this.worldVToScreen(worldV)
    const screenR = this.worldScalerToScreen(worldRadius)
    this.context.beginPath()
    this.context.arc(screenV.x, screenV.y, screenR, 0, 360)
    this.context.stroke()
  }
  public polygon (vertices: IVector2d[])
  {
    this.context.beginPath()
    vertices.forEach((worldV) =>
      {
        const screenV = this.worldVToScreen(worldV)
        this.context.lineTo(screenV.x, screenV.y)
      }
    )
    this.context.closePath()
    this.context.stroke()
  }
  public line (v1: IVector2d, v2: IVector2d)
  {
    const worldV1 = this.worldVToScreen(v1)
    const worldV2 = this.worldVToScreen(v2)
    this.context.beginPath()
    this.context.moveTo(worldV1.x, worldV1.y)
    this.context.lineTo(worldV2.x, worldV2.y)
    this.context.stroke()
  }
  public text (v: IVector2d, text: string)
  {
    const worldV = this.worldVToScreen(v)
    this.context.fillText(text, worldV.x, worldV.y)
  }
  public textBoundingBox (text: string)
  {
    return this.context.measureText(text)
  }
  public push ()
  {
    this.context.save()
  }
  public pop ()
  {
    this.context.restore()
  }
}
