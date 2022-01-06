import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { IconPlusCircle } from '@arco-design/web-react/icon'

const AddButtonBox = styled.div(
  s.width.full,
  s.height[10],
  s.flex.row.c.c,
  s.border.rounded.md,
  s.bg.transparent,
  s.gap.x[3],
  s.font.size.md,
  s.font.color.gray[500],
  s.font.weight.thin,
  s.margin.t[3],
  s.border.secondary
)
const AddButton = () => {
  return (
    <AddButtonBox>
      <IconPlusCircle />
      创建
    </AddButtonBox>
  )
}
export default AddButton
