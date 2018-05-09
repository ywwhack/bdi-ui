const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    if (options.extract) {
      loaders.unshift(MiniCssExtractPlugin.loader)
    } else {
      loaders.unshift('vue-style-loader')
    }

    // add sass-resources-loader
    if (options.sassResources) {
      loaders.push({
        loader: 'sass-resources-loader',
        options: {
          resources: path.resolve(__dirname, '../examples/styles/element-variables.scss')
        }
      })
    }

    return loaders
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    scss: generateLoaders('sass')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (let extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

// Generator loaders for .md files
exports.mdLoaders = function () {
  return [
    {
      test: /.md$/,
      loader: path.resolve(__dirname, '../loaders/md-loader')
    }
  ]
}
