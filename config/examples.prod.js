const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin')
const merge = require('webpack-merge')
const config = require('./base')
const utils = require('./utils')

function resolve (name) {
  return path.resolve(__dirname, '..', name)
}

module.exports = merge(config, {
  mode: 'production',
  entry: {
    app: resolve('examples/main.js')
  },
  output: {
    path: resolve('dist'),
    filename: 'js/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: utils.cssLoaders({ extract: true, sassResources: true })
        }
      },
      ...utils.styleLoaders({ extract: true, sassResources: true }),
      ...utils.mdLoaders()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[chunkhash].css'
    }),
    new CleanPlugin(['dist'], { root: path.resolve(__dirname, '..') }),
    new HtmlPlugin({
      template: resolve('examples/index.html')
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCssAssetPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  stats: {
    all: undefined,
    assets: true,
    modules: false,
    children: false,
    warnings: false
  }
})
