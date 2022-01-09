import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest, useSetState } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import FoldBox from './components/FoldBox'
import DreamContent from './DreamContent'
import GoalContent from './GoalContent'
import TaskContent from './TaskContent'
import TodoContent from './TodoContent'
const DreamBox = styled.div(
  s.border.rounded.md,
  s.overflow.hidden,
  s.bg.white,
  s.width.full,
  s.height.full,
  s.flex.row.s.s
)

type TaskType = 'dream' | 'goal' | 'task' | 'todo'

const DreamPage = () => {
  const [foldKey, setFoldKey] = useState<TaskType>('todo')

  return (
    <DreamBox>
      <FoldBox key='dream' isFold={foldKey === 'dream'} bg={s.bg.gray[200]} onClick={() => setFoldKey('dream')}><DreamContent></DreamContent></FoldBox>
      <FoldBox key='goal' isFold={foldKey === 'goal'} bg={s.bg.gray[100]} onClick={() => setFoldKey('goal')}><GoalContent></GoalContent></FoldBox>
      <FoldBox key='task' isFold={foldKey === 'task'} bg={s.bg.gray[50]} onClick={() => setFoldKey('task')}><TaskContent></TaskContent></FoldBox>
      <FoldBox width={92} key='todo' isFold={foldKey === 'todo'} bg={s.bg.white} onClick={() => setFoldKey('todo')}><TodoContent></TodoContent></FoldBox>
    </DreamBox>
  )
}
export default DreamPage
