import { createContext } from 'react'
interface IAction<T> {
  cardClick?: (data: T) => void,
  deleteClick?: (data: T) => void
}
const ActionContext = createContext({} as IAction<any>)
interface IViewProvider {
  children: React.ReactNode
}
function ViewProvider({ children }: IViewProvider) {
  return (
    <ActionContext.Provider value={{}}>
      {children}
    </ActionContext.Provider>)
}