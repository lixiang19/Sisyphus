import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
import { genDate, gen, genRandColor, genStatusTag, genConsumingTag } from 'src/helpers/bmob'
import dateApi from './date'

async function findOrderByTableName (tableName:string) {
  const query = Bmob.Query('order')
  query.equalTo('tableName', '==', tableName)
  const orders = await (query.find() as unknown as Order[])

  const order = orders[0]

  const orderList = order.orderList
  const orderMap:IAnyPropObject = orderList.reduce((map, item, index) => {
    (map as any)[item] = index
    return map
  }, {})
  return {
    order,
    orderList,
    orderMap
  }
}
async function addOrderByTableName (tableName:string, objectId:string) {
  const query = Bmob.Query('order')
  const { order, orderList } = await findOrderByTableName(tableName)
  query.set('id', order.objectId)
  orderList.push(objectId)
  query.set('orderList', orderList as unknown as string)
  return gen<BaseBmobItem>(query.save())
}
async function deleteOrderByTableName (tableName:string, objectId:string) {
  const query = Bmob.Query('order')
  const { order, orderList } = await findOrderByTableName(tableName)
  query.set('id', order.objectId)
  orderList.splice(orderList.indexOf(objectId), 1)
  query.set('orderList', orderList as unknown as string)
  return gen<BaseBmobItem>(query.save())
}
async function updateOrderByTableName (tableName: string, targetOrder: number, sourceOrder:number) {
  const query = Bmob.Query('order')
  const { order, orderList } = await findOrderByTableName(tableName)
  query.set('id', order.objectId)
  const temp = orderList.splice(sourceOrder, 1)[0]
  if (!temp) {
    return
  }

  orderList.splice(targetOrder, 0, temp)

  query.set('orderList', orderList as unknown as string)
  return gen<BaseBmobItem>(query.save())
}
async function sortItAndSetOrder<T extends BaseTask> (tableName:string, list:T[]) {
  const { orderMap } = await findOrderByTableName(tableName)
  list.sort((first, second) => {
    const order = orderMap[first.objectId]
    first.order = order
    const order2 = orderMap[second.objectId]
    second.order = order2
    if (order < order2) { // 按某种排序标准进行比较, a 小于 b
      return -1
    }
    if (order > order2) {
      return 1
    }
    return 0
  })
  return list
}
export default {
  findOrderByTableName,
  updateOrderByTableName,
  sortItAndSetOrder,
  addOrderByTableName,
  deleteOrderByTableName
}
