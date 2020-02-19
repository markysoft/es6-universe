import Space from './space'
const dust = 500
function readFormValues () {
  const suns = Number($('#suns').val())
  const comets = Number($('#comets').val())
  return { suns, comets }
}

const { suns, comets } = readFormValues()
const space = new Space({ width: 800, height: 600, dust, suns, comets })
space.start()

$('#regenerate').on('click', () => {
  const { suns, comets } = readFormValues()
  space.init(dust, suns, comets)
})
