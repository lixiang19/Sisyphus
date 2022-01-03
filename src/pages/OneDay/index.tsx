import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import Card from './components/Card'
import Habit from './components/Habit'
import Diet from './components/Diet'

const OneDayBox = styled.div(
  s.height.full,
  s.width.full,
  s.flex.row.s.s,
  s.gap.x[4]
)
const TodoWrapper = styled.div(
  s.width['1/2'],
  s.height.full,
  s.flex.col.s.s,
  s.gap.y[10],
  s.border.right
)
const CenterWrapper = styled.div(
  s.flex.col.s.s,
  s.gap.y[10]
)
const DayWrapper = styled.div(
  s.width['1/4'],
  s.height.full,
  s.bg.white
)
const OneDay = () => {
  return (
    <OneDayBox>
      <TodoWrapper>
        {/* <Card title='立刻'>
        ss
        </Card>
        <Card title='接着'>
        ss
        </Card> */}
      </TodoWrapper>
      <CenterWrapper>
        <Card title='临时笔记' >
          ss
        </Card>
        <Card title='微习惯' >
          <Habit />
        </Card>

        <Card title='食谱'>
          <Diet />
        </Card>
        <Card title='享受生活'>
        ss
        </Card>
      </CenterWrapper>
      <DayWrapper>

      </DayWrapper>
    </OneDayBox>
  )
}
export default OneDay
