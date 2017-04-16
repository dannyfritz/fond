
export class Texture {
  public image : HTMLImageElement
  public glTex : WebGLTexture
  public getReady : Promise<Event>
  public isReady : Boolean

  constructor (path : string, texture : WebGLTexture)
  {
    this.glTex = texture
    this.image = new Image()
    this.image.src = path
    this.getReady = new Promise((resolve, reject) => {
      this.image.addEventListener("load", resolve)
      this.image.addEventListener("error", reject)
    })
    this.isReady = false
    this.image.addEventListener("load", () => {
      this.isReady = true
    })
    this.image.addEventListener("error", () => {
      this.isReady = false
    })
  }

}
