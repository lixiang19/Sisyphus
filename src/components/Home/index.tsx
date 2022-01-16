import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import Menu from 'src/components/Menu'
import { IconApps, IconSafe, IconBulb, IconRobot, IconFire, IconThunderbolt } from '@arco-design/web-react/icon'
import { Link } from 'react-router-dom'
import { MouseEvent } from 'react'
const MenuItem = Menu.MenuItem
const HomeBox = styled.div(
  s.height['100vh'],
  s.bg.stone[100],
  s.grid.cols['2rem 1fr']
)

const ContentBox = styled.div(
  s.padding.all[3],
  s.w.full,
  s.h['100vh']
)

interface IHomeProps {
  children?: React.ReactNode;
}
const Home = ({ children }:IHomeProps) => {
  return (
    <HomeBox>
      <Menu>
        <MenuItem path='/' icon={<IconThunderbolt />}>
            我的一天
        </MenuItem>
        <MenuItem path='/dreamManager' icon={<IconApps/>}>
            任务管理
        </MenuItem>
        <MenuItem path='/a' icon={<IconApps/>}>
            燃烧日程
        </MenuItem>
        <MenuItem path='/b' icon={<IconApps/>}>
            任务
        </MenuItem>
        <MenuItem path='/goal' icon={<IconApps/>}>
            目标
        </MenuItem>
        <MenuItem path='/dream' icon={<IconApps/>}>
            梦想
        </MenuItem>
      </Menu>
      <ContentBox>
        {children}
      </ContentBox>
    </HomeBox>
  )
}
export default Home
