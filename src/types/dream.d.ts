type Dream = BaseTask
type BaseTask = {
  objectId: string,
  priority: number,
  color: string,
  status: string,
  name: string,
  timeConsuming:number,
  completeTime:BmobDate,
}
type Goal = {
  dreamFk: Pointer,
  deadline: BmobDate
}&BaseTask
type Task = {
  goalFk: Pointer,
  timePeriodStart: BmobDate,
  timePeriodEnd: BmobDate,
}&BaseTask
type Todo = {
  taskFk: Pointer,
}&BaseTask

type Status = 'ready' | 'inProgress' | 'complete'
