const webpack = require('webpack')
const config = require('../config/lib')
const generateTheme = require('./generate-theme')

const compiler = webpack(config)
compiler.run((error, stats) => {
  if (error) {
    console.error(error)
  } else {
    console.log(stats.toString({
      colors: true
    }))

    console.log('\n\nStart to generate theme-chalk dir...')
    generateTheme().then(() => {
      console.log('Finishing generate theme-chalk dir')
    }, error => {
      console.error('Generating theme-chalk error', error)
    })
  }
})
