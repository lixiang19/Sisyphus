import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useBoolean, useRequest } from 'ahooks'
import PageHeader from 'src/components/PageHeader'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Tabs } from '@arco-design/web-react'
import BaseCard from 'src/components/BaseCard'
import GalleryView from 'src/components/GalleryView'
import BoardView from 'src/components/BoardView'
import api from 'src/api'
import ConstVar from 'src/helpers/ConstVar'
import { ActionContext } from 'src/store/context'
import useUrlState from '@ahooksjs/use-url-state'
import { useHistory } from 'react-router-dom'
import FormDialog from './FormDialog'
import RepeatFormDialog from './RepeatFormDialog'

const TabPane = Tabs.TabPane
const TodoBox = styled.div(x`
  w.full
  h.full
  bg.white
  px8                                   
  py8
`)

interface TodoProps {
  children?: React.ReactNode;
}
const Todo = ({ children }: TodoProps) => {
  const [urlObj, setUrlObj] = useUrlState()
  const history = useHistory()
  function setUrlDreamId (data:Todo) {
    history.push('/')
    setUrlObj({ taskFk: undefined })
  }
  return (
    <TodoBox>
      <PageHeader title='燃烧日程'>
        <TabPane key='1' title='紧急度'>
          <BoardView
            groupBy='priority'
            group={ConstVar.priorityOptions}
            routeAction={setUrlDreamId}
            deleteApi={api.todo.deleteItem}
            updateApi={api.todo.updateTodo}
            completeApi={api.todo.completeItem}
            filterApi={(groupBy, group, obj) => api.todo.filterAndGroupTodo(groupBy, group, obj, { status: 'complete' })}
            dialogChild={(data, { visible, setFalse }, { refresh }) => (
              <FormDialog initialData={data} visible={visible} onCancel={setFalse} onConfirm={() => { setFalse(); refresh() }}></FormDialog>)}
          ></BoardView>
        </TabPane>
        <TabPane key='2' title='看板'>
          <BoardView
            groupBy='status'
            group={ConstVar.statusOptions}
            routeAction={setUrlDreamId}
            deleteApi={api.todo.deleteItem}
            updateApi={api.todo.updateTodo}
            completeApi={api.todo.completeItem}
            filterApi={api.todo.filterAndGroupTodo}
            dialogChild={(data, { visible, setFalse }, { refresh }) => (
              <FormDialog initialData={data} visible={visible} onCancel={setFalse} onConfirm={() => { setFalse(); refresh() }}></FormDialog>)}
          ></BoardView>
        </TabPane>
        <TabPane key='3' title='持续任务' >
          <GalleryView completeApi={api.todo.deleteRepeatabilityTodo} deleteApi={api.todo.deleteRepeatabilityTodo} filterApi={api.todo.filterRepeatabilityTodo}
            dialogChild={(data, { visible, setFalse }, { refresh }) => (
              <RepeatFormDialog initialData={data} visible={visible} onCancel={setFalse} onConfirm={() => { setFalse(); refresh() }}></RepeatFormDialog>)}
          ></GalleryView>
        </TabPane>
      </PageHeader>
    </TodoBox>
  )
}
export default Todo
