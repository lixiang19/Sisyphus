import { RouteConfig } from 'react-router-config'
import Todo from 'src/pages/Todo'
import Tomato from 'src/pages/Tomato'
import Demo from 'src/pages/Demo'

const routeList: RouteConfig[] = [
  {
    path: '/Todo',
    component: Todo
  },
  {
    path: '/Tomato',
    component: Tomato
  },
  {
    path: '/Demo',
    component: Demo
  }
]
export default routeList
