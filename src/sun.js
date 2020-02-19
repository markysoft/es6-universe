import Toid from './toid'
export default class Sun extends Toid {
  constructor ({ space, maxVelocity = 1, diameter = 5, wiggle = 3 }) {
    super({ space, maxVelocity, diameter, wiggle })
    this.vx = 0
    this.vy = 0
    this.frame = 0
    this.opacity = 0.8
    this.twinkleOffset = Math.round(Math.random() * 60)
    this.halo = false
    this.haloDiameter = this.diameter
  }

  drawHalo () {
    this.space.ctx.beginPath()
    this.space.ctx.arc(this.x, this.y, this.haloDiameter, 0, 2 * Math.PI)
    this.space.ctx.fill()
  }

  twinkle () {
    this.frame++
    if ((this.frame + this.twinkleOffset) % 20 === 0) {
      this.haloDiameter = Math.random() * 0.6 + this.diameter
      this.halo = true
    }
    if ((this.frame + this.twinkleOffset) % 45 === 0) {
      this.halo = false
    }
    if (this.halo) {
      this.fillStyle = `rgba(230,255,255,${this.opacity})`
      this.drawHalo()
    } else {
      this.fillStyle = `rgba(212,255,255,${this.opacity})`
      super.render()
    }
  }

  render () {
    this.twinkle()
  }
}
