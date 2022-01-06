import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import StatusTag from 'src/components/StatusTag'

const Header = styled.div(
  s.width.full,
  s.height[10],
  s.font.color.neutral[800],
  s.font.size.lg,
  s.flex.row.s.c,
  s.gap.x[3]
)
const Bottom = styled.div(
  s.width.full,
  s.height[12],
  s.border.top,
  s.font.size.lg,
  s.flex.row.s.c,
  s.gap.x[3]
)
const ContentBox = styled.div(
  s.width.full,
  s.height[40],
  s.margin.y[1],

  {
    img: {
      ...s.border.rounded.xs,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }
)
const BaseCardBox = styled.div(
  s.width.full,
  s.minHeight[20],
  s.cp,
  s.card(),
  s.flex.col.s.s,
  s.padding.x[3],
  s.hover(
    s.card('lg')
    // {
    //   borderRight: `0.05rem solid ${s.theme.color.primary}`
    // }
  )
)
type BaseCardProps = {}&Partial<Dream>
const BaseCard = ({ name }:BaseCardProps) => {
  return (
    <BaseCardBox>
      <Header>成为编程高手</Header>
      <ContentBox>
        <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=6000" alt="" />
      </ContentBox>
      <Bottom>
        <StatusTag bg={s.bg.blue[400]}>inProgress</StatusTag>
        <StatusTag bg={s.bg.slate[400]}>1h30m</StatusTag>
        {/* <StatusTag status='inProgress'>ss</StatusTag> */}
      </Bottom>
    </BaseCardBox>
  )
}
export default BaseCard
