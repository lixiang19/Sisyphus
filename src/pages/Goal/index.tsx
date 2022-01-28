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

import useUrlState from '@ahooksjs/use-url-state'
import { useHistory } from 'react-router-dom'
import FormDialog from './FormDialog'
const TabPane = Tabs.TabPane
const GoalBox = styled.div(x`
  w.full
  h.full
  bg.white
  px8                                   
  py8
`)
interface GoalProps {
  children?: React.ReactNode;
}
const Goal = ({ children }: GoalProps) => {
  const [urlObj, setUrlObj] = useUrlState()
  // const [visible2, {setFalse, setTrue }] = useBoolean(false)
  const history = useHistory()
  function setUrlDreamId (data:Task) {
    history.push('/task')
    setUrlObj({ taskFk: data.objectId })
  }
  return (
    <GoalBox>
      <PageHeader title='目标'>
        <TabPane key='1' title='画廊'>
          <GalleryView
            routeAction={setUrlDreamId}
            deleteApi={api.goal.deleteItem}
            filterApi={api.goal.filterGoal}
            dialogChild={(data, { visible, setFalse }, { refresh }) => (
              <FormDialog visible={visible} onCancel={setFalse} onConfirm={() => { setFalse(); refresh() }}></FormDialog>)}
          ></GalleryView>
        </TabPane>
        <TabPane key='2' title='看板'>
          <BoardView
            groupBy='status'
            group={ConstVar.statusOptions}
            deleteApi={api.goal.deleteItem}
            updateApi={api.goal.updateGoal}
            filterApi={api.goal.filterAndGroupGoal}
            dialogChild={(data, { visible, setFalse }, { refresh }) => (
              <FormDialog initialData={data} visible={visible} onCancel={setFalse} onConfirm={() => { setFalse(); refresh() }}></FormDialog>)}
          ></BoardView>
        </TabPane>
        <TabPane key='3' title='日历'>
          s
        </TabPane>
      </PageHeader>

    </GoalBox>
  )
}
export default Goal
