import { RouteConfig } from 'react-router-config'
import Todo from 'src/pages/Todo'
import Tomato from 'src/pages/Tomato'
const routeList: RouteConfig[] = [
  {
    path: '/Todo',
    component: Todo
  },
  {
    path: '/Tomato',
    component: Tomato
  }
]
export default routeList
