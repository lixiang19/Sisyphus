import { RouteConfig } from 'react-router-config'
import TaskConfigure from 'src/pages/TaskConfigure'
import Tomato from 'src/pages/Tomato'
const routeList: RouteConfig[] = [
  {
    path: '/',
    component: TaskConfigure
  },
  {
    path: '/Tomato',
    component: Tomato
  }
]
export default routeList
