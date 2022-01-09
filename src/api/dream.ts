import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
import { genDate, gen, genRandColor } from 'src/helpers/bmob'
import dateApi from './date'
const findAllDream = async () => {
  const query = Bmob.Query('dream')
  const dreams = await (query.find() as unknown as Dream[])
  return dreams
}
const findDream = async (dreamId:string) => {
  const query = Bmob.Query('dream')
  query.equalTo('id', '==', dreamId)
  return gen<Dream>(query.find())
}
const addDream = async (dream:Dream) => {
  const query = Bmob.Query('dream')
  query.set('name', dream.name)
  query.set('status', dream.status as any)
  query.set('note', dream.note ?? '')
  query.set('imgUrl', dream.imgUrl ?? '')
  query.set('color', genRandColor())
  query.set('timeConsuming', 0 as any)
  return gen<BaseBmobItem>(query.save())
}
const updateDream = async (dream:Dream) => {
  const query = Bmob.Query('dream')
  query.set('id', dream.objectId)
  query.set('name', dream.name)
  return gen<BaseBmobItem>(query.save())
}
const deleteDream = async (dreamId:string) => {
  const query = Bmob.Query('dream')
  return gen<BaseBmobItem>(query.destroy(dreamId))
}
const completeDream = async (dreamId:string) => {
  const query = Bmob.Query('dream')
  query.set('id', dreamId)
  query.set('status', 'complete')
  return gen<BaseBmobItem>(query.save())
}

const findAllGoal = async () => {
  const query = Bmob.Query('goal')
  query.include('dreamFk')
  const goals = await (query.find() as unknown as Goal[])
  return goals
}
const findGoal = async (goalId:string) => {
  const query = Bmob.Query('goal')
  query.equalTo('id', '==', goalId)
  return gen<Goal>(query.find())
}
const findGoalByDream = async (dreamId:string) => {
  const query = Bmob.Query('goal')
  query.equalTo('dreamFk', '==', dreamId)
  query.include('dreamFk')
  return gen<Goal[]>(query.find())
}
const addGoal = async (goal:Goal, dreamId:string) => {
  const query = Bmob.Query('goal')
  const pointer = Bmob.Pointer('dream')
  query.set('dreamFk', pointer.set(dreamId) as any)
  query.set('name', goal.name)
  query.set('deadline', genDate(goal.deadlineParam) as any)
  query.set('priority', goal.priority as any)
  query.set('color', genRandColor())
  query.set('status', goal.status as any)
  query.set('note', goal.note ?? '')
  query.set('imgUrl', goal.imgUrl ?? '')
  query.set('timeConsuming', 0 as any)
  return gen<BaseBmobItem>(query.save())
}
const updateGoal = async (goal:Goal) => {
  const query = Bmob.Query('goal')
  query.set('id', goal.objectId)
  query.set('name', goal.name)
  query.set('deadline', goal.deadline as any)
  query.set('priority', goal.priority as any)
  query.set('color', goal.color)
  query.set('status', goal.status as any)
  return gen<BaseBmobItem>(query.save())
}
const deleteGoal = async (goalId:string) => {
  const query = Bmob.Query('goal')
  return gen<BaseBmobItem>(query.destroy(goalId))
}
const completeGoal = async (goalId:string) => {
  const query = Bmob.Query('goal')
  query.set('id', goalId)
  query.set('status', 'complete')
  return gen<BaseBmobItem>(query.save())
}

const findAllTask = async () => {
  const query = Bmob.Query('task')
  const tasks = await (query.find() as unknown as Task[])
  return tasks
}
const findTaskByGoal = async (goalId:string) => {
  const query = Bmob.Query('task')
  query.equalTo('goalFk', '==', goalId)
  query.include('goalFk')
  return gen<Task[]>(query.find())
}
const findTask = async (taskId:string) => {
  const query = Bmob.Query('task')
  query.equalTo('id', '==', taskId)
  return gen<Task>(query.find())
}
const addTask = async (task:Task, goalId:string) => {
  const query = Bmob.Query('task')
  const pointer = Bmob.Pointer('goal')
  query.set('goalFk', pointer.set(goalId) as any)
  query.set('name', task.name)
  query.set('priority', task.priority as any)
  query.set('color', genRandColor())
  query.set('status', task.status as any)
  query.set('note', task.note ?? '')
  query.set('imgUrl', task.imgUrl ?? '')
  query.set('timeConsuming', 0 as any)
  if (task.timePeriod) {
    query.set('timePeriodStart', genDate(task.timePeriod[0]) as any)
    query.set('timePeriodEnd', genDate(task.timePeriod[1]) as any)
  }

  return gen<BaseBmobItem>(query.save())
}
const updateTask = async (task:Task) => {
  const query = Bmob.Query('task')
  query.set('id', task.objectId)
  query.set('name', task.name)
  query.set('priority', task.priority as any)
  query.set('color', task.color)
  query.set('status', task.status as any)
  query.set('timePeriodStart', task.timePeriodStart as any)
  query.set('timePeriodEnd', task.timePeriodEnd as any)
  return gen<BaseBmobItem>(query.save())
}
const deleteTask = async (taskId:string) => {
  const query = Bmob.Query('task')
  return gen<BaseBmobItem>(query.destroy(taskId))
}

const completeTask = async (taskId:string) => {
  const query = Bmob.Query('task')
  query.set('id', taskId)
  query.set('status', 'complete')
  return gen<BaseBmobItem>(query.save())
}

const findAllTodo = async () => {
  const query = Bmob.Query('todo')
  const todos = await (query.find() as unknown as Todo[])
  return todos
}
const findTodo = async (todoId:string) => {
  const query = Bmob.Query('todo')
  query.equalTo('id', '==', todoId)
  return gen<Todo>(query.find())
}
const findTodoByTask = async (taskId:string, status:string = 'ready') => {
  const query = Bmob.Query('todo')
  if (taskId) {
    query.equalTo('taskFk', '==', taskId)
  }
  query.equalTo('status', '!=', 'complete')
  query.equalTo('status', '==', status)
  query.include('taskFk')
  return gen<Todo[]>(query.find())
}
const addTodo = async (todo:Todo, taskId:string) => {
  const query = Bmob.Query('todo')
  const pointer = Bmob.Pointer('task')
  query.set('taskFk', pointer.set(taskId) as any)
  query.set('name', todo.name)
  query.set('priority', todo.priority as any)
  query.set('status', todo.status as any)
  query.set('note', todo.note ?? '')
  query.set('imgUrl', todo.imgUrl ?? '')
  query.set('timeConsuming', 0 as any)
  return gen<BaseBmobItem>(query.save())
}
const updateTodo = async (todo:Todo) => {
  const query = Bmob.Query('todo')
  query.set('id', todo.objectId)
  query.set('name', todo.name)
  query.set('priority', todo.priority as any)
  query.set('color', todo.color)
  query.set('status', todo.status as any)
  query.set('timeConsuming', todo.timeConsuming as any)
  return gen<BaseBmobItem>(query.save())
}
const updateTodoStatus = async (todoId: string, status:Status) => {
  console.log('🚀 ~ file: dream.ts ~ line 194 ~ updateTodoStatus ~ todoId', todoId)
  const query = Bmob.Query('todo')
  query.set('id', todoId)
  query.set('status', status as any)
  // console.log('🚀 ~ file: dream.ts ~ line 197 ~ updateTodoStatus ~ query', query)
  return gen<BaseBmobItem>(query.save())
}
const deleteTodo = async (todoId:string) => {
  const query = Bmob.Query('todo')
  return gen<BaseBmobItem>(query.destroy(todoId))
}
const completeTodo = async (todoId:string) => {
  const query = Bmob.Query('todo')
  query.set('id', todoId)
  query.set('status', 'complete')
  return gen<BaseBmobItem>(query.save())
}

export default {
  findAllDream,
  addDream,
  completeDream,
  findAllGoal,
  findGoalByDream,
  completeGoal,
  addGoal,
  findTaskByGoal,
  addTask,
  findTodoByTask,
  completeTask,
  addTodo,
  completeTodo,
  updateTodoStatus
}
