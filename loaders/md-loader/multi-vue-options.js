/**
 * 将多个 vue options 合并为一个，为每个 option 加上 namespace
 * todo:
 *  1. 支持 watch: { handler () {} }
 *  2. computed: { get () {}, set () {} }
 *  3. computed/watch/methods 中用到的 this 支持解构
 */

// example
// const options = {
//   data () {
//     return {
//       a: 'xxx'
//     }
//   },

//   computed: {
//     b () {
//       return this.a + 1
//     }
//   },

//   watch: {
//     'b' (value) {
//       console.log(value)
//     }
//   },

//   methods: {
//     c () {
//       console.log('c')
//     }
//   }
// }

// const result = {
//   data () {
//     return {
//       'v1': {
//         a: 'xxx'
//       }
//     }
//   },

//   computed: {
//     'v1.b' () {
//       return this['v1.a'] + 1
//     }
//   },

//   watch: {
//     'v1.b' (value) {
//       console.log(value)
//     }
//   },

//   methods: {
//     'v1.c' () {
//       console.log('c')
//     }
//   }
// }

const INDENT = '  '

function generateSpace (number) {
  let result = ''
  for (let i = 0; i < number; i++) {
    result += ' '
  }
  return result
}

function toString (obj, space = INDENT) {
  const result = Object.keys(obj).map(key => {
    const value = obj[key]
    let result
    if (Array.isArray(value)) {
      result = key + ': [' + value.map(v => toString(v, space + INDENT)) + ']'
    } else if (typeof value === 'function') {
      const lines = value.toString().split('\n')
      const fnName = lines.shift()
      const extraSpace = lines[0].match(/\W+/)[0].length - space.length - INDENT.length
      result = lines.map(line => {
        return extraSpace > 0 ? line.slice(extraSpace) : generateSpace(extraSpace) + line
      }).join('\n')
      result = fnName + '\n' + result
    } else if (value && typeof value === 'object') {
      result = key + ': ' + toString(value, space + INDENT)
    } else if (typeof value === 'string') {
      result = key + ': ' + `"${value}"`
    } else {
      result = key + ': ' + value
    }
    return space + result
  }).join(',\n')
  return '{\n' + result + '\n' + space.slice(2) + '}'
}

module.exports = class MultiVueOptions {
  constructor () {
    this.options = {}
  }

  _collect (key, type, obj = {}) {
    const option = this.options[type] || (this.options[type] = {})
    const isMethods = type === 'methods'
    Object.keys(obj).forEach(name => {
      const fullKey = isMethods ? `"${key}${name}"` : `"${key}.${name}"`
      option[fullKey] = obj[name]
    })
  }

  _transformLiterals (obj, isMethods) {
    const keys = Object.keys(obj)
    if (!keys.length) return ''

    return keys.map(name => {
      const ns = isMethods
        ? name.match(/v\d+/)[0]
        : name.split('.')[0].slice(1)
      const fnStr = obj[name].toString().replace(/this\.([\w]+)/g, `this.${ns}.$1`)
      return `${name}: function ${fnStr}`
    }).join(',')
  }

  addOptions (key, options) {
    // data
    if (typeof options.data === 'function') {
      options.data = options.data()
    }
    const data = this.options.data || (this.options.data = {})
    data[key] = options.data

    // computed
    this._collect(key, 'computed', options.computed)
    // watch
    this._collect(key, 'watch', options.watch)
    // methods
    this._collect(key, 'methods', options.methods)
  }

  toTemplate () {
    const {
      data = {},
      computed = {},
      watch = {},
      methods = {}
    } = this.options
    return `
<script>
export default {
  data () {
    return ${toString(data, generateSpace(6))}
  },
  computed: {
    ${this._transformLiterals(computed)}
  },
  watch: {
    ${this._transformLiterals(watch)}
  },
  methods: {
    ${this._transformLiterals(methods, true)}
  }
}
</script>
    `.trim() + '\n'
  }
}
