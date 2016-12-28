import { Debug } from "./Debug"
import { Vector2d, radian } from "./Vector"
import { Color } from "./Color"
import { Transform, TransformOperation, TransformOperationType } from "./Transform"
const { assert } = Debug

export enum DrawMode { line, fill }

export class Canvas2d
{
  private canvas : HTMLCanvasElement;
  private context : CanvasRenderingContext2D;
  constructor ()
  {
    this.canvas = document.createElement("canvas")
    this.context = this.canvas.getContext("2d")
    assert(this.context !== null, "Browser must support Canvas 2d")
  }
  public resize (width: number, height: number) : void
  {
    this.canvas.width = width
    this.canvas.height = height
  }
  public getWidth () : number
  {
    return this.canvas.width
  }
  public getHeight () : number
  {
    return this.canvas.height
  }
  public addToDom (targetDomElement = document.body) : void
  {
    targetDomElement.appendChild(this.canvas)
  }
  public removeFromDom () : void
  {
    this.canvas.remove()
  }
  public drawCanvas (canvas: Canvas2d) : void
  {

  }
  public drawSprite (sprite: Sprite, frame: Frame) : void
  {
    // TODO(danny): expose this
    this.context.imageSmoothingEnabled = false
    this.context.drawImage(
      sprite.image,
      frame.offset.x, frame.offset.y,
      frame.size.x, frame.size.y,
      0, 0,
      frame.size.x, frame.size.y
    )
  }
  public drawText (drawMode: DrawMode, text: Text) : void
  {
    this.drawStrokeOrFill(drawMode)
  }
  public drawPoint (drawMode: DrawMode) : void
  {
    this.drawPolygon(drawMode, [
      {x: 0, y:0},
      {x: 1, y:0},
      {x: 1, y:1},
      {x: 0, y:1},
    ])
  }
  public drawCircle (drawMode: DrawMode, radius: number) : void
  {
    this.context.beginPath()
    this.context.arc(0, 0, radius, 0, 360)
    this.context.stroke()
    this.drawStrokeOrFill(drawMode)
  }
  public drawLine (vector: Vector2d) : void
  {
    this.context.beginPath()
    this.context.lineTo(vector.x, vector.y)
    this.context.stroke()
  }
  public drawPolygon (drawMode : DrawMode, vertices: Vector2d[]) : void
  {
    this.context.beginPath()
    vertices.forEach((vector) =>
      {
        this.context.lineTo(vector.x, vector.y)
      }
    )
    this.context.closePath()
    this.drawStrokeOrFill(drawMode)
  }
  private drawStrokeOrFill (drawMode: DrawMode) : void
  {
    if (drawMode === DrawMode.line)
    {
      this.context.stroke()
    }
    else if (drawMode === DrawMode.fill)
    {
      this.context.fill()
    }
  }
  public transform (transform: Transform) : void
  {
    transform.operations.forEach((operation: TransformOperation) => {
      if (operation.type === TransformOperationType.rotate)
      {
        this.rotate(operation.angle)
      }
      else if (operation.type === TransformOperationType.scale)
      {
        this.scale(operation.factor)
      }
      else if (operation.type === TransformOperationType.translate)
      {
        this.translate(operation.distance)
      }
    })
  }
  private rotate (angle: radian) : void
  {
    this.context.rotate(angle)
  }
  private scale (factor: Vector2d) : void
  {
    this.context.scale(factor.x, factor.y)
  }
  private translate (distance: Vector2d) : void
  {
    this.context.translate(distance.x, distance.y)
  }
  public push () : void
  {
    this.context.save()
  }
  public pop () : void
  {
    this.context.restore()
  }
  public clear () : void
  {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
  public setFillStyle (style: Color) : void
  {
    this.context.fillStyle = style.cssValue()
  }
  public setLineStyle (style: Color) : void
  {
    this.context.strokeStyle = style.cssValue()
  }
  public setLineWidth (width: number = 1) : void
  {
    this.context.lineWidth = width
  }
  public setFont (font: Font) : void
  {
    this.context.font = font.cssValue()
  }
}

export interface CssValue
{
  cssValue () : string
}

export class Font implements CssValue
{
  public font : string
  public size : number
  public sizeUnit : string
  constructor (font: string, size: number, sizeUnit: string = "px")
  {
    this.font = font
    this.size = size
    this.sizeUnit = sizeUnit
  }
  cssValue () : string
  {
    return ""
  }
}

export class Text
{
  public text : string
  constructor (text : string)
  {
    this.text = text
  }
}

export class Sprite
{
  public image : HTMLImageElement
  constructor (src : string)
  {
    this.image = new Image()
    this.image.src = src
  }
}

export interface Frame
{
  offset: Vector2d,
  size: Vector2d
}
