import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'

import { keyframes } from '@emotion/react'
import IconAli from 'src/components/IconAli'

const CompleteBox = styled.div(
  s.mt[1],
  s.hover(
    s.animation.heatBeat
  )
)
interface CompleteProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}
const Complete = ({ onClick, children, className }: CompleteProps) => {
  return (
    <CompleteBox onClick={onClick}>
      <IconAli type='icon-shandian1'></IconAli>
    </CompleteBox>
  )
}
export default Complete
