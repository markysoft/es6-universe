const { devicePixelRatio, requestAnimationFrame, innerWidth, innerHeight } = window

export default class Game {
  constructor ({ width, height }) {
    this.started = false

    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.ctx.fillStyle = '#ffffff'

    this.width = width * devicePixelRatio
    this.height = height * devicePixelRatio
    this.area = this.width * this.height
    this.setCanvasSize()
  }

  setCanvasSize () {
    this.ctx.canvas.width = innerWidth
    this.ctx.canvas.height = innerHeight
    this.width = innerWidth
    this.height = innerHeight
  }

  start () {
    if (!this.playing) {
      this.playing = true
      this.render(true)
    }
  }

  stop () {
    if (this.playing) {
      this.playing = false
    }
  }

  render (start, time) {
    if (!this.playing) {
      return
    }

    if (start) {
      requestAnimationFrame((time) => {
        this.render(true, time)
      })
    }

    this.deltaTime = time - (this.lastTime || time)

    this.lastTime = time
    this.onRender()
  }

  onRender () {
    // override with game logic
  }
}
