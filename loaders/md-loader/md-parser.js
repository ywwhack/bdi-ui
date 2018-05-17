const markdownIt = require('markdown-it')
const cheerio = require('cheerio')
const MultiVueOptions = require('./multi-vue-options')
const hljs = require('highlight.js')

function stripTag (str, tag) {
  const $ = cheerio.load(str, { decodeEntities: false })
  if (!tag) return str

  return $(tag).html()
}

/**
 * renderHighlight
 * @param  {string} str
 * @param  {string} lang
 */
function renderHighlight (str, lang) {
  if (!(lang && hljs.getLanguage(lang))) {
    return ''
  }
  return hljs.highlight(lang, str, true).value
}

function convert (str) {
  if (!str) return ''
  return str.replace(/(&#x)(\w{4});/gi, function ($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16))
  })
}

function wrap (render) {
  return function () {
    return render.apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">')
  }
}

/**
 * html => vue file template
 * @param  {[type]} html [description]
 * @return {[type]}      [description]
 */
function renderVueTemplate (html) {
  const $ = cheerio.load(html, {
    lowerCaseAttributeNames: false,
    lowerCaseTags: false
  })

  const output = {
    template: convert($('body').html()),
    style: convert($.html('style')),
    script: convert($.html('script'))
  }

  $('style').remove()
  $('script').remove()

  return '<template>\n<section>' +
    output.template +
    '</section>\n</template>\n' +
    output.script +
    '\n' +
    output.style
}

/**
 * `<pre></pre>` => `<pre v-pre></pre>`
 * `<code></code>` => `<code v-pre></code>`
 * @param  {string} str
 * @return {string}
 */
function addVuePreviewAttr (str) {
  return str.replace(/(<pre|<code)/g, '$1 v-pre')
}

/**
 * override default parser rules by adding v-pre attribute on 'code' and 'pre' tags
 * @param {Array<string>} rules rules to override
 */
function overrideParserRules (parser, rules) {
  const parserRules = parser.renderer.rules
  rules.forEach(rule => {
    if (parserRules[rule]) {
      const defaultRule = parserRules[rule]
      parserRules[rule] = function () {
        return addVuePreviewAttr(defaultRule.apply(this, arguments))
      }
    }
  })
}

// vue-loader 会执行多次 md-parser，防止重复执行 parse 过程，将结果缓存下来
const cache = {
  // '/path/to/index-filter.md': {
  //   source: 'aaa',
  //   compiled: 'xxx'
  // }
}

module.exports = function (source) {
  const resourcePath = this.resourcePath
  if (cache[resourcePath] && cache[resourcePath].source === source) {
    return cache[resourcePath].compiled
  }

  this.cacheable()

  let id = 0
  function getVid () {
    return 'v' + id++
  }
  const contentMap = {}
  const multiVueOptions = new MultiVueOptions()

  const parser = markdownIt({
    preset: 'default',
    html: true,
    highlight: renderHighlight
  })

  overrideParserRules(parser, ['code_inline', 'code_block', 'fence'])
  parser.renderer.rules.fence = wrap(parser.renderer.rules.fence)
  parser.renderer.rules.table_open = () => '<table class="table">'
  parser.use(require('markdown-it-container'), 'demo', {
    validate (params) {
      return params.trim().match(/^demo\s*(.*)$/)
    },

    render (tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        const description = (m && m.length > 1) ? m[1] : ''
        const content = tokens[idx + 1].content
        const html = convert(stripTag(content, 'template')).replace(/(<[^>]*)=""(?=.*>)/g, '$1')
        const js = stripTag(content, 'script').replace(/'/g, '"')
        const style = stripTag(content, 'style')
        const descriptionHTML = description
          ? parser.render(description)
          : ''

        // 为每个 demo-block 动态绑定变量
        let bindHtml
        let vid
        const currentKey = idx + parser.utils.escapeHtml(html)
        if (contentMap[currentKey]) {
          const content = contentMap[currentKey]
          vid = content.vid
          bindHtml = content.html
        } else {
          vid = getVid()
          bindHtml = html.replace(/(:|__at__)([^"]+)="([^"]+)"/g, function ($0, $1, $2, $3) {
            return $1 === ':' ? `${$1}${$2}="${vid}.${$3}"` : `${$1}${$2}="${vid}${$3}"`
          })
          contentMap[currentKey] = {
            html: bindHtml,
            vid
          }
        }
        let jsObj
        /* eslint-disable */
        eval(js.replace(/(export\W+default)/, 'jsObj = '))
        multiVueOptions.addOptions(vid, jsObj)

        const codesandbox = parser.utils.escapeHtml(JSON.stringify({ html, js, style }))

        return `<demo-block class="demo-box" :codesandbox="${codesandbox}">
                  <template slot="source">${bindHtml}</template>
                  ${descriptionHTML}
                  <template slot="highlight">`
      }
      return `</template></demo-block>`
    }
  })

  let result = source.replace(/@/g, '__at__')
  result = parser.render(result)
  result = multiVueOptions.toTemplate() + result
  result = renderVueTemplate(result).replace(/__at__/g, '@')

  cache[resourcePath] = {
    source,
    compiled: result
  }

  return result
}
