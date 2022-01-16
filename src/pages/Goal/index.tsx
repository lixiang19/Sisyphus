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
  return (
    <GoalBox>
      <PageHeader title='目标'>
        <TabPane key='2' title='Gallery' >
          <GalleryView filterApi={api.goal.filterGoal}></GalleryView>
        </TabPane>
        <TabPane key='1' title='Board'>
          <BoardView groupBy='status' group={ConstVar.statusOptions} updateApi={api.goal.updateGoal} filterApi={api.goal.filterAndGroupGoal}></BoardView>
        </TabPane>
      </PageHeader>
    </GoalBox>
  )
}
export default Goal
