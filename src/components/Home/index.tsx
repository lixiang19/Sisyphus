import styled from '@emotion/styled'
import s from 'src/styles/styleObject'
import { Menu } from '@arco-design/web-react'
import { IconApps, IconSafe, IconBulb, IconRobot, IconFire } from '@arco-design/web-react/icon'
import { Link } from 'react-router-dom'
import { MouseEvent } from 'react'
const MenuItem = Menu.Item
const HomeBox = styled.div(
  {
    height: '100vh',
    backgroundColor: s.theme.backgroundColor
  },
  s.flex.row.s.s
)
const MenuBox = styled.div(
  {
    width: 150,
    backgroundColor: '#f7f6f3',
    Menu: {
      color: 'red'
    }
  },
  s.fullh
)

const ContentBox = styled.div(
  {
    width: 'auto',
    flex: '1',
    padding: 20
  }
)

interface IHomeProps {
  children?: React.ReactNode;
}
const Home = ({ children }:IHomeProps) => {
  return (
    <HomeBox>
      <MenuBox>
        <Menu mode='pop' css={{ height: '100%' }} >
          <MenuItem key='Tomato'>
            <IconApps />
            <Link to='Tomato'>
              番茄时钟
            </Link>
          </MenuItem>
          <MenuItem key='Todo'>
            <IconApps />
            <Link to='Todo'>
              Todo
            </Link>
          </MenuItem>
          <MenuItem key='1'>
            <IconApps />
            微习惯
          </MenuItem>
          <MenuItem key='2'>
            <IconApps />
            日程
          </MenuItem>
          <MenuItem key='3'>
            <IconApps />
            我的一天
          </MenuItem>
        </Menu>
      </MenuBox>
      <ContentBox>
        {children}
      </ContentBox>
    </HomeBox>
  )
}
export default Home
