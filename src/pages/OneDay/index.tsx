import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import Card from './components/Card'
import Habit from './components/Habit'

const OneDayBox = styled.div(
  s.height.full,
  s.width.full
)
const OneDay = () => {
  return (
    <OneDayBox>
      <Card title='微习惯'>
        <Habit />
      </Card>
    </OneDayBox>
  )
}
export default OneDay
