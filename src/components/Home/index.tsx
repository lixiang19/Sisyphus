import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import Menu from 'src/components/Menu'
import { IconApps, IconSafe, IconBulb, IconRobot, IconFire, IconThunderbolt } from '@arco-design/web-react/icon'
import { Link } from 'react-router-dom'
import { MouseEvent } from 'react'
import IconAli from 'src/components/IconAli'

const MenuItem = Menu.MenuItem
const HomeBox = styled.div(
  s.height['100vh'],
  s.w['100vw'],
  s.overflow.hidden,
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
        <MenuItem path='/' icon={<IconAli type='icon-jilu'/>}>
            我的一天
        </MenuItem>
        <MenuItem path='/todo' icon={<IconAli type='icon-renwu'/>}>
            燃烧日程
        </MenuItem>
        <MenuItem path='/task' icon={<IconAli type='icon-renwu1'/>}>
            任务
        </MenuItem>
        <MenuItem path='/goal' icon={<IconAli type='icon-mubiao'/>}>
            目标
        </MenuItem>
        <MenuItem path='/dream' icon={<IconAli type='icon-chengchangjilu'/>}>
            梦想
        </MenuItem>
        <MenuItem path='/diet' icon={<IconAli type='icon-jianshen'/>}>
            饮食与运动
        </MenuItem>
        {/* <MenuItem path='/demo' icon={<IconApps/>}>
            测试页面
        </MenuItem> */}
      </Menu>
      <ContentBox>
        {children}
      </ContentBox>
    </HomeBox>
  )
}
export default Home
