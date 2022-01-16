import { createContext } from 'react'
interface IAction<T> {
  cardClick?:(data:T)=>void
}
export const ActionContext = createContext({} as IAction<any>)
