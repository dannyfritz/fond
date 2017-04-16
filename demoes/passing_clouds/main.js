const fond = require("../../dist/fond")

const runtime = new fond.Runtime()
const graphics = new fond.Graphics("canvas")

let texture
let clouds = []

runtime.load = function () {
  texture = graphics.newTexture("./assets/cloud_plain.png")
  for (var i=0; i<10; i++) {
    clouds.push({x: Math.random()*300, y: Math.random()*100, speed: Math.random() * 20})
  }
}

runtime.update = function (dt) {
  clouds.forEach((cloud) => {
    cloud.x = cloud.x + cloud.speed * dt
    if (cloud.x > 300) {
      cloud.x -= 300
    }
  })
}

runtime.draw = function () {
  graphics.clear()
  clouds.forEach((cloud) => {
    if (texture.isReady) {
      graphics.push()
      graphics.setColor({r: 1, g: 1, b: 1, a: 0.8})
      graphics.translate(cloud.x, cloud.y)
      graphics.scale(0.25, 0.25)
      graphics.drawTexture(texture)
      graphics.pop()
    }
  })
}

runtime.run()
