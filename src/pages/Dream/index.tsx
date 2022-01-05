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
enum dreamTodo {dream, goal, task, todo }
const FoldList = [
  {
    key: 'dream'
  },
  {
    key: 'goal'
  },
  {
    key: 'task'
  },
  {
    key: 'todo'
  }
]
const Dream = () => {
  const [foldKey, setFoldKey] = useState('goal')

  return (
    <DreamBox>
      <FoldBox isFold={foldControl[1]}>ss</FoldBox>
      <FoldBox>ss</FoldBox>
      <FoldBox>ss</FoldBox>
      <FoldBox>ss</FoldBox>
    </DreamBox>
  )
}
export default Dream
