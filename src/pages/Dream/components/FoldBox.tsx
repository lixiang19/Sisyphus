import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest, useBoolean } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-react/icon'

const IconCss = s.join(
  s.absolute,
  s.inset.right[1],
  s.inset.top[1],
  s.font.size.xl,
  s.cp,
  s.font.color.primary

)
interface IIconProps {
  isFold:boolean;
}
const Icon = ({ isFold }:IIconProps) => {
  return (
    isFold ? <IconMenuFold css={IconCss}/> : <IconMenuUnfold css={IconCss}/>
  )
}
const FoldBox = styled.div(
  s.relative,
  s.height.full,
  s.width[100],
  s.bg.gray[200]
)
interface FoldProps {
  children?: React.ReactNode;
  isFold: boolean;
  bg: string;
}
const Fold = ({ children, isFold, bg }: FoldProps) => {
  return (
    <FoldBox>
      {children}
      <Icon isFold={isFold}/>
    </FoldBox>
  )
}
export default Fold
