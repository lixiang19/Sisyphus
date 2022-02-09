import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
const NumBox = styled.div(
  s.font.weight.thin,
  s.font.size.lg,
  s.p[1],
  s.rounded.xs,
  {
    background: 'rgba(0, 0, 0, 0.05)'
  }
)
const FlexBox = styled.div(
  s.flex.row.e.c,
  s.gap.x[4]
)

const Title = styled.div<{color:string}>(
  s.px[2],
  s.py[2],
  s.rounded.xs,
  props => (props.color === 'gray' ? s.bg.gray[200] : { backgroundColor: props.color })
)
const HeaderBox = styled.div(
  s.h[15],
  s.w[90],
  s.flex.row.sb.c,
  s.font.size.md,
  s.flex.noShrink
)
interface IHeader {
  children?: React.ReactNode;
  title: string;
  color: string;
  count: number
}
const Header = ({ children, title, count, color }: IHeader) => {
  return (
    <HeaderBox >
      <Title color={color}>{title}</Title>
      <FlexBox>
        {children}
        <NumBox>{count}</NumBox>
      </FlexBox>
    </HeaderBox>
  )
}

const TagBoardWrapperBox = styled.div(
  s.w[100],
  s.h.full,
  s.flex.col.s.c,
  s.bg.gray[200],
  s.py[1],
  s.px[5],
  s.rounded.sm,
  s.relative,
  s.overflow.hidden
)
interface IStatusWrapper {
  children?: React.ReactNode;
  headerChildren?: React.ReactNode;
  title: string;
  color?: string;
  count?: number
}
const TagBoardWrapper = ({ children, title = '未知', count = 0, color = 'gray', headerChildren }: IStatusWrapper) => {
  return (
    <TagBoardWrapperBox>
      <Header title={title} count={count} color={color}>
        {headerChildren}
      </Header>
      {children}
    </TagBoardWrapperBox>
  )
}
export default TagBoardWrapper
