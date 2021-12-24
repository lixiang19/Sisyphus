import styled from '@emotion/styled'
import s from 'src/styles/styleObject'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'

const MenuBox = styled.div(
  {
    backgroundColor: s.theme.cardBg,
    rowGap: 15
  },
  s.flex.col.s.sh,
  s.space.p4
)
console.log(global)
const MenuItemBox = styled.div(
  {
    ':hover': {
      backgroundColor: '#f7f8fa',
      color: s.theme.themeColor,
      '&>a': {
        color: s.theme.themeColor
      }
    },
    '&>a': {
      fontWeight: 500,
      color: s.theme.textPrimary,
      fontSize: 'inherit'
    },
    borderRadius: 10,
    display: 'grid',
    gridTemplateColumns: '40px 1fr',
    alignItems: 'center',
    fontSize: 18

  },
  s.space.py1,
  s.space.px2,
  s.cp
)

interface IMenuItemProp {
  path: string,
  icon?: React.ReactNode,
  children?: React.ReactNode;
}
const MenuItem = ({ children, icon, path }:IMenuItemProp) => {
  return (
    <MenuItemBox>
      {icon}
      <Link to={path}>
        {children}
      </Link>
    </MenuItemBox>
  )
}

interface IMenuProp{
  children?: React.ReactNode;
}
const Menu = ({ children }:IMenuProp) => {
  return (
    <MenuBox>
      {children}
    </MenuBox>
  )
}
Menu.MenuItem = MenuItem
export default Menu
