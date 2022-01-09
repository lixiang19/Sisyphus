import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { IconPlusCircle } from '@arco-design/web-react/icon'

const AddButtonBox = styled.div(
  s.cp,
  s.width.full,
  s.height[8],
  s.flex.row.c.c,
  s.border.rounded.md,
  s.bg.sky[100],
  s.gap.x[3],
  s.font.size.md,
  s.font.color.sky[500],
  s.font.weight.bold,
  s.my[2]
  // s.border.secondary
)
interface AddButtonProps {
  onClick: () => void;
}
const AddButton = ({ onClick }:AddButtonProps) => {
  return (
    <AddButtonBox onClick={onClick}>
      <IconPlusCircle />
      创建
    </AddButtonBox>
  )
}
export default AddButton
