import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
const CardContainer = styled.div<{bg?:IAnyPropObject}>(
  s.flex.col.s.s,
  // s.width[30],
  s.h.full,

  s.padding.all[4],
  s.bg.emerald[400],
  // {
  //   'background-image': 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)'
  // },
  props => (props.bg),
  s.rounded.md

)
const ChildContainer = styled.div(
  s.pt[1]
)
const Header = styled.div(
  s.flex.row.s.s,
  s.border.bottom,
  s.width.full,
  s.height[8],
  s.flex.noShrink
)
const Title = styled.div(
  s.title,
  s.font.color.white

)
interface ItemProp {
  children?: React.ReactNode;
  title?: string;
  bg?:IAnyPropObject,
}
const Card = ({ children, title, bg }:ItemProp) => {
  return (
    <CardContainer bg={bg}>
      <Header>
        <Title>{title}</Title>
      </Header>
      <ChildContainer>
        {children}
      </ChildContainer>
    </CardContainer>
  )
}
export default Card
