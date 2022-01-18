import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
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
  const history = useHistory()
  function setUrlDreamId (data:Task) {
    history.push('/task')
    setUrlObj({ taskFk: data.objectId })
  }
  return (
    <GoalBox>
      <ActionContext.Provider value={{ cardClick: setUrlDreamId }}>
        <PageHeader title='目标'>
          <TabPane key='1' title='画廊'>
            <GalleryView filterApi={api.goal.filterGoal}></GalleryView>
          </TabPane>
          <TabPane key='2' title='看板'>
            <BoardView groupBy='status' group={ConstVar.statusOptions} updateApi={api.goal.updateGoal} filterApi={api.goal.filterAndGroupGoal}></BoardView>
          </TabPane>
          <TabPane key='3' title='日历'>
          s
          </TabPane>
        </PageHeader>
      </ActionContext.Provider>
      {/* <FormDialog></FormDialog> */}
    </GoalBox>
  )
}
export default Goal
