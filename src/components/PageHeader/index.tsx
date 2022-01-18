import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Tabs, Button } from '@arco-design/web-react'
import useUrlState from '@ahooksjs/use-url-state'

const Title = styled.div(x`
  fc.black
  fs[13]
  fw.bold
  mb6
  pl4
`)
const PageHeaderBox = styled.div(x`
  w.full
`)

const TabSelect = styled(Tabs)({
  '.arco-tabs-header': {
    height: '0.5rem',
    display: 'flex'
  },
  '.arco-tabs-pane': {
    height: '10.8rem'
  }
})
interface PageHeaderProps {
  children?: React.ReactNode;
  title: string;
}
const ActionBox = styled.div(x`
  flex.row.s.s
  gap.x6
`)
interface IAction {
  children?: React.ReactNode;
}
const Action = ({ children }: IAction) => {
  const [urlObj, setUrlObj] = useUrlState()
  function clearUrlState () {
    setUrlObj((res) => {
      console.log('🚀 ~ file: index.tsx ~ line 43 ~ setUrlObj ~ res', res)
    })
  }
  return (
    <ActionBox>
      <Button size='small' type='secondary' onClick={clearUrlState}>
            全部
      </Button>
      <Button size='small' type='secondary'>
            分类
      </Button>
      <Button size='small' type='secondary'>
            过滤
      </Button>
      <Button size='small' type='primary'>
            新增
      </Button>
    </ActionBox>
  )
}
const PageHeader = ({ children, title }: PageHeaderProps) => {
  const [activeTab, setActiveTab] = useState('1')
  return (
    <PageHeaderBox>
      <Title>{title}</Title>
      <TabSelect activeTab={activeTab} onChange={setActiveTab} extra={<Action></Action>}>
        {children}
      </TabSelect>
    </PageHeaderBox>
  )
}
export default PageHeader
