import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
import { genDate, gen } from 'src/helpers/bmob'
const findDietToday = async () => {
  const todayWeekDay = new Date(Date.now()).getDay()
  const query = Bmob.Query('diet')
  query.equalTo('weekDay', '==', todayWeekDay)
  const list = await (query.find() as unknown as Diet[])
  return list[0]
}
const getDiet = async () => {
  const query = Bmob.Query('diet')
  const list = await (query.find() as unknown as Diet[])
  return list.map(item => {
    (item as any).key = item.objectId
    return item
  })
}
const updateDiet = async (id:string, obj:IAnyPropObject) => {
  const query = Bmob.Query('diet')
  query.set('id', id)
  Object.keys(obj).forEach((key) => {
    query.set(key as any, obj[key])
  })
  return gen<BaseBmobItem>(query.save())
}
export default {
  findDietToday,
  getDiet,
  updateDiet
}
