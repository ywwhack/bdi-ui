import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/index.scss'
import ElementUI from 'element-ui'
import DemoBlock from './components/DemoBlock'

import '../src/styles/index.scss'
import '../src/styles/index-filter.scss'
import BdiIndexFilter from '../src/components/IndexFilter'
import '../src/styles/logic-selector.scss'
import BdiLogicSelector from '../src/components/LogicSelector'

Vue.use(ElementUI)

Vue.component('demo-block', DemoBlock)
Vue.component('bdi-index-filter', BdiIndexFilter)
Vue.component('bdi-logic-selector', BdiLogicSelector)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
