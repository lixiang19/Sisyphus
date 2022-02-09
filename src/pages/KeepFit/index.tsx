import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
const KeepFitBox = styled.div(x`
  
`)
interface KeepFitProps {
  children?: React.ReactNode;
}
const KeepFit = ({ children }: KeepFitProps) => {
  return (
    <KeepFitBox>

    </KeepFitBox>
  )
}
export default KeepFit
