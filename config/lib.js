const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const config = require('./base')
const utils = require('./utils')

// 获取 components 目录下的所有文件路径作为 webpack 的 entries
const COMPONENT_DIR = path.resolve(__dirname, '../src/components')
function getComponentsEntry () {
  return fs.readdirSync(COMPONENT_DIR)
    .reduce((result, filename) => {
      const name = path.parse(filename).name
      result[name] = path.resolve(COMPONENT_DIR, filename)
      return result
    }, {})
}

const componentsEntry = getComponentsEntry()
// 增加 index.js 入口
componentsEntry['index'] = path.resolve(__dirname, '../src/index.js')
// 打包全局样式至 lib/theme-chalk/base.css
// todo: 通过这种方式，会额外增加一个 base.js 文件，后面去掉
componentsEntry['base'] = path.resolve(__dirname, '../src/styles/index.scss')

module.exports = merge(config, {
  mode: 'none',
  entry: componentsEntry,
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: utils.cssLoaders({ extract: true })
        }
      },
      ...utils.styleLoaders({ extract: true })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'theme-chalk/[name].css'
    }),
    new CleanPlugin(['lib/'], { root: path.resolve(__dirname, '..') })
  ],
  externals: {
    vue: {
      commonjs2: 'vue'
    },
    'element-ui': {
      commonjs2: 'element-ui'
    }
  }
})
