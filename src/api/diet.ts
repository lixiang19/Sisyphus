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
export default {
  findDietToday
}
