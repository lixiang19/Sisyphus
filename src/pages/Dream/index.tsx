import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import PageHeader from 'src/components/PageHeader'
import { useState, useEffect, useMemo, useRef, createContext } from 'react'
import { Tabs } from '@arco-design/web-react'
import BaseCard from 'src/components/BaseCard'
import GalleryView from 'src/components/GalleryView'
import api from 'src/api'
import { ActionContext } from 'src/store/context'
import useUrlState from '@ahooksjs/use-url-state'
import { useHistory } from 'react-router-dom'

const TabPane = Tabs.TabPane
const DreamBox = styled.div(x`
  w.full
  h.full
  bg.white
  px8
  py8
`)
interface DreamProps {
  children?: React.ReactNode;
}

const Dream = ({ children }: DreamProps) => {
  const [urlObj, setUrlObj] = useUrlState()
  const history = useHistory()
  function setUrlId (data:Dream) {
    history.push('/goal')
    setUrlObj({ dreamFk: data.objectId })
  }
  return (
    <DreamBox>

      <PageHeader title='梦想'>
        <TabPane key='1' title='Gallery' >
          <GalleryView deleteApi={api.dream.deleteItem} filterApi={api.dream.filterDream}></GalleryView>
        </TabPane>
        <TabPane key='2' title='Board'>
          aa
        </TabPane>
      </PageHeader>

    </DreamBox>
  )
}
export default Dream
