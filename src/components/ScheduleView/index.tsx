import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import TimeLine from 'react-gantt-timeline'
import useUrlState from '@ahooksjs/use-url-state'
import dayjs from 'dayjs'

const ScheduleViewBox = styled.div(x`
  font.size.5
  w.full
  overflow.hidden
`)
const config = {

}
interface ScheduleViewProps<T> {
  children?: React.ReactNode;
  filterApi: (...args: any[]) => Promise<T[]>
}
function ScheduleView<T extends any> ({ children, filterApi }: ScheduleViewProps<T>) {
  const [urlObj] = useUrlState()

  const { data, loading, refresh, mutate } = useRequest(() => filterApi(urlObj), {

    refreshDeps: [urlObj]
  })
  function onUpdateTask (item:any, props:any) {
    // TODO: 更改日期
    console.log('🚀 ~ file: index.tsx ~ line 26 ~ onUpdateTask ~ props', props)
    console.log('🚀 ~ file: index.tsx ~ line 26 ~ onUpdateTask ~ item', item)
    // item.start = props.start;
    // item.end = props.end;
    // this.setState({ data: [...this.state.data] });
  };
  function onSelectItem (item: any) {
    console.log('🚀 ~ file: index.tsx ~ line 34 ~ onSelectItem ~ item', item)
  }

  return (
    <ScheduleViewBox>
      {data && <TimeLine data={data} onUpdateTask={onUpdateTask} onSelectItem={onSelectItem} config={config} mode='month'/>}
    </ScheduleViewBox>
  )
}
export default ScheduleView
