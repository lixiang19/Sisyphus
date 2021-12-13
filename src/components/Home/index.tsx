import styled from '@emotion/styled'
import s from 'src/styles/styleObject'
import { Menu } from '@arco-design/web-react'
import { IconApps, IconSafe, IconBulb, IconRobot, IconFire } from '@arco-design/web-react/icon'
const MenuItem = Menu.Item
const HomeBox = styled.div(
  {
    height: '#f2f3f5',
    backgroundColor: s.theme.backgroundColor
  },
  s.flex.row.s.s
)
const MenuBox = styled.div(
  {
    width: 200
  }
)
const ContentBox = styled.div(
  {
    width: 'auto',
    flex: '1'
  }
)

interface IHomeProps {
  children?: React.ReactNode;
}
const Home = ({ children }:IHomeProps) => {
  return (
    <HomeBox>
      <MenuBox>
        <Menu style={{ width: 200 }} mode='pop' hasCollapseButton>
          <MenuItem key='0'>
            <IconApps />
            番茄时钟
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
