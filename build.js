const browserify = require('browserify')
const watchify = require('watchify')

const fs = require('fs')
const path = require('path')

const doneMessage = '.'

const browserifyOptions = {
  debug: true,
  cache: {},
  packageCache: {},
  plugin: [watchify]
}

function bundleStream () {
  const bundleFs = fs.createWriteStream(path.join(__dirname, 'public/js/bundle.js'))
  bundleFs.on('finish', function () {
    console.log(doneMessage)
  })
  return bundleFs
}

function writeError (error) {
  console.error(error.toString())
}

const b = browserify(browserifyOptions)
b.add('src/main.js')
b.transform('babelify', { presets: ['es2015'] })
b.on('update', bundle)

function bundle () {
  b.bundle().on('error', writeError).pipe(bundleStream())
}

bundle()
