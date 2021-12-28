import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Rate } from '@arco-design/web-react'
import api from 'src/api'

const HabitItemBox = styled.div(
  s.flex.row.s.c,
  s.gap.x[3],
  {
    '& > span': s.join(
      s.relative,
      s.inset.top[0.5]
    )
  }
)
interface IHabitItem {
  children?: React.ReactNode;
  habit:Habit,
  level:number
}

const HabitItem = ({ children, habit, level }: IHabitItem) => {
  const [rate, setRate] = useState(level)
  const desc = ['开始吧！', ...habit.habits]
  return (
    <HabitItemBox>
      <span css={s.label}>{habit.name}:</span>
      <Rate value={rate} onChange={(value) => setRate(value)} count={3} tooltips={['😊完成了习惯打卡', '😘厉害！更进一步', '😍非常棒！超越自我']}></Rate>
      <span css={s.text}>{desc[rate]}</span>
    </HabitItemBox>
  )
}

const HabitBox = styled.div(
  s.flex.col.s.s,
  s.gap.y[2],
  s.width[80]
)
const Habit = () => {
  const { data: habits, error, loading } = useRequest(api.habit.findAllHabit)
  console.log('🚀 ~ file: Habit.tsx ~ line 43 ~ Habit ~ habits', habits)

  return (
    <HabitBox>
      {
        habits && habits.map((habit) => {
          return <HabitItem habit={habit} key={habit.objectId} level={habit.level}/>
        })
      }
    </HabitBox>
  )
}
export default Habit
