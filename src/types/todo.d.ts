interface INotionSelect {
  id: string
  name: string
  color: string
}
interface ITodoItem {
  pageId: string
  title: string
  tag?: ITodoSelect
  status: INotionSelect
  lastEditedTime: string
  createdTime: string
  checked: boolean
}
interface ITodoListMap {
  followedTodos: ITodoItem[]
  immediatelyTodo: ITodoItem[]
}
interface IGoalItem {
  pageId: string
  title: string
  dream?: INotionSelect
  countdown: number
  deadline: string
}
interface ICourseItem {
  pageId: string
  title: string
  goal?: INotionSelect
  period: {
    start: string
    end: string
  }
}
