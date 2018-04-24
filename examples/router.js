import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const routes = []
// 动态加载所有 docs 下的 md 文件，并转化为 Vue component
const context = require.context('./docs', false, /\.md/)
const NAME_RE = /([^/]*)\.md$/
context.keys().forEach(filename => {
  const name = NAME_RE.exec(filename)[1]
  routes.push({
    name,
    path: '/' + name,
    component: Vue.extend(context(filename).default)
  })
})

export default new VueRouter({
  routes
})
