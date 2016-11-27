import { Vector2d, radian } from "./Vector"
export type TransformOperation = Rotate | Scale | Translate

export enum TransformOperationType { rotate, scale, translate }

export interface ITransformOperation
{
  type: TransformOperationType
}

export interface Rotate extends ITransformOperation
{
  type: TransformOperationType.rotate
  angle: radian
}

export interface Scale extends ITransformOperation
{
  type: TransformOperationType.scale
  factor: Vector2d
}

export interface Translate extends ITransformOperation
{
  type: TransformOperationType.translate
  distance: Vector2d
}

export class Transform
{
  public operations: TransformOperation[]
  constructor ()
  {
    this.operations = []
  }
  public rotate (angle: radian) : void
  {
    this.operations.push({type: TransformOperationType.rotate, angle})
  }
  public scale (factor: Vector2d) : void
  {
    this.operations.push({type: TransformOperationType.scale, factor})
  }
  public translate (distance: Vector2d) : void
  {
    this.operations.push({type: TransformOperationType.translate, distance})
  }
  public clear ()
  {
    this.operations = []
  }
}
