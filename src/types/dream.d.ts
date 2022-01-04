type Dream = BaseTask
type BaseTask = {
  objectId: string,
  priority: number,
  color: string,
  isCompleted: boolean,
  name: string,
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
  timeConsuming:number,
  taskFk: Pointer,
}
