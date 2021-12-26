import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import Menu from 'src/components/Menu'
import { IconApps, IconSafe, IconBulb, IconRobot, IconFire, IconThunderbolt } from '@arco-design/web-react/icon'
import { Link } from 'react-router-dom'
import { MouseEvent } from 'react'
const MenuItem = Menu.MenuItem
const HomeBox = styled.div(
  s.height['100vh'],
  s.bg.slate[50],
  s.grid.cols['2rem 1fr']
)

const ContentBox = styled.div(
  s.padding.all[5]
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
        <MenuItem path='tomato' icon={<IconApps/>}>
            微习惯
        </MenuItem>
        <MenuItem path='tomato' icon={<IconApps/>}>
            番茄时钟
        </MenuItem>
        <MenuItem path='tomato' icon={<IconApps/>}>
            任务管理
        </MenuItem>
      </Menu>
      <ContentBox>
        {children}
      </ContentBox>
    </HomeBox>
  )
}
export default Home
