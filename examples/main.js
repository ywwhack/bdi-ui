import Vue from 'vue'
import App from './App'
import BdiUI from '../src'

Vue.use(BdiUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
