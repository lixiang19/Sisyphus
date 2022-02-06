import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
import { genDate, gen, genRandColor, genStatusTag, genPriorityTag, genConsumingTag, genParentTag } from 'src/helpers/bmob'
import dateApi from './date'
import orderApi from './order'
async function setTagList<T extends Todo> (obj:T) {
  const statusTag = genStatusTag(obj.status)
  const priorityTag = genPriorityTag(obj.priority)
  const consumingTag = genConsumingTag(obj.timeConsuming)
  const parentTag = genParentTag(obj.taskFk)
  obj.tagList = [parentTag, priorityTag, statusTag, consumingTag]
  return obj
}

const filterAndGroupTodo = async (groupBy:string, group:Options[], obj:IAnyPropObject, exclude?:IAnyPropObject) => {
  const query = Bmob.Query('todo')
  const map:Record<string, Todo[]> = {}
  for (const item of group) {
    query.equalTo(groupBy, '==', item.value)
    obj && Object.keys(obj).forEach((key) => {
      if (obj[key]) {
        query.equalTo(key as any, '==', obj[key])
      } else {
        query.doesNotExist(key as string)
      }
    })

    exclude && Object.keys(exclude).forEach((key) => {
      query.equalTo(key as any, '!=', exclude[key])
    })
    query.include('taskFk')
    const goals = await (query.find() as unknown as Todo[])
    goals.forEach((goal) => {
      return setTagList(goal)
    })
    map[item.value] = await orderApi.sortItAndSetOrder('todo', goals)
  }

  return map
}
const completeItem = async (id:string) => {
  const query = Bmob.Query('todo')
  const { bombDate } = await dateApi.getTimestamp()
  query.set('completeTime', bombDate as any)
  query.set('id', id)
  query.set('status', 'complete')
  return gen<BaseBmobItem>(query.save())
}
const updateTimeConsumingByTable = async (tableName:string, fkName:string, id:string, timeConsumingAdd:number) => {
  const query = Bmob.Query(tableName)
  const result = await gen(query.get(id)) as any
  result.set('timeConsuming', result.timeConsuming + timeConsumingAdd)
  await gen(result.save())
  if (fkName) {
    return result[fkName].objectId
  } else {
    return true
  }
}
const updateTimeConsuming = async (id:string, timeConsumingAdd:number) => {
  const taskId = await updateTimeConsumingByTable('todo', 'taskFk', id, timeConsumingAdd)
  const goal = await updateTimeConsumingByTable('task', 'goalFk', taskId, timeConsumingAdd)
  const dreamId = await updateTimeConsumingByTable('goal', 'dreamFk', goal, timeConsumingAdd)
  await updateTimeConsumingByTable('dream', '', dreamId, timeConsumingAdd)
}
const updateTodo = async (id:string, obj:IAnyPropObject, targetOrder?:number, sourceOrder?:number) => {
  const query = Bmob.Query('todo')
  if (obj.updateTimeConsuming) {
    await updateTimeConsuming(id, obj.timeConsuming)
  } else {
    query.set('id', id)
    Object.keys(obj).forEach((key) => {
      query.set(key as any, obj[key])
    })
    targetOrder && sourceOrder && orderApi.updateOrderByTableName('todo', targetOrder, sourceOrder)
    return gen<BaseBmobItem>(query.save())
  }
}
const addTodo = async (todo:Todo&{taskId:string}) => {
  const query = Bmob.Query('todo')
  const pointer = Bmob.Pointer('task')
  todo.objectId && query.set('id', todo.objectId)
  todo.taskId && query.set('taskFk', pointer.set(todo.taskId) as any)
  query.set('name', todo.name)
  query.set('priority', todo.priority as any)
  query.set('color', genRandColor())
  query.set('status', todo.status as any)
  query.set('note', todo.note ?? '')
  query.set('imgUrl', todo.imgUrl ?? '')
  query.set('timeConsuming', todo.timeConsuming as any ?? 0)
  const { objectId } = await gen<BaseBmobItem>(query.save())
  const res = await orderApi.addOrderByTableName('todo', objectId)
  return res
}
const deleteItem = async (id:string) => {
  const query = Bmob.Query('todo')
  query.destroy(id)
  const res = await orderApi.deleteOrderByTableName('todo', id)
  return res
}
export default {
  filterAndGroupTodo,
  updateTodo,
  addTodo,
  completeItem,
  deleteItem
}
