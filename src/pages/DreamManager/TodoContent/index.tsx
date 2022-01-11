import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useBoolean, useRequest } from 'ahooks'
import useUrlState from '@ahooksjs/use-url-state'
import { useState, useEffect, useMemo, useRef } from 'react'
import List from './List'
import api from 'src/api'
import AddButton from 'src/components/AddButton'
import { Form, Input, Button, Checkbox, Select, DatePicker } from '@arco-design/web-react'
import ConstVar from 'src/helpers/ConstVar'
import Dialog from 'src/components/Dialog'
import StatusWrapper from '../components/StatusWrapper'
import Control from './Control'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const { RangePicker } = DatePicker
const Option = Select.Option
const FormItem = Form.Item
const TodoBox = styled.div(
  s.h.full,
  s.flex.row.s.s,
  s.gap.x[2]
)
const Todo = () => {
  const [urlObj, setUrlObj] = useUrlState({ dreamId: '', taskId: '' })
  const taskId = urlObj.taskId

  const findApiInprogress = () => api.dream.findTodoByTask(taskId, 'inProgress')
  const findApiReady = () => api.dream.findTodoByTask(taskId, 'ready')
  const { data: inProgressList, refresh: inProgressRefresh } = useRequest(findApiInprogress, {
    refreshDeps: [taskId]
  })
  const { data: readyList, refresh: readyRefresh } = useRequest(findApiReady, {
    refreshDeps: [taskId]
  })
  const { run } = useRequest(api.dream.updateTodoStatus, {
    manual: true
  })
  function onDragEnd (result: any, provided: any) {
    console.log('🚀 ~ file: index.tsx ~ line 40 ~ onDragEnd ~ result', result)
    const status = result.destination.droppableId
    const todoId = result.draggableId
    run(todoId, status).then(() => {
      readyRefresh()
      inProgressRefresh()
    })
  }
  return (
    <TodoBox>
      <DragDropContext onDragEnd={onDragEnd}>
        <StatusWrapper title='进行中' count={inProgressList?.length}>
          <Control keyId='inProgress' id={taskId} addApi={api.dream.addTodo} statusInitialValue='inProgress' listData={inProgressList} refresh={inProgressRefresh}></Control>
        </StatusWrapper>
        <StatusWrapper title='待开始' count={readyList?.length}>
          <Control keyId='ready' id={taskId} addApi={api.dream.addTodo} statusInitialValue='ready' listData={readyList} refresh={readyRefresh}></Control>
        </StatusWrapper>

      </DragDropContext>

    </TodoBox>
  )
}
export default Todo
