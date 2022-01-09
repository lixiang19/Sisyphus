import dayjs from 'dayjs'
import color from 'src/styles/theme/color'
import arrayUtil from './arrayUtil'
import ConstVar from './ConstVar'
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
type Colors = Partial<keyof Color>[]
type Deeps = Partial<keyof ColorItem>[]
export function genRandColor () {
  const colors:Colors = ['red', 'fuchsia', 'violet', 'blue', 'cyan', 'sky', 'teal', 'green', 'lime', 'yellow', 'orange', 'stone']
  const deeps:Deeps = [500, 600, 700, 800, 900]
  const deepKey = arrayUtil.rand(deeps)
  const colorKey = arrayUtil.rand(colors)
  return color[colorKey][deepKey]
}

export function genStatus (status:string) {
  const item = ConstVar.statusOptions.find(item => item.value === status)
  return item ?? { label: '未知', value: 'unknown', color: '#0f172a' }
}
export function genPriority (priority:number) {
  const item = ConstVar.priorityOptions.find(item => item.value === priority)
  return item ?? { label: '未知', value: 'unknown', color: '#0f172a' }
}
export default {
  genDate,
  gen,
  genStatus,
  genPriority
}
