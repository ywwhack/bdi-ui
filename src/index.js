import './styles/index.scss'

import IndexFilter from './components/IndexFilter'
import LogicSelector from './components/LogicSelector'
import Sidebar from './components/Sidebar'
import Loading from './components/Loading'

const components = [
  IndexFilter,
  LogicSelector,
  Sidebar,
  Loading
]

export default function installBdiUI (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
