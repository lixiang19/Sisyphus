import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Calendar } from '@arco-design/web-react'
import dayjs, { Dayjs } from 'dayjs'
import useUrlState from '@ahooksjs/use-url-state'
import BaseCard from '../BaseCard'

const CalendarItemBox = styled.div(
  x`h.full flex.col.c.s px1 py4 gap.y10`
)
interface ICalendarItem {
  children?: React.ReactNode;
  currentDate:Dayjs;
  list?:any[];
}
const CalendarItem = ({ children, currentDate, list }: ICalendarItem) => {
  console.log('🚀 ~ file: index.tsx ~ line 19 ~ CalendarItem ~ currentDate', currentDate)
  if (list && list.length > 0) {
    if (list[0].deadline) {
      const item = list.find(item => currentDate.isSame(dayjs(item.deadline.iso), 'day'))
      if (item) {
        return (
          <CalendarItemBox>
            <span css={x`font.size.lg`}>{item.name}</span>
          </CalendarItemBox>
        )
      }
    }
  }
  return (
    <CalendarItemBox>

    </CalendarItemBox>
  )
}
const CalendarViewBox = styled.div(x`
  w.full
  h.full
  overflow.auto
`,
{
  '.arco-calendar-week-list-item': {
    ...s.font.size.lg
  },
  '.arco-calendar-month-row': {
    minHeight: s.size[37],
    height: 'auto'
  }
})
interface CalendarViewProps<T> {
  children?: React.ReactNode;
  filterApi: (...args: any[]) => Promise<T[]>
}
function CalendarView<T extends BaseTask> ({ children, filterApi }: CalendarViewProps<T>) {
  const [urlObj] = useUrlState()
  const { data, loading, refresh, mutate } = useRequest(() => filterApi(urlObj), {
    refreshDeps: [urlObj]
  })
  return (
    <CalendarViewBox>
      <Calendar dateInnerContent={(currentDate) => <CalendarItem currentDate={currentDate} list={data}></CalendarItem>}/>
    </CalendarViewBox>
  )
}
export default CalendarView
