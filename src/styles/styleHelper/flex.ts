
const JustifyE = {
  s: 'flex-start',
  sb: 'space-between ',
  sa: 'space-around',
  e: 'flex-end',
  c: 'center'
}
const AlginE = {
  s: 'flex-start',
  b: 'baseline',
  sh: 'stretch',
  e: 'flex-end',
  c: 'center'
}
const DirectionMap = {
  row: 'row',
  col: 'column'
}
function flexBase (direction: Direction, justify: Justify, align: Algin) {
  return {
    display: 'flex',
    flexDirection: DirectionMap[direction],
    justifyContent: JustifyE[justify],
    alignItems: AlginE[align]
  }
}
function generateFlex () {
  const obj: any = {}
  Object.keys(DirectionMap).forEach((dKey) => {
    obj[dKey] = {}
    Object.keys(JustifyE).forEach((jKey) => {
      obj[dKey][jKey] = {}
      Object.keys(AlginE).forEach((aKey) => {
        obj[dKey][jKey][aKey] = flexBase(dKey as any, jKey as any, aKey as any)
      })
    })
  })
  return obj as IFlex
}
const flex = {
  ...generateFlex(),
  wrap: {
    flexWrap: 'wrap'
  }
}
export default flex
