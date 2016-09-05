export default class Audio
{
  private tags : { [index: string] : HTMLAudioElement }
  constructor ()
  {
    this.tags = {}
  }
  newSource (filepath : string, tag : string) : HTMLAudioElement
  {
    const audioTag = document.createElement("audio")
    audioTag.src = filepath
    audioTag.volume = 0.04
    audioTag.play()
    this.tags[tag] = audioTag
    return audioTag
  }
}
