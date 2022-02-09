import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
import { genDate, gen, genRandColor, genParentTag, genPeriodTag, genCountdownDay, genPriorityTag, genTimePeriod, genStatusTag, genConsumingTag } from 'src/helpers/bmob'
import dateApi from './date'
import orderApi from './order'

async function setTagList<T extends Task> (obj:T) {
  const statusTag = genStatusTag(obj.status)
  const priorityTag = genPriorityTag(obj.priority)
  const consumingTag = genConsumingTag(obj.timeConsuming)
  const parentTag = genParentTag(obj.goalFk)
  const periodTag = genPeriodTag(obj.timePeriodStart, obj.timePeriodEnd)
  const timePeriodTag = genTimePeriod(obj.timePeriodStart, obj.timePeriodEnd)
  obj.tagList = [parentTag, priorityTag, statusTag, timePeriodTag, periodTag, consumingTag]
  return obj
}
const filterTask = async (obj:IAnyPropObject) => {
  const query = Bmob.Query('task')
  obj && Object.keys(obj).forEach((key) => {
    query.equalTo(key as any, '==', obj[key])
  })
  query.include('goalFk')
  const tasks = await (query.find() as unknown as Task[])
  const list = await orderApi.sortItAndSetOrder('task', tasks)
  return list
}
const filterTaskTransToScheduleView = async (obj:IAnyPropObject) => {
  const list = await filterTask(Object.assign(obj, { status: 'inProgress' }))

  const events = list.map((item) => {
    const event = {
      id: item.objectId,
      name: item.name,
      start: item.timePeriodStart.iso,
      end: item.timePeriodEnd.iso,
      color: item.color
    }
    return event
  })

  return events
}
const filterAndGroupTask = async (groupBy:string, group:Options[], obj:IAnyPropObject) => {
  const query = Bmob.Query('task')
  const map:Record<string, Task[]> = {}
  for (const item of group) {
    query.equalTo(groupBy, '==', item.value)
    obj && Object.keys(obj).forEach((key) => {
      query.equalTo(key as any, '==', obj[key])
    })
    query.include('goalFk')
    const goals = await (query.find() as unknown as Task[])
    goals.forEach((goal) => {
      return setTagList(goal)
    })
    map[item.value] = await orderApi.sortItAndSetOrder('task', goals)
  }
  return map
}

const updateTask = async (id:string, obj:IAnyPropObject, targetOrder:number, sourceOrder:number) => {
  const query = Bmob.Query('task')
  query.set('id', id)
  Object.keys(obj).forEach((key) => {
    query.set(key as any, obj[key])
  })
  orderApi.updateOrderByTableName('task', targetOrder, sourceOrder)
  return gen<BaseBmobItem>(query.save())
}
const addTask = async (task:Task&{goalId:string}) => {
  const query = Bmob.Query('task')
  const pointer = Bmob.Pointer('dream')
  task.objectId && query.set('id', task.objectId)
  query.set('goalFk', pointer.set(task.goalId) as any)
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
  const { objectId } = await gen<BaseBmobItem>(query.save())
  const res = await orderApi.addOrderByTableName('task', objectId)
  return res
}
const deleteItem = async (id:string) => {
  const query = Bmob.Query('task')
  query.destroy(id)
  const res = await orderApi.deleteOrderByTableName('task', id)
  return res
}
const completeItem = async (id:string) => {
  const query = Bmob.Query('task')

  const { bombDate } = await dateApi.getTimestamp()
  query.set('completeTime', bombDate as any)
  query.set('id', id)
  query.set('status', 'complete')
  return gen<BaseBmobItem>(query.save())
}
export default {
  filterAndGroupTask,
  completeItem,
  updateTask,
  addTask,
  filterTask,
  deleteItem,
  filterTaskTransToScheduleView
}
