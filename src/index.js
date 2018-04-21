import './styles/index.scss'

import IndexFilter from './components/IndexFilter'
import LogicSelector from './components/LogicSelector'
import Menu from './components/Menu'

const components = [
  IndexFilter,
  LogicSelector,
  Menu
]

export default function installBdiUI (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
