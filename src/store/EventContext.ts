import { createContext } from 'react'
interface IEvent<T> {
  event$:any
}
export const EventContext = createContext({} as IEvent<any>)
