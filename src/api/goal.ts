import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
import { genDate, gen, genRandColor, genStatusTag, genConsumingTag } from 'src/helpers/bmob'
import dateApi from './date'
import orderApi from './order'
async function setTagList<T extends BaseTask> (obj:T) {
  const statusTag = genStatusTag(obj.status)
  const consumingTag = genConsumingTag(obj.timeConsuming)
  obj.tagList = [statusTag, consumingTag]
  return obj
}

const filterGoal = async (obj:IAnyPropObject) => {
  const query = Bmob.Query('goal')
  obj && Object.keys(obj).forEach((key) => {
    query.equalTo(key as any, '==', obj[key])
  })
  query.include('dreamFk')
  const goals = await (query.find() as unknown as Goal[])
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
export default {
  filterGoal,
  filterAndGroupGoal,
  updateGoal
}
