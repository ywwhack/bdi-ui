import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/index.scss'
import ElementUI from 'element-ui'
import DemoBlock from './components/DemoBlock'

import BdiIndexFilter from '../src/components/IndexFilter'
import BdiLogicSelector from '../src/components/LogicSelector'
import BdiSidebar from '../src/components/Sidebar'
import BdiLoading from '../src/components/Loading'

Vue.use(ElementUI)

Vue.component('demo-block', DemoBlock)
Vue.component('bdi-index-filter', BdiIndexFilter)
Vue.component('bdi-logic-selector', BdiLogicSelector)
Vue.component('bdi-sidebar', BdiSidebar)
Vue.component('bdi-loading', BdiLoading)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
