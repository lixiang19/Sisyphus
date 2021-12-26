import { RouteConfig } from 'react-router-config'
import Todo from 'src/pages/Todo'
import Tomato from 'src/pages/Tomato'
import Demo from 'src/pages/Demo'
import OneDay from 'src/pages/OneDay'
const routeList: RouteConfig[] = [
  {
    path: '/',
    component: OneDay
  },
  {
    path: '/todo',
    component: Todo
  },
  {
    path: '/tomato',
    component: Tomato
  },
  {
    path: '/demo',
    component: Demo
  }
]
export default routeList
