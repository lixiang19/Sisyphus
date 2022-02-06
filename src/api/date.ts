import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
import { genDate, gen } from 'src/helpers/bmob'
const findAllDate = async (date: any) => {}
const findDate = async (date: any) => {}
const findDay = async (date:Date) => {
  const start = genDate(dayjs(date).startOf('day'))
  const end = genDate(dayjs(date).endOf('day'))
  const query = Bmob.Query('date')
  query.equalTo('date', '>', start)
  query.equalTo('date', '<', end)
  return gen<DateType[]>(query.find())
}
const addDate = async (date:Date) => {
  const query = Bmob.Query('date')
  query.set('date', genDate(date) as any)
  return gen<DateType>(query.save())
}
const updateDate = async (date: any) => {}
const deleteDate = async (date: any) => {}
const checkToday = async () => {
  const { datetime } = await (Bmob.timestamp() as Promise<any>)
  const dates = await findDay(datetime)
  let dateId = null
  if (dates.length === 0) {
    const { objectId } = await addDate(datetime)
    dateId = objectId
  } else {
    const { objectId } = dates[0]
    dateId = objectId
  }
  return dateId
}
const getTimestamp = async () => {
  const { datetime } = await (Bmob.timestamp() as Promise<any>)
  return {
    datetime,
    bombDate: genDate(datetime)
  }
}
export default {
  findDay,
  addDate,
  checkToday,
  getTimestamp
}
