import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'

import { genDate, getColor, gen, genRandColor, genStatusTag, genPriorityTag, genConsumingTag, genParentTag } from 'src/helpers/bmob'
import dateApi from './date'
import orderApi from './order'
import habitApi from './habit'
dayjs.extend(isoWeek)

const getTotalTimeConsuming = async () => {
  const query = Bmob.Query('dream')
  query.statTo('sum', 'timeConsuming')
  const res = await gen(query.find()) as any
  return res[0] ? res[0]._sumTimeConsuming as number : 0
}
const getWeeklyTimeConsuming = async () => {
  const query = Bmob.Query('todo')
  const { datetime, bombDate } = await dateApi.getTimestamp()
  const start = genDate(dayjs(datetime).startOf('isoWeek'))

  const end = bombDate

  query.equalTo('completeTime', '>', start)
  query.equalTo('completeTime', '<', end)
  query.statTo('sum', 'timeConsuming')
  const res = await gen(query.find()) as any

  return res[0] ? res[0]._sumTimeConsuming as number : 0
}
const getTotalCompleteTodo = async () => {
  const query = Bmob.Query('todo')
  query.equalTo('status', '==', 'complete')
  const res = await gen(query.find()) as any
  return res.length
}
const getOverdueGoal = async () => {
  const query = Bmob.Query('goal')
  const { bombDate } = await dateApi.getTimestamp()
  query.equalTo('deadline', '<', bombDate)
  query.equalTo('status', '!=', 'complete')
  const res = await gen(query.find()) as any
  return res.length
}
const getOverdueTasks = async () => {
  const query = Bmob.Query('task')
  const { bombDate } = await dateApi.getTimestamp()
  query.equalTo('timePeriodEnd', '<', bombDate)
  query.equalTo('status', '!=', 'complete')
  const res = await gen(query.find()) as any
  return res.length
}
const getTodoTodayComplete = async () => {
  const query = Bmob.Query('todo')
  const { datetime } = await dateApi.getTimestamp()
  const start = genDate(dayjs(datetime).startOf('day'))

  query.equalTo('status', '==', 'complete')
  query.equalTo('completeTime', '>', start)
  query.include('taskFk')
  const res = await gen(query.find()) as any
  return res
}
const getTodayConsuming = async () => {
  const query = Bmob.Query('todo')
  const { datetime, bombDate } = await dateApi.getTimestamp()
  const start = genDate(dayjs(datetime).startOf('day'))
  query.equalTo('updatedAt', '>', start)
  query.statTo('sum', 'timeConsuming')
  const res = await gen(query.find()) as any
  return res[0] ? res[0]._sumTimeConsuming as number : 0
}
const getHomeStatistics = async () => {
  const totalTimeConsuming = await getTotalTimeConsuming()
  const weeklyTimeConsuming = await getWeeklyTimeConsuming()
  const totalCompleteTodo = await getTotalCompleteTodo()
  const overdueGoalCount = await getOverdueGoal()
  const overdueTasksCount = await getOverdueTasks()
  const todoTodayComplete = await getTodoTodayComplete()
  const todayConsuming = await getTodayConsuming()
  return {
    total: [
      {
        label: '总时长',
        value: totalTimeConsuming
      },
      {
        label: '周时长',
        value: weeklyTimeConsuming
      },
      {
        label: '总完成',
        value: totalCompleteTodo
      },
      {
        label: '逾期目标',
        value: overdueGoalCount
      },
      {
        label: '逾期任务',
        value: overdueTasksCount
      }
    ],
    today: [
      {
        label: '今日完成',
        value: todoTodayComplete.length
      },
      {
        label: '今日时长',
        value: todayConsuming
      }
    ]
  }
}
const gen24Hours = async () => {
  const { datetime } = await dateApi.getTimestamp()
  const dayStart = dayjs(datetime).startOf('day')
  const start = dayStart.add(7, 'hour')
  const list = [start]
  for (let index = 0; index <= 18; index++) {
    list.push(list[index].add(1, 'hour'))
  }
  const finallyList = list.map(item => {
    const formatData = item.format('YYYY-MM-DD HH:mm:ss')
    const obj = {
      label: item.format('HH:mm'),
      value: formatData,
      color: getColor('gray', 300),
      behaviour: '',
      tag: ''
    }
    return obj
  })
  return finallyList
}
const getMyToday = async () => {
  const baseList = await gen24Hours()
  const todoTodayComplete = await getTodoTodayComplete() as Todo[]
  const habitList = await habitApi.findTodayHabitRelationJoin()
  const completeHabitList = habitList.filter(item => item.level > 0)
  const todoList = todoTodayComplete.map(item => {
    const time = item.completeTime.iso
    const timeDayjs = dayjs(time)
    const formatData = timeDayjs.format('YYYY-MM-DD HH:mm:ss')
    const obj = {
      label: timeDayjs.format('HH:mm'),
      value: formatData,
      color: item.taskFk ? item.taskFk.color : getColor('gray', 300),
      behaviour: item.name,
      tag: item.taskFk ? item.taskFk.name : '日常'
    }
    return obj
  })
  const habitTimeLine = completeHabitList.map(item => {
    const time = item.updatedAt
    const timeDayjs = dayjs(time)
    const formatData = timeDayjs.format('YYYY-MM-DD HH:mm:ss')

    const obj = {
      label: timeDayjs.format('HH:mm'),
      value: formatData,
      color: getColor('teal', 600),
      behaviour: item.habitFk.habits[item.level - 1],
      tag: '习惯养成'
    }
    return obj
  })
  const list = [...baseList, ...todoList, ...habitTimeLine]
  const finallyList = list.sort((a, b) => {
    if (dayjs(a.value).isBefore(dayjs(b.value))) { // 按某种排序标准进行比较, a 小于 b
      return -1
    }
    if (dayjs(a.value).isAfter(dayjs(b.value))) {
      return 1
    }
    return 0
  })

  return finallyList
}
export default {
  getHomeStatistics,
  getMyToday
}
