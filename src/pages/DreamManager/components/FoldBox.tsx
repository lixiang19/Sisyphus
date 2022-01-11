import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest, useBoolean } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-react/icon'

const Bookmark = styled.div<{isFold:Boolean}>(
  s.cp,
  s.width['1/2'],
  s.height[3],
  s.mb[4],
  s.mx.auto,
  s.flex.noShrink,
  props => (props.isFold ? s.bg.primary : s.bg.gray[400]),
  {
    borderBottomLeftRadius: s.size.sm,
    borderBottomRightRadius: s.size.sm
  }
)

const FoldBox = styled.div<{bg: IAnyPropObject, isFold:Boolean, width:number}>(
  props => (props.bg),
  props => (props.isFold ? s.width[180] : s.width[props.width]),
  props => (props.isFold ? { flexGrow: 1 } : s.width[props.width]),
  // s.width[80],
  s.relative,
  s.height.full,
  s.transform.all,
  // s.padding.y[3],
  s.padding.x[10],
  s.pb[4],
  s.flex.col.s.s,
  s.overflow.scrollBar,
  s.overflow.y
)
interface FoldProps {
  children?: React.ReactNode;
  width?:number;
  isFold: boolean;
  bg: IAnyPropObject;
  onClick: () => void;
}
const Fold = ({ children, isFold, bg, width = 92, onClick }: FoldProps) => {
  return (
    <FoldBox bg={bg} isFold={isFold} width={width}>
      <Bookmark isFold={isFold} onClick={onClick}></Bookmark>
      {children}
      {/* <Icon isFold={isFold} onClick={onClick}/> */}
    </FoldBox>
  )
}
export default Fold
