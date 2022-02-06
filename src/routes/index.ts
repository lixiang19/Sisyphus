import { RouteConfig } from 'react-router-config'
import Todo from 'src/pages/Todo'
import Tomato from 'src/pages/Tomato'
import Demo from 'src/pages/Demo'
import OneDay from 'src/pages/OneDay'
import DreamManager from 'src/pages/DreamManager'
import Dream from 'src/pages/Dream'
import Goal from 'src/pages/Goal'
import Task from 'src/pages/Task'
import Diet from 'src/pages/Diet'
const routeList: RouteConfig[] = [
  {
    path: '/',
    exact: true,
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
  },
  {
    path: '/dreamManager',
    component: DreamManager
  },
  {
    path: '/dream',
    component: Dream
  },
  {
    path: '/goal',
    component: Goal
  },
  {
    path: '/task',
    component: Task
  },
  {
    path: '/diet',
    component: Diet
  }
]
export default routeList
