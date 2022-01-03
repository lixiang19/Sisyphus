import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import Card from './components/Card'
import Habit from './components/Habit'

const OneDayBox = styled.div(
  s.height.full,
  s.width.full,
  s.flex.row.s.s,
  s.gap.x[4]
)
const TodoWrapper = styled.div(
  s.width['1/2'],
  s.flex.col.s.s,
  s.gap.y[10]
)
const CenterWrapper = styled.div(
  s.flex.col.s.s,
  s.gap.y[10]
)
const DayWrapper = styled.div(
  s.width['1/4']
)
const OneDay = () => {
  return (
    <OneDayBox>
      <TodoWrapper>
        <Card title='立刻'>
        ss
        </Card>
        <Card title='接着'>
        ss
        </Card>
      </TodoWrapper>
      <CenterWrapper>
        <Card title='微习惯' >
          <Habit />
        </Card>
        <Card title='食谱'>
        ss
        </Card>
        <Card title='享受生活'>
        ss
        </Card>
      </CenterWrapper>
      <DayWrapper>
        <Card title='今天'>
        ss
        </Card>
      </DayWrapper>
    </OneDayBox>
  )
}
export default OneDay
