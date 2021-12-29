import Bmob from 'hydrogen-js-sdk'
import { genDate, gen } from 'src/helpers/bmob'
import dateApi from './date'
import habitApi from './habit'
Bmob.initialize('f0f490ebe4ca47d3', '123456')

const login = () => {
  return gen(Bmob.User.login('li', '123456'))
}

const initTodayDateHabitRelation = async () => {
  const dateId = await dateApi.checkToday()
  const dateHabitRelation = await habitApi.findDateHabitRelation(dateId)
  if (dateHabitRelation.length !== 0) return
  const habits = await habitApi.findAllHabit()
  habits.forEach(async habit => {
    const res = await habitApi.addDateHabitRelation(habit.objectId, dateId)
  })
}

const preload = async () => {
  const res = await login()
  await dateApi.checkToday()
  await initTodayDateHabitRelation()
  return res
}
export default {
  login,
  preload
}
