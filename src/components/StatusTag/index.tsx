import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
const ColorMap = {
  ready: s.bg.slate[400],
  inProgress: s.bg.amber[500],
  complete: s.bg.green[600]
}
const StatusTagBox = styled.div<{color:string}>(
  s.minWidth[2],
  // s.height[5],
  s.font.color.white,
  s.font.size.sm,
  s.flex.row.c.c,
  s.border.rounded.xs,
  s.padding.x[2],
  s.py[1],
  props => ({ backgroundColor: props.color })
)
interface StatusTagProps {
  color: string,
  children?: React.ReactNode;
}
const StatusTag = ({ color, children }:StatusTagProps) => {
  return (
    <StatusTagBox color={color}>
      {children}
    </StatusTagBox>
  )
}
export default StatusTag
