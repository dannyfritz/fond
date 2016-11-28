import {
  Canvas2d, Transform, radian, HslaColor, DrawMode,
  Controllers, Controller, ControllerAxis, ControllerButton,
  Vector2d, VectorMath,
} from "../.."
import { Runnable } from "./Game"
import Bullet from "./Bullet"
import { delay } from "lodash"

const white = new HslaColor(0, 0, 100, 1)

function throttle(readyProperty: string, delayProperty: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value
    descriptor.value = function () {
      if (this[readyProperty])
      {
        this[readyProperty] = false
        delay(() => this[readyProperty] = true, this[delayProperty])
        original.apply(this, arguments)
      }
    }
    return descriptor
  };
}

export default class Ship implements Runnable
{
  private controller: Controller
  private position: Vector2d
  private velocity: Vector2d
  private thrusterPower: number
  private rotation: radian
  private rotationSpeed: number
  private canShoot: boolean
  private cooldownTime: number
  private runnables: Runnable[]
  constructor ()
  {
    this.controller = Controllers.getController(0)
    this.position = { x: 250, y: 250 }
    this.velocity = { x: 0, y: 0 }
    this.thrusterPower = 100
    this.rotation = 0
    this.rotationSpeed = 5
    this.canShoot = true
    this.cooldownTime = 250
    this.runnables = []
  }
  public update (dt: number) : void
  {
    this.position = VectorMath.add(this.position, VectorMath.scale(this.velocity, dt))
    if (this.controller.getButton(ControllerButton.A).pressed)
    {
      this.velocity = VectorMath.add(this.velocity, VectorMath.rotate({ x: 0, y: -this.thrusterPower * dt }, this.rotation))
    }
    if (this.controller.getButton(ControllerButton.RightBumper).pressed)
    {
      this.shoot()
    }
    this.rotation += this.controller.getAxis(ControllerAxis.LeftX) * this.rotationSpeed * dt
    this.position = VectorMath.modulate(this.position, 500)
  }
  public getRunnables () : Runnable[]
  {
    const runnables = this.runnables
    this.runnables = []
    return runnables
  }
  @throttle("canShoot", "cooldownTime")
  private shoot () : void
  {
    this.runnables.push(new Bullet(VectorMath.add(this.position, VectorMath.rotate(this.getPolygon()[0], this.rotation)), this.velocity, this.rotation, 100))
  }
  private getPolygon () : Vector2d[]
  {
    return [
      { x: 0, y: -15 },
      { x: 10, y: 15 },
      { x: -10, y: 15 },
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
