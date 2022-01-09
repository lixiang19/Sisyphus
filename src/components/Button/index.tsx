import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
const ButtonBox = styled.div(
  s.cp,
  s.width[20],
  s.height[10],
  s.border.rounded.md,
  s.bg.primary,
  s.font.size.md,
  s.font.color.white
)
interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}
const Button = ({ onClick, children, className }:ButtonProps) => {
  return (
    <ButtonBox>
      {children}
    </ButtonBox>
  )
}
export default Button
