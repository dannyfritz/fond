import {
  Canvas2d, Sprite, Frame, Transform
} from "../.."

const layers = [
  "layer-1.png", "layer-2.png", "layer-3.png", "layer-6.png",
  "layer-4.png", "layer-5.png",
].map((src) => new Sprite(src))
const frame : Frame =
{
  offset: { x: 0, y: 0 },
  size: { x: 1000, y: 500 },
}

export default class Background
{
  private x: number
  constructor ()
  {
    this.x = 0
  }
  public update (dt: number): void
  {
  }
  public setX (x: number): void
  {
    this.x = x
  }
  public draw (canvas: Canvas2d): void
  {
    canvas.push()
    canvas.drawSprite(layers[0], frame)
    canvas.pop()

    this.drawLayer(canvas, 0.2, 1)
    this.drawLayer(canvas, 0.3, 2)
    this.drawLayer(canvas, 0.4, 3)
    this.drawLayer(canvas, 1.8, 4)
    this.drawLayer(canvas, 1.83, 5)
  }
  private drawLayer (canvas : Canvas2d, speed : number, layer : number) : void
  {
    const transform = new Transform()
    canvas.push()
    transform.translate({ x: this.x * speed % 1000, y: 0 })
    canvas.transform(transform)
    canvas.drawSprite(layers[layer], frame)
    transform.clear()
    transform.translate({ x: 1000, y: 0 })
    canvas.transform(transform)
    canvas.drawSprite(layers[layer], frame)
    canvas.pop()
  }
}
