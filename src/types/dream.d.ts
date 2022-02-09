type Dream = Omit<BaseTask, 'priority'>
type BaseCard = {
  objectId: string
  name: string
  imgUrl?: string
  note?: string
  tagList?: Tag[]
}
type Tag = {
  label: string
  color: string
  value: string|number
}
type BaseTask = {
  objectId: string,
  priority?: number,
  color: string,
  status: string,
  name: string,
  timeConsuming:number,
  completeTime:BmobDate,
  note?:string,
  imgUrl?: string,
  tagList: Tag[],
  order?: number,
}
type Goal = {
  dreamFk: Dream,
  deadline: BmobDate,
  deadlineParam: string,
}&Required<BaseTask>
type Task = {
  goalFk: Goal,
  timePeriod: string[],
  timePeriodStart: BmobDate,
  timePeriodEnd: BmobDate,
}&Required<BaseTask>
type Todo = {
  taskFk: Task,
}&Required<BaseTask>

type Status = 'ready' | 'inProgress' | 'complete'
type Options = {
  label: string,
  color?: string,
  value: string|number,
}
type Order = {
  tableName: string,
  orderList: string[],
}&BaseBmobItem
type GroupBy = 'status' | 'priority'
