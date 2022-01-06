import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
const ColorMap = {
  ready: s.bg.slate[400],
  inProgress: s.bg.amber[500],
  complete: s.bg.green[600]
}
const StatusTagBox = styled.div<{bg:IAnyPropObject}>(
  s.minWidth[20],
  s.height[7],
  s.font.color.white,
  s.font.size.md,
  s.flex.row.c.c,
  s.border.rounded.xs,
  s.padding.x[2],
  props => (props.bg)
)
interface StatusTagProps {
  bg: IAnyPropObject,
  children?: React.ReactNode;
}
const StatusTag = ({ bg, children }:StatusTagProps) => {
  return (
    <StatusTagBox bg={bg}>
      {children}
    </StatusTagBox>
  )
}
export default StatusTag
