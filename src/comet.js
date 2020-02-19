import Toid from './toid'
const trailSize = 60
export default class Moon extends Toid {
  constructor ({ space, maxVelocity = 3, diameter = 2 }) {
    super({ space, maxVelocity, diameter, undefined, fillStyle: '#ffffbb' })
    this.trails = []
  }

  render () {
    super.render()
    this.updateTrail()
    this.drawTail()
  }

  updateTrail () {
    this.trails.push({ x: this.x, y: this.y })
    if (this.trails.length > trailSize) {
      this.trails.shift()
    }
  }

  drawTail () {
    // use a for with i for performance. yuck
    for (let i = 0, len = this.trails.length; i < len; i++) {
      const opacity = 0.5 * (i + 1) / this.trails.length
      this.renderTrailSection(this.trails[i], opacity)
    }
  }

  renderTrailSection ({ x, y }, opacity) {
    const diameter = 7 * opacity
    this.space.ctx.fillStyle = `rgba(255,255,187,${opacity})`
    this.space.ctx.beginPath()
    this.space.ctx.arc(x, y, diameter, 0, 2 * Math.PI)
    this.space.ctx.fill()
  }

  addForce (force, direction) {
    this.vx += force * direction.x / this.diameter
    this.vy += force * direction.y / this.diameter
  }

  distanceTo (node) {
    const x = this.wrappedX(node)
    const y = this.wrappedY(node)
    const total = Math.sqrt(this.squaredDistanceTo(node))

    return { x, y, total }
  }

  squaredDistanceTo (node) {
    return Math.pow(this.wrappedX(node), 2) + Math.pow(this.wrappedY(node), 2)
  }
}
