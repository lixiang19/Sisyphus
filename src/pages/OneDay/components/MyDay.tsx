import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef, useContext } from 'react'
import api from 'src/api'
import StatusTag from 'src/components/StatusTag'
import { Timeline } from '@arco-design/web-react'
import { EventContext } from 'src/store/EventContext'
const TimelineItem = Timeline.Item
const MyDayBox = styled.div(x`
  h.full
  overflow.y
`, {
  '.arco-timeline-item': {
    // minHeight: s.size[13]
  }
})
const Behaviour = styled.div(x`
  font.size.lg
`)
const ItemContent = styled.div(x`
  flex.col.s.s
  gap.y1
  mb.8
`)
interface MyDayProps {
  children?: React.ReactNode;
}

const MyDay = ({ children }: MyDayProps) => {
  const { data, refresh } = useRequest(api.statistics.getMyToday)
  const { event$ } = useContext(EventContext)
  event$.useSubscription((val: any) => {
    refresh()
  })
  return (
    <MyDayBox>
      <Timeline labelPosition='relative'>
        {
          data && data.map((item, index) => {
            return (
              <TimelineItem key={index} label={item.label} dotColor={item.color}>
                <ItemContent>
                  <Behaviour>{item.behaviour}</Behaviour>
                  {item.tag && <StatusTag color={item.color} >{item.tag}</StatusTag>}
                </ItemContent>

              </TimelineItem>
            )
          })
        }
      </Timeline>
    </MyDayBox>
  )
}
export default MyDay
