const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./base')
const utils = require('./utils')

module.exports = merge(config, {
  mode: 'development',
  entry: {
    app: path.resolve(__dirname, '../examples/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader',
        options: utils.cssLoaders({ sassResources: true })
      },
      ...utils.styleLoaders({ sassResources: true }),
      ...utils.mdLoaders()
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../examples/index.html')
    })
  ]
})
