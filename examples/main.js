import Vue from 'vue'
import App from './App'
import './styles/element-variables.scss'
import './styles/index.scss'
import ElementUI from 'element-ui'
import DemoBlock from './components/DemoBlock'

import '../src/styles/index.scss'
import '../src/styles/index-filter.scss'
import BdiIndexFilter from '../src/components/IndexFilter'

Vue.use(ElementUI)

Vue.component('demo-block', DemoBlock)
Vue.component('bdi-index-filter', BdiIndexFilter)

new Vue({
  el: '#app',
  render: h => h(App)
})
