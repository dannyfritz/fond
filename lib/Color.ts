import { CssValue } from "./Graphics"

export interface Color extends CssValue
{
}

export class HslaColor implements Color
{
  private hue: number
  private saturation: number
  private lightness: number
  private alpha: number
  constructor (hue: number, saturation: number, lightness: number, alpha: number = 1)
  {
    this.hue = hue
    this.saturation = saturation
    this.lightness = lightness
    this.alpha = alpha
  }
  cssValue () : string
  {
    return `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`
  }
}

export class RgbaColor implements Color
{
  private red: number
  private green: number
  private blue: number
  private alpha: number
  constructor (red: number, green: number, blue: number, alpha: number = 1)
  {
    this.red = red
    this.green = green
    this.blue = blue
    this.alpha = alpha
  }
  cssValue () : string
  {
    return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`
  }
}
