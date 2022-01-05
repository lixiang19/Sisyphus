import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest, useSetState } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import FoldBox from './components/FoldBox'
const DreamBox = styled.div(
  s.border.rounded.md,
  s.overflow.hidden,
  s.bg.white,
  s.width.full,
  s.height.full,
  s.flex.row.s.s
)

type TaskType = 'dream' | 'goal' | 'task' | 'todo'
const FoldList = [
  {
    key: 'dream',
    bg: s.theme.color.gray[200],
    isFold: false
  },
  {
    key: 'goal',
    bg: s.theme.color.gray[100],
    isFold: false
  },
  {
    key: 'task',
    bg: s.theme.color.gray[50],
    isFold: false
  },
  {
    key: 'todo',
    bg: s.theme.color.white,
    isFold: false
  }
]
const Dream = () => {
  const [foldKey, setFoldKey] = useState<TaskType>('goal')

  return (
    <DreamBox>
      {FoldList.map(item => (
        <FoldBox
          key={item.key}
          isFold={item.isFold}
          bg={item.bg}
          // onClick={() => setFoldKey(item.key)}
        >
          {item.key}
        </FoldBox>
      ))}
    </DreamBox>
  )
}
export default Dream
