import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
const CardContainer = styled.div(
  s.flex.col.s.s,
  s.width.full,
  s.gap.y[4],
  s.padding.all[5],
  s.card()
)
const ChildContainer = styled.div(

)
const Header = styled.div(
  s.flex.row.s.s,
  s.border.bottom,
  s.width.full,
  s.height[10]
)
const Title = styled.div(
  s.title

)
interface ItemProp {
  children?: React.ReactNode;
  title?: string;
}
const Card = ({ children, title }:ItemProp) => {
  return (
    <CardContainer>
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
