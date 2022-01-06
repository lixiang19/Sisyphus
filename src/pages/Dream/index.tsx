import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest, useSetState } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import FoldBox from './components/FoldBox'
import Dream from './components/Dream'
const DreamBox = styled.div(
  s.border.rounded.md,
  s.overflow.hidden,
  s.bg.white,
  s.width.full,
  s.height.full,
  s.flex.row.s.s
)

type TaskType = 'dream' | 'goal' | 'task' | 'todo'
type Fold = {
  key: TaskType;
  bg:IAnyPropObject,
  component?: React.ReactNode;
}
const FoldList:Fold[] = [
  {
    key: 'dream',
    bg: s.bg.gray[200],
    component: Dream
  },
  {
    key: 'goal',
    bg: s.bg.gray[100]
  },
  {
    key: 'task',
    bg: s.bg.gray[50]
  },
  {
    key: 'todo',
    bg: s.bg.white
  }
]
const DreamPage = () => {
  const [foldKey, setFoldKey] = useState<TaskType>('goal')

  return (
    <DreamBox>
      {/* {FoldList.map(item => (
        <FoldBox
          key={item.key}
          isFold={foldKey === item.key}
          bg={item.bg}
          onClick={() => setFoldKey(item.key)}
        >
          {item.key}
        </FoldBox>
      ))} */}
      <FoldBox key='dream' isFold={foldKey === 'dream'} bg={s.bg.gray[200]} onClick={() => setFoldKey('dream')}><Dream></Dream></FoldBox>
      <FoldBox key='goal' isFold={foldKey === 'goal'} bg={s.bg.gray[100]} onClick={() => setFoldKey('goal')}></FoldBox>
      <FoldBox key='task' isFold={foldKey === 'task'} bg={s.bg.gray[50]} onClick={() => setFoldKey('task')}></FoldBox>
      <FoldBox key='todo' isFold={foldKey === 'todo'} bg={s.bg.white} onClick={() => setFoldKey('todo')}></FoldBox>
    </DreamBox>
  )
}
export default DreamPage
