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
export function getColor (colorKey:keyof Color, deepKey:keyof ColorItem) {
  return color[colorKey][deepKey]
}
export function genStatusTag (status:string) {
  const item = ConstVar.AllStatusOptions.find(item => item.value === status)
  return item ?? { label: '未知', value: 'unknown', color: '#0f172a' }
}
export function genPriorityTag (priority:number) {
  const item = ConstVar.priorityOptions.find(item => item.value === priority)
  return item ?? { label: '未知', value: 'unknown', color: '#0f172a' }
}
export function genConsumingTag (timeConsuming:number) {
  return { label: `${timeConsuming}分钟`, value: timeConsuming, color: color.gray[400] }
}
export function genCountdownDay (deadlineDate:string) {
  const deadline = dayjs(deadlineDate)
  const now = dayjs()
  const diff = deadline.diff(now, 'day')
  if (diff < 0) {
    return { label: '已逾期', value: -1, color: color.red[500] }
  } else if (diff === 0) {
    return { label: '今天', value: 0, color: color.orange[500] }
  } else {
    return { label: `${diff}天`, value: diff, color: color.green[500] }
  }
}
export function genPeriodTag (timePeriodStart:BmobDate, timePeriodEnd: BmobDate) {
  const start = dayjs(timePeriodStart.iso)
  const end = dayjs(timePeriodEnd.iso)
  const now = dayjs()
  const startDiff = start.diff(now, 'day')
  const endDiff = end.diff(now, 'day')
  if (startDiff > 0) {
    return { label: '未开始', value: startDiff, color: color.gray[500] }
  } else if (endDiff < 0) {
    return { label: '已逾期', value: -1, color: color.red[500] }
  } else if (endDiff === 0) {
    return { label: '今天', value: 0, color: color.orange[500] }
  } else {
    return { label: `${endDiff}天`, value: endDiff, color: color.green[500] }
  }
}
export function genParentTag (obj:BaseTask) {
  if (obj) {
    return { label: obj.name, value: obj.objectId, color: obj.color }
  } else {
    return { label: '其他', value: 'other', color: color.gray[500] }
  }
}
export function genTimePeriod (timePeriodStart:BmobDate, timePeriodEnd:BmobDate) {
  const start = dayjs(timePeriodStart.iso).format('YYYY-MM-DD')
  const end = dayjs(timePeriodEnd.iso).format('YYYY-MM-DD')
  return { label: `${start} ~ ${end}`, value: `${start} ~ ${end}`, color: color.gray[400] }
}
export default {
  genDate,
  gen,
  genStatusTag,
  genPriorityTag,
  genConsumingTag,
  genCountdownDay,
  genParentTag,
  genTimePeriod,
  getColor
}
