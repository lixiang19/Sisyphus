import { createContext } from 'react'
interface IAction<T> {
  routeAction?:(data:T)=>void,
  delete?:(data:T)=>void,
  edit?:(data:T)=>void,
  add?:(data:T)=>void,
  update?:(data:T)=>void,
  complete?:(data:T)=>void,
  filterApi?:(data:T)=>void,
}
export const ActionContext = createContext({} as IAction<any>)
