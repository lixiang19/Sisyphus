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

const filterAndGroupTodo = async (groupBy:string, group:Options[], obj:IAnyPropObject) => {
  const query = Bmob.Query('todo')
  const map:Record<string, Todo[]> = {}
  for (const item of group) {
    query.equalTo(groupBy, '==', item.value)
    obj && Object.keys(obj).forEach((key) => {
      query.equalTo(key as any, '==', obj[key])
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
const updateTodo = async (id:string, obj:IAnyPropObject, targetOrder:number, sourceOrder:number) => {
  const query = Bmob.Query('todo')
  query.set('id', id)
  Object.keys(obj).forEach((key) => {
    query.set(key as any, obj[key])
  })
  orderApi.updateOrderByTableName('todo', targetOrder, sourceOrder)
  return gen<BaseBmobItem>(query.save())
}
const addTodo = async (todo:Todo&{taskId:string}) => {
  const query = Bmob.Query('todo')
  const pointer = Bmob.Pointer('task')
  query.set('taskFk', pointer.set(todo.taskId) as any)
  query.set('name', todo.name)
  query.set('priority', todo.priority as any)
  query.set('color', genRandColor())
  query.set('status', todo.status as any)
  query.set('note', todo.note ?? '')
  query.set('imgUrl', todo.imgUrl ?? '')
  query.set('timeConsuming', 0 as any)
  const { objectId } = await gen<BaseBmobItem>(query.save())
  const res = await orderApi.addOrderByTableName('todo', objectId)
  return res
}
export default {
  filterAndGroupTodo,
  updateTodo,
  addTodo
}
