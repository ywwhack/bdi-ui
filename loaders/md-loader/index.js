const path = require('path')
const loaderUtils = require('loader-utils')

const mdParserPath = path.resolve(__dirname, 'md-parser.js')

module.exports = function (source) {
  this.cacheable()

  const filePath = this.resourcePath

  const result = 'module.exports = require(' +
    loaderUtils.stringifyRequest(
      this,
      '!vue-loader!' + mdParserPath + '!' + filePath
    ) +
  ')'

  return result
}
