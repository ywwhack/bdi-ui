const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const config = require('./base')

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

module.exports = merge(config, {
  mode: 'none',
  entry: componentsEntry,
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    vue: {
      commonjs2: 'vue'
    },
    'element-ui': {
      commonjs2: 'element-ui'
    }
  }
})
