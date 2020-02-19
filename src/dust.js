import Toid from './toid'
export default class Dust extends Toid {
  constructor ({ space, maxVelocity = 1, diameter = 0.5 }) {
    super({ space, maxVelocity, diameter, fillStyle: '#9999ff' })
  }
}
