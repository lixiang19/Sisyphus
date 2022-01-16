import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Rate } from '@arco-design/web-react'
import api from 'src/api'
const LabelBox = styled.div(x`
  w20
`)
const HabitItemBox = styled.div(
  s.flex.row.s.c,
  s.gap.x[3],
  s.font.color.white,
  {
    flexShrink: 1
  },
  {
    '& > span': s.join(
      s.relative,
      s.inset.top[0.5]
    )
  }
)
interface IHabitItem {
  children?: React.ReactNode;
  dateHabitRelationJoin:DateHabitRelationJoin,
}

const HabitItem = ({ children, dateHabitRelationJoin }: IHabitItem) => {
  const [rate, setRate] = useState(dateHabitRelationJoin.level)
  const desc = [dateHabitRelationJoin.habitFk.habits[0], ...dateHabitRelationJoin.habitFk.habits]
  const { loading, run: setLevel } = useRequest(api.habit.updateDateHabitRelation, {
    manual: true
  })
  function handleRateChange (level: number) {
    setRate(level)
    setLevel(dateHabitRelationJoin.objectId, level)
  }
  return (
    <HabitItemBox>
      <LabelBox css={s.label}>{dateHabitRelationJoin.habitFk.name}:</LabelBox>
      <Rate value={rate} onChange={handleRateChange} count={3} tooltips={['😊完成了习惯打卡😊' + desc[1], '😘厉害！更进一步😘' + desc[2], '😍非常棒！超越自我😍' + desc[3]]}></Rate>
      <span css={s.text}>{desc[rate]}</span>
    </HabitItemBox>
  )
}

const HabitBox = styled.div(
  s.flex.col.s.s
  // s.width[80]
)
const Habit = () => {
  const { data: habits, error, loading } = useRequest(api.habit.findTodayHabitRelationJoin)

  return (
    <HabitBox>
      {
        habits && habits.map((habit) => {
          return <HabitItem dateHabitRelationJoin={habit} key={habit.objectId}/>
        })
      }
    </HabitBox>
  )
}
export default Habit
