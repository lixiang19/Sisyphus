import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
function gen<T> (fn:Promise<any>) {
  return new Promise<T>((resolve, reject) => {
    fn.then(
      (res:any) => {
        resolve(res)
      }
    ).catch(
      (err:any) => {
        reject(err)
      }
    )
  })
}
const setDate = (date:string) => {
  const query = Bmob.Query('date')
  query.set('date', date)
  return gen<any>(query.save())
}
const findDate = (date:string) => {
  const start = {
    __type: 'Date',
    iso: dayjs(date).startOf('day').format('YYYY-MM-DD HH:mm:ss')
  }
  const end = {
    __type: 'Date',
    iso: dayjs(date).endOf('day').format('YYYY-MM-DD HH:mm:ss')
  }
  const query = Bmob.Query('date')
  query.equalTo('date', '>', start)
  query.equalTo('date', '<', end)
  return gen<any>(query.find())
}
const findAll = async () => {
  const query = Bmob.Query('mini_habits')
  const { datetime } = await (Bmob.timestamp() as Promise<any>)

  const dates = await findDate(datetime)

  if (dates.length === 0) {
    await setDate(datetime)
  }
  // findDate(date).then(
  //   (res:any) => {
  //     if (res.length === 0) {

  //     }
  //     console.log('🚀 ~ file: habit.ts ~ line 20 ~ findAll ~ res', res)
  //     // query.equalTo('date', res[0].date)
  //     // return gen<any>(query.find())
  //   }
  // )
  return gen<Habit[]>(query.find())
}
export default {
  findAll,
  findDate
}
