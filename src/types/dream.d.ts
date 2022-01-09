type Dream = Omit<BaseTask, 'priority'>
type BaseTask = {
  objectId: string,
  priority: number,
  color: string,
  status: string,
  name: string,
  timeConsuming:number,
  completeTime:BmobDate,
  note?:string,
  imgUrl?: string
}
type Goal = {
  dreamFk: Dream,
  deadline: BmobDate,
  deadlineParam: string,
}&BaseTask
type Task = {
  goalFk: Goal,
  timePeriod: string[],
  timePeriodStart?: BmobDate,
  timePeriodEnd?: BmobDate,
}&BaseTask
type Todo = {
  taskFk: Task,
}&BaseTask

type Status = 'ready' | 'inProgress' | 'complete'
