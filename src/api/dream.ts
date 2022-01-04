import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
import { genDate, gen } from 'src/helpers/bmob'
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
const findAllGoal = async () => {
  const query = Bmob.Query('goal')
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
  return gen<Goal[]>(query.find())
}
const addGoal = async (goal:Goal) => {
  const query = Bmob.Query('goal')
  query.set('name', goal.name)
  query.set('deadline', goal.deadline as any)
  query.set('priority', goal.priority as any)
  query.set('color', goal.color)
  query.set('isCompleted', goal.isCompleted as any)
  return gen<BaseBmobItem>(query.save())
}
const updateGoal = async (goal:Goal) => {
  const query = Bmob.Query('goal')
  query.set('id', goal.objectId)
  query.set('name', goal.name)
  query.set('deadline', goal.deadline as any)
  query.set('priority', goal.priority as any)
  query.set('color', goal.color)
  query.set('isCompleted', goal.isCompleted as any)
  return gen<BaseBmobItem>(query.save())
}
const deleteGoal = async (goalId:string) => {
  const query = Bmob.Query('goal')
  return gen<BaseBmobItem>(query.destroy(goalId))
}
const findAllTask = async () => {
  const query = Bmob.Query('task')
  const tasks = await (query.find() as unknown as Task[])
  return tasks
}
export default {
  findAllDream,
  findDream,
  addDream,
  updateDream,
  deleteDream
}
