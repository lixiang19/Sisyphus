import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
const NumBox = styled.div(
  s.font.color.sky[400],
  s.p[1],
  s.rounded.xs,
  {
    background: 'rgba(0, 0, 0, 0.05)'
  }
)
const HeaderBox = styled.div(
  s.h[10],
  s.w.full,
  s.flex.row.sb.c,
  s.font.size.md,
  s.font.weight.bold
)
interface IHeader {
  children?: React.ReactNode;
  title: string;
  count: number
}
const Header = ({ children, title, count }: IHeader) => {
  return (
    <HeaderBox>
      <span>{title}</span>
      <NumBox>{count}</NumBox>
    </HeaderBox>
  )
}

const StatusWrapperBox = styled.div(
  s.minWidth[70],
  s.h.full,
  s.flex.col.s.s,
  s.bg.sky[50],
  s.py[1],
  s.px[3],
  s.rounded.md
)
interface IStatusWrapper {
  children?: React.ReactNode;
  title?: string;
  count?: number
}
const StatusWrapper = ({ children, title = '未知', count = 0 }: IStatusWrapper) => {
  return (
    <StatusWrapperBox>
      <Header title={title} count={count}></Header>
      {children}
    </StatusWrapperBox>
  )
}
export default StatusWrapper
