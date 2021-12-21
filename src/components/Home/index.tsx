import styled from '@emotion/styled'
import s from 'src/styles/styleObject'
import Menu from 'src/components/Menu'
import { IconApps, IconSafe, IconBulb, IconRobot, IconFire } from '@arco-design/web-react/icon'
import { Link } from 'react-router-dom'
import { MouseEvent } from 'react'
const MenuItem = Menu.MenuItem
const HomeBox = styled.div(
  {
    height: '100vh',
    backgroundColor: s.theme.backgroundColor,
    display: 'grid',
    gridTemplateColumns: '200px 1fr'
  }
)

const ContentBox = styled.div(
  {
    padding: 20
  }
)

interface IHomeProps {
  children?: React.ReactNode;
}
const Home = ({ children }:IHomeProps) => {
  return (
    <HomeBox>
      <Menu>
        <MenuItem path='tomato' icon={<IconApps/>}>
            微习惯
        </MenuItem>
        <MenuItem path='tomato' icon={<IconApps/>}>
            番茄时钟
        </MenuItem>
        <MenuItem path='tomato' icon={<IconApps/>}>
            Todo
        </MenuItem>
        <MenuItem path='tomato' icon={<IconApps/>}>
            我的一天
        </MenuItem>
      </Menu>
      <ContentBox>
        {children}
      </ContentBox>
    </HomeBox>
  )
}
export default Home
