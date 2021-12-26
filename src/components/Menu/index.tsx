import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest, useBoolean } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

const MenuBox = styled.div(
  s.bg.white,
  s.gap.y[4],
  s.flex.col.s.sh,
  s.padding.all[2],
  s.border.right
)
const itemActive = s.join(
  s.bg.slate[100],
  s.font.color.primary,
  {
    a: s.font.color.primary
  }
)
const MenuItemBox = styled.div<{ isActive: boolean}>(
  props => (props.isActive ? itemActive : ''),
  s.hover(
    itemActive
  ),
  s.grid.cols['0.4rem 1fr'],
  s.rounded.sm,
  s.font.size.lg,
  s.padding.y[3],
  s.padding.x[4]
)
const CLink = styled(Link)(
  s.font.color.black
)
interface IMenuItemProp {
  path: string,
  icon?: React.ReactNode,
  children?: React.ReactNode;
}
const MenuItem = ({ children, icon, path }: IMenuItemProp) => {
  const [isActive, { setTrue, setFalse }] = useBoolean(false)
  const history = useLocation()
  useEffect(() => {
    if (history.pathname === path) {
      setTrue()
    } else {
      setFalse()
    }
  }, [history.pathname])
  return (
    <MenuItemBox isActive={isActive}>
      {icon}
      <CLink to={path}>
        {children}
      </CLink>
    </MenuItemBox>
  )
}

interface IMenuProp {
  children?: React.ReactNode;
}
const Menu = ({ children }: IMenuProp) => {
  return (
    <MenuBox>
      {children}
    </MenuBox>
  )
}
Menu.MenuItem = MenuItem
export default Menu
