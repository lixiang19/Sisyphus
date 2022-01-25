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
    // history.push('/todo')
    // setUrlObj({ taskFk: data.objectId })
  }
  return (
    <TodoBox>
      <ActionContext.Provider value={{ cardClick: setUrlDreamId }}>
        <PageHeader title='目标'>
          <TabPane key='1' title='看板'>
            <BoardView
              groupBy='status'
              group={ConstVar.statusOptions}
              updateApi={api.todo.updateTodo}
              filterApi={api.todo.filterAndGroupTodo}
              dialogChild={(data, { visible, setFalse }, { refresh }) => (
                <FormDialog initialData={data} visible={visible} onCancel={setFalse} onConfirm={() => { setFalse(); refresh() }}></FormDialog>)}
            ></BoardView>
          </TabPane>
        </PageHeader>
      </ActionContext.Provider>
    </TodoBox>
  )
}
export default Todo
