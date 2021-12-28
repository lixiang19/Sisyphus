import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
import { genDate, gen } from 'src/helpers/bmob'

const findAllHabit = async () => {
  const query = Bmob.Query('mini_habits')
  const habits = await (query.find() as unknown as Habit[])
  return habits
}
const findHabit = async (habitId:string) => {}
const addHabit = async () => {}
const updateHabit = async () => {}
const deleteHabit = async () => {}

const findAllDateHabitRelation = async (dateId: string) => {
  const query = Bmob.Query('date_habit_relation')
  console.log('🚀 ~ file: habit.ts ~ line 17 ~ findAllDateHabitRelation ~ query', query)
  query.equalTo('dateFk', '==', dateId)
  query.include('dateFk', 'habitFk')
  return gen<BaseBmobItem>(query.find())
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
const updateDateHabitRelation = async () => {}
const deleteDateHabitRelation = async () => {}
// const findDateHabitRelation = async (dateId: string) => {
//   const query = Bmob.Query('date_habit_relation')
//   query.equalTo('dateId', '==', dateId)
//   return gen<DateHabitRelation>(query.find())
//   //
// }

// const findDateHabitRelationCheckDate = async () => {
//   const res = await findDateHabitRelation(dateId)
//   return res as DateHabitRelation[]
// }
// const findHabits = async () => {
//   const query = Bmob.Query('mini_habits')
//   const habits = await (query.find() as unknown as Habit[])
//   return habits
// }
// const findAllHabit = async () => {
//   const DateHabitRelations = await findDateHabitRelationCheckDate()
//   const query = Bmob.Query('mini_habits')
//   const habits = await (query.find() as unknown as Habit[])
//   habits.forEach(habit => {
//     const DateHabitRelation = DateHabitRelations.find(h => h.habitFk.objectId === habit.objectId)
//     if (DateHabitRelation) {
//       (habit as HabitOneDay).level = DateHabitRelation.level;
//       (habit as HabitOneDay).dateId = DateHabitRelation.dateFk.objectId;
//       (habit as HabitOneDay).habitDateId = DateHabitRelation.objectId
//     } else {
//       (habit as HabitOneDay).level = 0
//     }
//   })
//   return habits as HabitOneDay[]
// }
export default {
  findAllHabit,
  addDateHabitRelation,
  findDateHabitRelation,
  findAllDateHabitRelation
}
