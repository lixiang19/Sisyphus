import dayjs from 'dayjs'
export function gen<T> (fn:Promise<any>) {
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
export function genDate (date: Date|string|dayjs.Dayjs): BmobDate {
  if (date instanceof Date || typeof date === 'string') {
    return {
      __type: 'Date',
      iso: dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    }
  } else {
    return {
      __type: 'Date',
      iso: date.format('YYYY-MM-DD HH:mm:ss')
    }
  }
}

export default {
  genDate,
  gen
}
