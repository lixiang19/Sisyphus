import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
const MotionBroadcastBox = styled.div(x`
  
`)
interface MotionBroadcastProps {
  children?: React.ReactNode;
}
const MotionBroadcast = ({ children }: MotionBroadcastProps) => {
  return (
    <MotionBroadcastBox>

    </MotionBroadcastBox>
  )
}
export default MotionBroadcast
