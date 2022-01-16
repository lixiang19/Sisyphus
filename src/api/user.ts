import Bmob from 'hydrogen-js-sdk'
import { genDate, gen } from 'src/helpers/bmob'
import dateApi from './date'
import habitApi from './habit'
Bmob.initialize('f0f490ebe4ca47d3', '123456')

const login = () => {
  return gen(Bmob.User.login('li', '123456'))
}
const test = async () => {
  // const query = Bmob.Query('goal')
  // const orderQuery = Bmob.Query('order')
  // orderQuery.equalTo('tableName', '==', 'goal')
  // const orders = await (orderQuery.find() as unknown as Order[])
  // const orderList = orders[0].orderList
  // const orderMap:IAnyPropObject = orderList.reduce((map, item, index) => {
  //   (map as any)[item] = index
  //   return map
  // }, {})

  // dreamId && query.equalTo('dreamFk', '==', dreamId)
  // query.include('dreamFk')
  // const goals = await (query.find() as unknown as Goal[])
  // goals.sort((first, second) => {
  //   const order = orderMap[first.objectId]
  //   const order2 = orderMap[second.objectId]
  //   if (order < order2) { // 按某种排序标准进行比较, a 小于 b
  //     return -1
  //   }
  //   if (order > order2) {
  //     return 1
  //   }
  //   // a must be equal to b
  //   return 0
  // })
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
  await test()
  return res
}
export default {
  login,
  preload
}
