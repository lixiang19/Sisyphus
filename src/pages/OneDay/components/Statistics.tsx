import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useBoolean, useRequest, useSetState } from 'ahooks'
import { useState, useEffect, useMemo, useRef, useContext } from 'react'
import InfoNumber from './InfoNumber'
import { Divider, Statistic } from '@arco-design/web-react'
import api from 'src/api'
import { EventContext } from 'src/store/EventContext'

const Total = styled.div(x`
  flex.row.s.c
  gap.x[6]
`)
const Tody = styled.div(x`
  flex.row.e.c
  gap.x[6]
`)
const StatisticsBox = styled.div(x`
  flex.row.sb.c
  w.full
  h.full
  gap.x[3]
`)
interface StatisticsProps {
  children?: React.ReactNode;
}
const Statistics = ({ children }: StatisticsProps) => {
  const { data, refresh } = useRequest(api.statistics.getHomeStatistics)
  const { event$ } = useContext(EventContext)
  event$.useSubscription((val: any) => {
    refresh()
  })
  return (
    <StatisticsBox>
      <Total>
        {
          data && data.total.map((item, index) => {
            return <InfoNumber key={index} label={item.label} value={item.value}></InfoNumber>
          })
        }
      </Total>
      <Divider type='vertical' />
      <Tody>
        {
          data && data.today.map((item, index) => {
            return <InfoNumber key={index} label={item.label} value={item.value}></InfoNumber>
          })
        }
      </Tody>
    </StatisticsBox>
  )
}
export default Statistics
