import './styles/index.scss'

import IndexFilter from './components/IndexFilter'
import LogicSelector from './components/LogicSelector'
import Sidebar from './components/Sidebar'

const components = [
  IndexFilter,
  LogicSelector,
  Sidebar
]

export default function installBdiUI (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
