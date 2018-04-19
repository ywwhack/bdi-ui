import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import BdiUI from '../src'

Vue.use(ElementUI)
Vue.use(BdiUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
