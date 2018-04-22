const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const md = require('markdown-it')()
const cheerio = require('cheerio')

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

const striptags = {}

striptags.strip = function (str, tags) {
  const $ = cheerio.load(str, {decodeEntities: false})

  if (!tags || tags.length === 0) {
    return str
  }

  tags = !Array.isArray(tags) ? [tags] : tags
  let len = tags.length

  while (len--) {
    $(tags[len]).remove()
  }

  return $.html()
}

striptags.fetch = function (str, tag) {
  const $ = cheerio.load(str, {decodeEntities: false})
  if (!tag) return str

  return $(tag).html()
}

function convert (str) {
  str = str.replace(/(&#x)(\w{4});/gi, function ($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16))
  })
  return str
}

function wrap (render) {
  return function () {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">')
  }
}

// Generator loaders for .md files
exports.mdLoaders = function () {
  return [
    {
      test: /.md$/,
      loader: 'vue-markdown-loader',
      options: {
        preprocess (MarkdownIt, source) {
          MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence)
          return source
        },
        use: [
          [require('markdown-it-container'), 'demo', {
            validate (params) {
              return params.trim().match(/^demo\s*(.*)$/)
            },

            render (tokens, idx) {
              const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
              if (tokens[idx].nesting === 1) {
                const description = (m && m.length > 1) ? m[1] : ''
                const content = tokens[idx + 1].content
                const html = convert(striptags.strip(content, ['script', 'style'])).replace(/(<[^>]*)=""(?=.*>)/g, '$1')
                const descriptionHTML = description
                  ? md.render(description)
                  : ''

                return `<demo-block class="demo-box">
                          <template slot="source">${striptags.fetch(html, 'template')}</template>
                          ${descriptionHTML}
                          <template slot="highlight">`
              }
              return '</template></demo-block>\n'
            }
          }]
        ]
      }
    }
  ]
}
