import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'

const TagBox = styled.div<{color:string}>(
  s.minWidth[2],
  s.height[5],
  s.font.color.white,
  s.font.size.sm,
  s.flex.row.c.c,
  s.border.rounded.xs,
  s.padding.x[2],
  props => ({ backgroundColor: props.color })
)

const DotBox = styled.div<{color:string}>(
  s.minWidth[2],
  s.height[5],
  s.font.size.sm,
  props => (s.before(
    { backgroundColor: props.color },
    s.h[1],
    s.w[1],
    s.rounded.circle
  ))
)

interface StatusTagProps {
  color: string,
  children?: React.ReactNode;
  small?: boolean;
}
const StatusTag = ({ color, children, small }:StatusTagProps) => {
  const StatusTagBox = small ? DotBox : TagBox
  return (
    <StatusTagBox color={color}>
      {children}
    </StatusTagBox>
  )
}
export default StatusTag
