import { VectorMath, Vector2d, Canvas2d, DrawMode, HslaColor, Transform, radian } from "../.."
import { range } from "lodash"

const white = new HslaColor(0, 0, 100, 1)

export default class Asteroid
{
  private position: Vector2d
  private rotation: radian
  private size: number
  private sides: number
  private velocity: Vector2d
  private rotationalVelocity: number
  private polygon: Vector2d[]
  constructor (x: number, y: number)
  {
    this.position = { x, y }
    this.rotation = Math.random() * 2 * Math.PI
    this.size = Math.random() * 75 + 25
    this.sides = Math.ceil(Math.random() * 5 + 5)
    this.velocity = { x: Math.random() * 30 - 15, y: Math.random() * 30 - 15 }
    this.rotationalVelocity = Math.random() * 2 - 1
  }
  public update (dt: number) : void
  {
    this.position.x += this.velocity.x * dt
    this.position.y += this.velocity.y * dt
    this.rotation += this.rotationalVelocity * dt
    this.position = VectorMath.modulate(this.position, 500)
  }
  private getPolygon () : Vector2d[]
  {
    if (!this.polygon)
    {
      const polygon: Vector2d[] = []
      const rotateAmount = 2 * Math.PI / this.sides
      const firstPoint = { x: 0, y: this.size/2 }
      const bumpAmount = 1
      this.polygon = range(this.sides)
        .map((i) =>
          VectorMath.multiply(
            VectorMath.rotate(firstPoint, rotateAmount * i),
            {
              x: 1 + Math.random() * bumpAmount - bumpAmount / 2,
              y: 1 + Math.random() * bumpAmount - bumpAmount / 2,
            }
          )
        )
    }
    return this.polygon
  }
  public draw (canvas: Canvas2d) : void
  {
    const transform = new Transform()
    canvas.push()
    transform.translate(this.position)
    transform.rotate(this.rotation)
    canvas.transform(transform)
    canvas.setLineStyle(white)
    canvas.drawPolygon(DrawMode.line, this.getPolygon())
    canvas.pop()
  }
}
