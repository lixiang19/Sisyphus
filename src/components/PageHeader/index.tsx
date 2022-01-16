import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Tabs, Button } from '@arco-design/web-react'

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
  return (
    <ActionBox>
      <Button size='small' type='secondary'>
            全部
      </Button>
      <Button size='small' type='secondary'>
            分类
      </Button>
      <Button size='small' type='secondary'>
            过滤
      </Button>
    </ActionBox>
  )
}
const PageHeader = ({ children, title }: PageHeaderProps) => {
  const [activeTab, setActiveTab] = useState('1')
  return (
    <PageHeaderBox>
      <Title>{title}</Title>
      {/* <ActionArea> */}
      <TabSelect activeTab={activeTab} onChange={setActiveTab} extra={<Action></Action>}>
        {children}
        {/* <TabPane key='1' title='卡片'>

        </TabPane>
        <TabPane key='2' title='列表'>

        </TabPane>
        <TabPane key='3' title='日历'>

        </TabPane>
        <TabPane key='4' title='时间轴'>

        </TabPane> */}
      </TabSelect>
    </PageHeaderBox>
  )
}
export default PageHeader
