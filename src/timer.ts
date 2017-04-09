export class Timer
{

  private start : number
  private lastTime : number
  private currentTime : number

  constructor ()
  {
    this.start = performance.now()
  }

  public step ()
  : void
  {
    this.lastTime = this.currentTime
    this.currentTime = performance.now()
  }

  public getDelta ()
  : number
  {
    return (this.currentTime - this.lastTime) / 1000
  }

  public getTime ()
  : number
  {
    return (this.currentTime - this.start) / 1000
  }

}
