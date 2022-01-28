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
const TaskBox = styled.div(x`
  w.full
  h.full
  bg.white
  px8                                   
  py8
`)
interface TaskProps {
  children?: React.ReactNode;
}
const Task = ({ children }: TaskProps) => {
  const [urlObj, setUrlObj] = useUrlState()
  const history = useHistory()
  function setUrlDreamId (data:Task) {
    history.push('/todo')
    setUrlObj({ taskFk: data.objectId })
  }
  return (
    <TaskBox>
      <PageHeader title='目标'>
        <TabPane key='1' title='看板'>
          <BoardView
            groupBy='status'
            group={ConstVar.statusOptions}
            deleteApi={api.task.deleteItem}
            updateApi={api.task.updateTask}
            filterApi={api.task.filterAndGroupTask}
            dialogChild={(data, { visible, setFalse }, { refresh }) => (
              <FormDialog initialData={data} visible={visible} onCancel={setFalse} onConfirm={() => { setFalse(); refresh() }}></FormDialog>)}
          ></BoardView>
        </TabPane>
        <TabPane key='2' title='时间轴'>
          s
        </TabPane>
      </PageHeader>
    </TaskBox>
  )
}
export default Task
