import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
import { genDate, gen, genRandColor, genStatusTag, genConsumingTag, genParentTag, genPriorityTag, genCountdownDay } from 'src/helpers/bmob'
import dateApi from './date'
import orderApi from './order'
async function setTagList<T extends Goal> (obj:T) {
  const statusTag = genStatusTag(obj.status)
  const priorityTag = genPriorityTag(obj.priority)
  const consumingTag = genConsumingTag(obj.timeConsuming)
  const countdownDay = genCountdownDay(obj.deadline.iso)
  const parentTag = genParentTag(obj.dreamFk)
  obj.tagList = [parentTag, priorityTag, statusTag, countdownDay, consumingTag]

  return obj
}

const filterGoal = async (obj:IAnyPropObject) => {
  const query = Bmob.Query('goal')
  obj && Object.keys(obj).forEach((key) => {
    query.equalTo(key as any, '==', obj[key])
  })
  query.include('dreamFk')
  const goals = await (query.find() as unknown as Goal[])
  goals.forEach((goal) => {
    return setTagList(goal)
  })
  const list = await orderApi.sortItAndSetOrder('goal', goals)
  return list
}
const filterAndGroupGoal = async (groupBy:string, group:Options[], obj:IAnyPropObject) => {
  const query = Bmob.Query('goal')
  const map:Record<string, Goal[]> = {}
  for (const item of group) {
    query.equalTo(groupBy, '==', item.value)
    obj && Object.keys(obj).forEach((key) => {
      query.equalTo(key as any, '==', obj[key])
    })
    query.include('dreamFk')
    const goals = await (query.find() as unknown as Goal[])
    goals.forEach((goal) => {
      return setTagList(goal)
    })
    map[item.value] = await orderApi.sortItAndSetOrder('goal', goals)
  }
  return map
}
const updateGoal = async (id:string, obj:IAnyPropObject, targetOrder:number, sourceOrder:number) => {
  const query = Bmob.Query('goal')
  query.set('id', id)
  Object.keys(obj).forEach((key) => {
    query.set(key as any, obj[key])
  })
  orderApi.updateOrderByTableName('goal', targetOrder, sourceOrder)
  return gen<BaseBmobItem>(query.save())
}
const completeItem = async (id:string) => {
  const query = Bmob.Query('goal')
  const { bombDate } = await dateApi.getTimestamp()
  query.set('completeTime', bombDate as any)
  query.set('id', id)
  query.set('status', 'complete')
  return gen<BaseBmobItem>(query.save())
}
const addGoal = async (goal:Goal&{dreamId:string}) => {
  const query = Bmob.Query('goal')
  const pointer = Bmob.Pointer('dream')
  goal.objectId && query.set('id', goal.objectId)
  query.set('dreamFk', pointer.set(goal.dreamId) as any)
  query.set('name', goal.name)
  query.set('deadline', genDate(goal.deadlineParam) as any)
  query.set('priority', goal.priority as any)
  query.set('color', genRandColor())
  query.set('status', goal.status as any)
  query.set('note', goal.note ?? '')
  query.set('imgUrl', goal.imgUrl ?? '')
  query.set('timeConsuming', 0 as any)
  const { objectId } = await gen<BaseBmobItem>(query.save())
  const res = await orderApi.addOrderByTableName('goal', objectId)

  return res
}
const deleteItem = async (id:string) => {
  const query = Bmob.Query('goal')
  query.destroy(id)
  const res = await orderApi.deleteOrderByTableName('goal', id)
  return res
}
export default {
  filterGoal,
  filterAndGroupGoal,
  updateGoal,
  addGoal,
  deleteItem,
  completeItem
}
