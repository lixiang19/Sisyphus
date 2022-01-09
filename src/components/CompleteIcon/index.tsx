import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Icon } from '@arco-design/web-react'
import { keyframes } from '@emotion/react'
const IconFont = Icon.addFromIconFontCn({ src: '//at.alicdn.com/t/font_2754407_ly6n4slnhtk.js' })

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
      <IconFont type='icon-shandian1'></IconFont>
    </CompleteBox>
  )
}
export default Complete
