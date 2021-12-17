import styled from '@emotion/styled'
import s from 'src/styles/styleObject'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
const MenuBox = styled.div(
  {
    backgroundColor: s.theme.cardBg,
    width: 200
  },
  s.fullh
)
const Menu = () => {
  return (
    <MenuBox>

    </MenuBox>
  )
}
export default Menu
