import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
const CardContainer = styled.div(
  s.flex.col.s.s,
  s.gap.y[4]
)
const ChildContainer = styled.div(
  s.card(),
  s.padding.all[5]
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
      <Title>{title}</Title>
      <ChildContainer>
        {children}
      </ChildContainer>
    </CardContainer>
  )
}
export default Card
