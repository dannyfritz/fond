export default class Audio
{
  constructor ()
  {
    this.tags = {}
  }
  newSource (filepath, tag)
  {
    const audioTag = document.createElement("audio")
    audioTag.src = filepath
    audioTag.volume = 0.04
    audioTag.play()
    this.tags[tag] = audioTag
    return audioTag
  }
}
