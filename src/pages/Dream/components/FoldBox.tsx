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
  s.font.color.sky[400]

)
interface IIconProps {
  isFold:boolean;
  onClick:()=>void;
}
const Icon = ({ isFold, onClick }:IIconProps) => {
  return (
    <>
      {!isFold ? <IconMenuUnfold css={IconCss} onClick={onClick}/> : ''}
    </>

  )
}
const FoldBox = styled.div<{bg: IAnyPropObject, isFold:Boolean}>(
  props => (props.bg),
  props => (props.isFold ? s.width['2/5'] : s.width['1/5']),
  s.relative,
  s.height.full,
  s.transform.all,
  s.padding.y[3],
  s.padding.x[3]
)
interface FoldProps {
  children?: React.ReactNode;
  isFold: boolean;
  bg: IAnyPropObject;
  onClick: () => void;
}
const Fold = ({ children, isFold, bg, onClick }: FoldProps) => {
  return (
    <FoldBox bg={bg} isFold={isFold}>
      {children}
      {/* <Icon isFold={isFold} onClick={onClick}/> */}
    </FoldBox>
  )
}
export default Fold
