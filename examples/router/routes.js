import Vue from 'vue'
import {
  camelize,
  capitalize
} from 'shared/utils'

const modules = [
  { name: 'quickstart', desc: '快速开始' },
  { name: 'theme', desc: '自定义主题' },
  { name: 'index-filter', desc: '指标筛选器' },
  { name: 'logic-selector', desc: '逻辑筛选器' }
]

const routes = []
// 动态加载所有 docs 下的 md 文件，并转化为 Vue component
const context = require.context('../docs', false, /\.md/)

modules.forEach(({
  name,
  desc
}) => {
  const filename = `./${name}.md`
  routes.push({
    name: capitalize(camelize(name)) + ' ' + desc,
    path: '/' + name,
    component: Vue.extend(context(filename).default)
  })
})

export default routes
