const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const CleanPlugin = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const config = require('./base')
const utils = require('./utils')
const {
  hyphenate
} = require('../shared/utils')

function getEntry (dir) {
  return fs.readdirSync(dir)
    .reduce((result, filename) => {
      const name = hyphenate(path.parse(filename).name)
      result[name] = path.resolve(dir, filename)
      return result
    }, {})
}

const entry = Object.assign({
  // index.js 入口
  'index.js': path.resolve(__dirname, '../src/index.js')
},
// 获取 components 目录下的所有文件路径作为 webpack 的 entries
getEntry(path.resolve(__dirname, '../src/components')),
// 获取 common 目录下的所有文件路径作为 webpack 的 entries
getEntry(path.resolve(__dirname, '../src/common'))
)

module.exports = merge(config, {
  mode: 'none',
  entry,
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader'
      },
      ...utils.styleLoaders()
    ]
  },
  plugins: [
    new CleanPlugin(['lib/'], { root: path.resolve(__dirname, '..') }),
    new CopyPlugin([{
      from: path.resolve(__dirname, '../src/styles'),
      to: path.resolve(__dirname, '../lib/styles')
    }])
  ],
  externals: {
    'vue': {
      commonjs2: 'vue'
    },
    'element-ui': {
      commonjs2: 'element-ui'
    },
    'axios': {
      commonjs2: 'axios'
    }
  }
})
