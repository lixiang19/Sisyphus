interface IFlexProp {
  display: string
  flexDirection: string
  justifyContent: string
  alignItems: string
}
type flexItem = IFlexProp & string
interface IFlexCol {
  s: flexItem
  b: flexItem
  sh: flexItem
  e: flexItem
  c: flexItem
}
interface IFlexRow {
  s: IFlexCol
  sb: IFlexCol
  sa: IFlexCol
  e: IFlexCol
  c: IFlexCol
}
interface IFlex {
  row: IFlexRow
  col: IFlexRow
}
type Direction = 'row' | 'col'
type Justify = 's' | 'sb' | 'sa' | 'e' | 'c'
type Algin = 's' | 'b' | 'sh' | 'e' | 'c'
interface IFull {
  height: string
  width: string
  w?: any
  h?: any
}
type pmkey = '' | 't' | 'r' | 'b' | 'l' | 'x' | 'y'
interface IPm {
  m1: string
  m2: string
  m3: string
  m4: string
  m5: string
  mb1: string
  mb2: string
  mb3: string
  mb4: string
  mb5: string
  ml1: string
  ml2: string
  ml3: string
  ml4: string
  ml5: string
  mr1: string
  mr2: string
  mr3: string
  mr4: string
  mr5: string
  mt1: string
  mt2: string
  mt3: string
  mt4: string
  mt5: string
  mx1: string
  mx2: string
  mx3: string
  mx4: string
  mx5: string
  my1: string
  my2: string
  my3: string
  my4: string
  my5: string
  p1: string
  p2: string
  p3: string
  p4: string
  p5: string
  pb1: string
  pb2: string
  pb3: string
  pb4: string
  pb5: string
  pl1: string
  pl2: string
  pl3: string
  pl4: string
  pl5: string
  pr1: string
  pr2: string
  pr3: string
  pr4: string
  pr5: string
  pt1: string
  pt2: string
  pt3: string
  pt4: string
  pt5: string
  px1: string
  px2: string
  px3: string
  px4: string
  px5: string
  py1: string
  py2: string
  py3: string
  py4: string
  py5: string
}
