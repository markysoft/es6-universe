import Toid from './toid'
export default class Planet extends Toid {
  constructor ({ space, maxVelocity = 1, diameter = 5, wiggle = 3 }) {
    super({ space, maxVelocity, diameter, wiggle })
    this.vx = 0
    this.vy = 0
  }
}
