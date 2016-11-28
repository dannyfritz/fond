import { Runnable } from "./Game"
import {
  Canvas2d, DrawMode, Transform, HslaColor,
  Vector2d, VectorMath, radian
} from "../.."

const white = new HslaColor(0, 0, 100, 1)

export default class Bullet implements Runnable
{
  private position: Vector2d
  private velocity: Vector2d
  private rotation: radian
  private launchSpeed: number
  constructor (position: Vector2d, velocity: Vector2d, rotation: radian, launchSpeed: number)
  {
    this.position = position
    this.launchSpeed = launchSpeed
    this.velocity = VectorMath.add(
      velocity,
      VectorMath.rotate({ x: 0, y: -this.launchSpeed }, rotation)
    )
    this.rotation = rotation
  }
  public update (dt: number) : void
  {
    this.position = VectorMath.add(
      this.position,
      VectorMath.scale(this.velocity, dt)
    )
    this.position = VectorMath.modulate(this.position, 500)
  }
  private getPolygon () : Vector2d[]
  {
    return [
      { x: 0, y: -5 },
      { x: 3, y: 0 },
      { x: 0, y: 5 },
      { x: -3, y: 0 },
    ]
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
