import Bmob from 'hydrogen-js-sdk'
import { genDate, gen } from 'src/helpers/bmob'
import dateApi from './date'
import habitApi from './habit'
Bmob.initialize('f0f490ebe4ca47d3', '123456')

const login = () => {
  return gen(Bmob.User.login('li', '123456'))
}
const checkToday = async () => {
  const { datetime } = await (Bmob.timestamp() as Promise<any>)
  const dates = await dateApi.findDay(datetime)
  let dateId = null
  if (dates.length === 0) {
    const { objectId } = await dateApi.addDate(datetime)
    dateId = objectId
  } else {
    const { objectId } = dates[0]
    dateId = objectId
  }
  return dateId
}
const initTodayDateHabitRelation = async () => {
  const dateId = await checkToday()
  const dateHabitRelation = await habitApi.findDateHabitRelation(dateId)
  if (dateHabitRelation.length !== 0) return
  const habits = await habitApi.findAllHabit()
  habits.forEach(async habit => {
    const res = await habitApi.addDateHabitRelation(habit.objectId, dateId)
  })
}

const preload = async () => {
  const res = await login()
  await checkToday()
  await initTodayDateHabitRelation()
  return res
}
export default {
  login,
  preload
}
