const targetFPS = 1000 / 60
const speedOfLight = 4

export default class Toid {
  constructor ({ space, maxVelocity, diameter, wiggle = 1.5, fillStyle = '#ffffff' }) {
    this.fillStyle = fillStyle
    this.live = true
    this._vx = 0
    this._vy = 0
    this.space = space
    this.minDiameter = diameter
    this.wiggle = wiggle
    this.maxVelocity = maxVelocity
    this.maxVolOffset = this.maxVelocity / 2
    this.init(diameter)
  }

  set vx (val) {
    this._vx = this.throttle(val)
  }

  get vx () {
    return this._vx
  }

  set vy (val) {
    this._vy = this.throttle(val)
  }

  get vy () {
    return this._vy
  }

  wrappedX (node) {
    const distance = node.x - this.x
    if (Math.abs(distance) > this.space.width / 2) {
      return distance > 0 ? distance - this.space.width : distance + this.space.width
    }
    return distance
  }

  wrappedY (node) {
    const distance = node.y - this.y
    if (Math.abs(distance) > this.space.height / 2) {
      return distance > 0 ? distance - this.space.height : distance + this.space.height
    }
    return distance
  }

  throttle (val) {
    if (val > speedOfLight) {
      return speedOfLight
    }
    if (val < -speedOfLight) {
      return -speedOfLight
    }
    return val
  }

  skip (val, prev) {
    if (val > speedOfLight) {
      return prev
    }
    if (val < -speedOfLight) {
      return prev
    }
    return val
  }

  init () {
    this.x = Math.random() * this.space.width
    this.y = Math.random() * this.space.height
    this.vx = Math.random() * this.maxVelocity - this.maxVolOffset
    this.vy = Math.random() * this.maxVelocity - this.maxVolOffset
    this.diameter = Math.random() * this.wiggle + this.minDiameter
  }

  update (deltaTime) {
    const inc = deltaTime / targetFPS
    this.x += this.vx * inc
    this.y += this.vy * inc

    if (this.x > this.space.width) {
      this.x -= this.space.width
    } else if (this.x < 0) {
      this.x += this.space.width
    }
    if (this.y > this.space.height) {
      this.y -= this.space.height
    } else if (this.y < 0) {
      this.y += this.space.height
    }
  }

  render () {
    this.space.ctx.beginPath()
    this.space.ctx.arc(this.x, this.y, this.diameter, 0, 2 * Math.PI)
    this.space.ctx.fill()
  }
}
