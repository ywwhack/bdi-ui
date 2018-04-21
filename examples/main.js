import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import BdiUI from '../src'
import DemoBlock from './components/DemoBlock'

Vue.use(ElementUI)
Vue.use(BdiUI)

Vue.component('demo-block', DemoBlock)

new Vue({
  el: '#app',
  render: h => h(App)
})
