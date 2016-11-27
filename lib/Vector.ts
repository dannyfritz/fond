export type radian = number

export interface Vector2d {
  x: number,
  y: number,
}

export const VectorMath = {
  add (a: Vector2d, b: Vector2d) : Vector2d
  {
    return {
      x: a.x + b.x,
      y: a.y + b.y,
    }
  },
  subtract (a: Vector2d, b: Vector2d) : Vector2d
  {
    return {
      x: a.x - b.x,
      y: a.y - b.y,
    }
  },
  multiply (a: Vector2d, b: Vector2d) : Vector2d
  {
    return {
      x: a.x * b.x,
      y: a.y * b.y,
    }
  },
  divide (a: Vector2d, b: Vector2d) : Vector2d
  {
    return {
      x: a.x / b.x,
      y: a.y / b.y,
    }
  },
  modulate (a: Vector2d, scaler: number) : Vector2d
  {
    return {
      x: a.x % scaler,
      y: a.y % scaler,
    }
  },
  invert (a: Vector2d) : Vector2d
  {
    return {
      x: -a.x,
      y: -a.y,
    }
  },
  normalize (a: Vector2d) : Vector2d
  {
    const length = VectorMath.magnitude(a)
    return {
      x: a.x / length,
      y: a.y / length,
    }
  },
  magnitude (a: Vector2d) : number
  {
    return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2))
  },
  rotate (a: Vector2d, angle: radian) : Vector2d
  {
    return {
      x: a.x * Math.cos(angle) - a.y * Math.sin(angle),
      y: a.x * Math.sin(angle) + a.y * Math.cos(angle),
    }
  },
  scale (a: Vector2d, factor: number) : Vector2d
  {
    return {
      x: a.x * factor,
      y: a.y * factor,
    }
  }
  // dot (a: Vector2d, b: Vector2d) : number
  // {
  //   return 0
  // },
  // cross (a: Vector2d, b: Vector2d) : number
  // {
  //   return 0
  // }
}
