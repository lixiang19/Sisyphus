import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { IconPlusCircle } from '@arco-design/web-react/icon'

const AddButtonBox = styled.div(
  s.cp,
  s.width.full,
  s.height.full,
  // s.card,
  // s.height[8],
  s.flex.row.c.c,
  s.border.rounded.md,
  s.bg.sky[100],
  s.gap.x[3],
  s.font.size['50%'],
  s.font.color.sky[500],
  s.font.weight.bold,
  s.border.secondary
)
interface AddButtonProps {
  onClick: () => void;
  className?: string;
}
const AddButton = ({ onClick, className }:AddButtonProps) => {
  return (
    <AddButtonBox onClick={onClick} className={className}>
      <IconPlusCircle />
      新建
    </AddButtonBox>
  )
}
export default AddButton
