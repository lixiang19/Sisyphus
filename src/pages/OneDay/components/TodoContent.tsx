import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import BoardView from 'src/components/BoardView'
import FormDialog from 'src/pages/Todo/FormDialog'
import ConstVar from 'src/helpers/ConstVar'
import api from 'src/api'
const TodoContentBox = styled.div(x`
  h.full
`)
interface TodoContentProps {
  children?: React.ReactNode;
}
const TodoContent = ({ children }: TodoContentProps) => {
  return (
    <TodoContentBox>
      <BoardView
        groupBy='status'
        group={ConstVar.statusOptions}
        updateApi={api.todo.updateTodo}
        filterApi={api.todo.filterAndGroupTodo}
        dialogChild={(data, { visible, setFalse }, { refresh }) => (
          <FormDialog initialData={data} visible={visible} onCancel={setFalse} onConfirm={() => { setFalse(); refresh() }}></FormDialog>)}
      ></BoardView>
    </TodoContentBox>
  )
}
export default TodoContent
