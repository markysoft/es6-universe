import Game from './game'
import Dust from './dust'
import Sun from './sun'
import Comet from './comet'

export default class Space extends Game {
  constructor ({ width, height, dust, suns, comets }) {
    super({ width, height })
    this.drawGravityLines = false
    this.init(dust, suns, comets)
  }

  init (dust, suns, comets) {
    this.dust = this.createToids(dust, Dust)
    this.suns = this.createToids(suns, Sun)
    this.comets = [
      ...this.createRegularComets(comets),
      ...this.createSlowComets(comets)
    ]
  }

  createRegularComets (comets) {
    return this.createToids(Math.round(comets / 2), Comet)
  }

  createSlowComets (comets) {
    return this.createToids(Math.round(comets / 2), Comet, 1.5)
  }

  createToids (total, ToidClass, speed, diameter) {
    const emptyArray = Array(total).fill()
    return emptyArray.map(() => new ToidClass({ space: this, speed, diameter }))
  }

  renderToids (toids) {
    if (toids.length > 0) {
      this.ctx.fillStyle = toids[0].fillStyle
      for (const toid of toids) {
        toid.render()
        toid.update(this.deltaTime || 0)
      }
    }
  }

  onRender () {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.addGravity()
    for (const toidType of [this.dust, this.suns, this.comets]) {
      this.renderToids(toidType)
    }
  }

  addGravity () {
    for (const comet of this.comets) {
      for (const sun of this.suns) {
        this.applyGravity(comet, sun)
      }
    }
  }

  collided (squaredDistance, comet) {
    return Math.sqrt(squaredDistance) <= (comet.diameter / 2) + 10
  }

  renderGravityLines (force, comet, sun) {
    const opacity = force * 200
    this.ctx.beginPath()
    this.ctx.strokeStyle = `rgba(191,191,191,${(opacity < 1 ? opacity : 1)})`
    this.ctx.moveTo(comet.x, comet.y)
    this.ctx.lineTo(sun.x, sun.y)
    this.ctx.stroke()
  }

  addForce (comet, sun, squaredDistance, drawGravityLines) {
    const force = 5 * (comet.diameter * sun.diameter) / squaredDistance
    const distance = comet.distanceTo(sun)
    const direction = {
      x: distance.x / distance.total,
      y: distance.y / distance.total
    }
    comet.addForce(force, direction)
    if (drawGravityLines) {
      this.renderGravityLines(force, comet, sun)
    }
  }

  applyGravity (comet, sun) {
    const squaredDistance = comet.squaredDistanceTo(sun)
    if (!this.collided(squaredDistance, comet)) {
      this.addForce(comet, sun, squaredDistance, this.drawGravityLines)
    }
  }
}
