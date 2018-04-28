const {
  getParameters
} = require('codesandbox/lib/api/define')

function convertTemplateToContent (template) {
  let lines = template.split(/\n/)

  // 去掉首位两行
  lines = lines.slice(1, -1)

  // 除掉每行前置空格
  let prefixSpaceCount = 0
  while (lines[0][prefixSpaceCount] === ' ') {
    prefixSpaceCount++
  }

  lines = lines.map(line => line.slice(prefixSpaceCount))

  return lines.join('\n') + '\n'
}

const indexHtmlContent = convertTemplateToContent(`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <title>BDI-UI</title>
    </head>
    <body>
      <div id="app"></div>
    </body>
  </html>
`)

const mainJsContent = convertTemplateToContent(`
  import Vue from 'vue'
  import 'element-ui/lib/theme-chalk/index.css'
  import ElementUI from 'element-ui'
  import 'bdi-ui/lib/theme-chalk/index.css'
  import BdiUI from 'bdi-ui'
  import App from './App'

  Vue.use(ElementUI)
  Vue.use(BdiUI)

  new Vue({
    el: '#app',
    render: h => h(App)
  })
`)

const form = document.createElement('form')
const parametersInput = document.createElement('input')
const queryInput = document.createElement('input')
form.style.display = 'none'
form.appendChild(parametersInput)
form.appendChild(queryInput)
document.body.appendChild(form)

form.action = 'https://codesandbox.io/api/v1/sandboxes/define'
form.method = 'POST'
form.target = '_blank'
parametersInput.name = 'parameters'
queryInput.name = 'query'

export function gotoCodesandbox (content) {
  const parameters = getParameters({
    files: {
      'index.html': {
        content: indexHtmlContent
      },
      'App.vue': {
        content: content
      },
      'main.js': {
        content: mainJsContent
      },
      'package.json': {
        content: {
          main: 'main.js',
          dependencies: {
            'vue': 'latest',
            'element-ui': 'latest',
            'bdi-ui': 'latest'
          }
        }
      }
    }
  })

  parametersInput.value = parameters
  queryInput.value = 'module=App.vue'
  form.submit()
}
