import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import Card from './components/Card'
import Habit from './components/Habit'
import Diet from './components/Diet'
import TodoContent from '../DreamManager/TodoContent'
const OneDayBox = styled.div(
  s.height.full,
  s.width.full,
  s.flex.row.s.s,
  s.gap.x[4]
)
const LeftWrapper = styled.div(
  s.h.full,
  s.w['3/4'],
  s.flex.col.s.s,
  s.gap.y[4]
)
const TopWrapper = styled.div(
  s.w.full,
  s.h['1/4'],
  s.bg.white,
  s.rounded.md,
  s.p[4],
  s.flex.row.s.s,
  s.gap.x[4]
)
const TodoWrapper = styled.div(
  s.h.full,
  s.flex.col.s.s,
  s.gap.y[10],
  s.bg.white,
  s.rounded.md,
  s.p[4]
)
const BottomRightWrapper = styled.div(
  s.h.full,
  {
    flexGrow: 1
  },
  s.bg.white,
  s.rounded.md,
  s.p[4]
)

const BottomWrapper = styled.div(
  s.height['3/4'],
  s.w.full,
  s.flex.row.s.s,
  s.gap.x[4]
)
const DayWrapper = styled.div(
  s.width['1/4'],
  s.height.full,
  s.bg.white
)

const OneDay = () => {
  return (
    <OneDayBox>
      <LeftWrapper>
        <TopWrapper>
          <Card title='食谱' bg={s.gradient[1]}>
            <Diet />
          </Card>
          <Card title='微习惯' bg={s.gradient[2]}>
            <Habit />
          </Card>
        </TopWrapper>
        <BottomWrapper>
          <TodoWrapper>
            <TodoContent></TodoContent>
          </TodoWrapper>
          <BottomRightWrapper>
          s
          </BottomRightWrapper>
        </BottomWrapper>

      </LeftWrapper>

      {/* <CenterWrapper>
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
      </CenterWrapper> */}
      <DayWrapper>

      </DayWrapper>
    </OneDayBox>
  )
}
export default OneDay
