import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useEventEmitter, useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import Card from './components/Card'
import Habit from './components/Habit'
import Diet from './components/Diet'
import TodoContent from './components/TodoContent'
import Statistics from './components/Statistics'
import MyDay from './components/MyDay'
import { EventContext } from 'src/store/EventContext'

const OneDayBox = styled.div(
  s.height.full,
  s.width.full,
  s.flex.row.s.s,
  s.gap.x[4],
  s.padding.all[4]
)
const LeftWrapper = styled.div(
  s.h.full,
  s.w['3/4'],
  s.flex.col.s.s,
  s.gap.y[4]
)
const TopWrapper = styled.div(
  s.w.full,
  s.h['1/5'],
  s.flex.noShrink,
  s.rounded.md,
  s.flex.row.s.s
)
const TodoWrapper = styled.div(
  s.h.full,
  s.bg.white,
  s.p[2],
  s.border.rounded.sm
)
const BottomRightWrapper = styled.div(
  s.h.full,
  {
    flexGrow: 1
  },
  s.rounded.md
)

const BottomWrapper = styled.div(
  s.height['4/5'],
  s.w.full,
  s.flex.row.s.s,
  s.gap.x[4]
)
const DayWrapper = styled.div(
  s.width['1/4'],
  s.height.full,
  s.bg.white,
  s.p[3]
)
const HabitWrapper = styled.div(
  s.w.full,
  s.h[70]
)
const DietWrapper = styled.div(
  s.w.full,
  s.h[61],
  s.mt[3]
)

const OneDay = () => {
  const event$ = useEventEmitter()
  return (
    <EventContext.Provider value={{ event$ }}>
      <OneDayBox>
        <LeftWrapper>
          <TopWrapper>
            <Statistics></Statistics>
          </TopWrapper>
          <BottomWrapper>
            <TodoWrapper>
              <TodoContent></TodoContent>
            </TodoWrapper>
            <BottomRightWrapper>
              <HabitWrapper>
                <Card title='微习惯' bg={s.gradient[2]}>
                  <Habit />
                </Card>
              </HabitWrapper>
              <DietWrapper>
                <Card title='饮食' bg={s.gradient[2]}>
                  <Diet />
                </Card>
              </DietWrapper>
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
          <MyDay></MyDay>
        </DayWrapper>
      </OneDayBox>
    </EventContext.Provider>

  )
}
export default OneDay
