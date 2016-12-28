import {
  Canvas2d, Transform, Sprite, Frame,
  Vector2d, VectorMath,
  Keyboard,
} from "../../"

const raven = new Sprite("./raven.png")
const frames: Frame[] =
[
  {
    offset: { x: 0, y: 48 },
    size: { x: 16, y: 16 }
  },
  {
    offset: { x: 16, y: 48 },
    size: { x: 16, y: 16 }
  },
  {
    offset: { x: 48, y: 48 },
    size: { x: 16, y: 16 }
  },
  {
    offset: { x: 16, y: 48 },
    size: { x: 16, y: 16 }
  },
]

function clamp (min: number, value: number, max: number): number
{
  if (value < min)
  {
    return min
  }
  else if (value > max)
  {
    return max
  }
  return value
}

export default class Raven
{
  private position: Vector2d
  private velocity: Vector2d
  private gravity: number
  private thrust: number
  private currentFrame: number
  private frameTime: number
  private frameTimeTotal: number
  private canFlap: boolean
  constructor ()
  {
    this.position = { x: 0, y: 0 }
    this.velocity = { x: 0, y: 0 }
    this.gravity = 9.8 * 100
    this.thrust = -300
    this.currentFrame = 0
    this.canFlap = true
  }
  public update (dt: number): void
  {
    this.updateFrame(dt)
    if (Keyboard.isKeyDown("Space")
        && this.canFlap === true)
    {
      this.velocity.y = this.thrust
      this.canFlap = false
    }
    this.velocity = VectorMath.add(this.velocity, { x: 0, y: dt * this.gravity })
    this.position = VectorMath.add(this.position,
      VectorMath.scale(this.velocity, dt))
    this.position = {
      x: clamp(0, this.position.x, 500 - 48),
      y: clamp(0, this.position.y, 500 - 48),
    }
  }
  private updateFrame (dt: number): void
  {
    const velocityThreshold = Math.abs(this.thrust * 2/8)
    if (Math.abs(this.velocity.y) <= velocityThreshold)
    {
      this.currentFrame = 1
      this.canFlap = true
    }
    else if (this.velocity.y > velocityThreshold)
    {
      this.currentFrame = 2
    }
    else if (this.velocity.y < -velocityThreshold)
    {
      this.currentFrame = 0
    }
  }
  public draw (canvas: Canvas2d): void
  {
    const transform = new Transform()
    transform.translate(this.position)
    transform.scale(3)
    canvas.push()
    canvas.transform(transform)
    canvas.drawSprite(raven, frames[this.currentFrame])
    canvas.pop()
  }
}
