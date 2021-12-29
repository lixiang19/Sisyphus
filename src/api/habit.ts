import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
import { genDate, gen } from 'src/helpers/bmob'
import dateApi from './date'
const findAllHabit = async () => {
  const query = Bmob.Query('mini_habits')
  const habits = await (query.find() as unknown as Habit[])
  return habits
}
const findHabit = async (habitId:string) => {}
const addHabit = async () => {}
const updateHabit = async () => {}
const deleteHabit = async () => {}

const findDateHabitRelationJoin = async (dateId: string) => {
  const query = Bmob.Query('date_habit_relation')
  query.equalTo('dateFk', '==', dateId)
  query.include('dateFk', 'habitFk')
  return gen<DateHabitRelationJoin[]>(query.find())
}
const findTodayHabitRelationJoin = async () => {
  const dateId = await dateApi.checkToday()
  const dateHabitRelation = await findDateHabitRelationJoin(dateId)
  return dateHabitRelation
}
const findDateHabitRelation = async (dateId: string) => {
  const query = Bmob.Query('date_habit_relation')
  query.equalTo('dateFk', '==', dateId)
  return gen<DateHabitRelation[]>(query.find())
}
const addDateHabitRelation = async (habitId: string, dateId: string) => {
  const query = Bmob.Query('date_habit_relation')
  const pointer = Bmob.Pointer('date')
  const pointerDate = pointer.set(dateId)
  const pointer2 = Bmob.Pointer('mini_habits')
  const pointerHabit = pointer2.set(habitId)
  query.set('dateFk', (pointerDate as any))
  query.set('habitFk', (pointerHabit as any))
  query.set('level', 0 as any)
  return gen<BaseBmobItem>(query.save())
}
const updateDateHabitRelation = async (objectId: string, level:number) => {
  const query = Bmob.Query('date_habit_relation')
  query.set('id', objectId) // 需要修改的objectId
  query.set('level', level as any)
  return gen<BaseBmobItem>(query.save())
}
const deleteDateHabitRelation = async () => {}

export default {
  findAllHabit,
  addDateHabitRelation,
  findDateHabitRelation,
  findTodayHabitRelationJoin,
  findDateHabitRelationJoin,
  updateDateHabitRelation
}
