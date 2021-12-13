// 竖向滚动且重置了滚动条
import { CSSObject } from '@emotion/serialize'

const scrollY = () => {
  return `
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 3px;
    -webkit-box-shadow: inset 0 0 5px rgba(15, 14, 14, 0.08);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0, 120, 212, 0.4);
  }
  `
}
const test = (condition: boolean = false): CSSObject => {
  if (condition) {
    return {
      position: 'absolute'
    }
  } else {
    return {
      position: 'relative'
    }
  }
}
const flexSS = {
  justifyContent: 'center',
  alignItems: 'center'
}
// const test = {
//   height: 20,
//   position: 'absolute'
// }
// 扩大可点击区域
const extendClick = () => {
  return `
    position: relative;
    &:before {
      content: '';
      position: absolute;
      top: -10px; bottom: -10px; left: -10px; right: -10px;
    };
  `
}
// 一行文字溢出部分用... 代替
const noWrap = () => {
  return `
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `
}
// 多行文字溢出部分用...代替
const lineClamp = (line = 2) => {
  return `
  -webkit-line-clamp: ${line};
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  `
}
// 盒子阴影
enum DepthEnum {
  depth4 = 'box-shadow: 0 1.6px 3.6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%);',
  depth8 = 'box-shadow: 0 3.2px 7.2px 0 rgb(0 0 0 / 13%), 0 0.6px 1.8px 0 rgb(0 0 0 / 11%);',
  depth16 = 'box-shadow: 0 6.4px 14.4px 0 rgb(0 0 0 / 13%), 0 1.2px 3.6px 0 rgb(0 0 0 / 11%);',
  depth64 = 'box-shadow: 0 25.6px 57.6px 0 rgb(0 0 0 / 22%), 0 4.8px 14.4px 0 rgb(0 0 0 / 18%);'
}

type DepthType = 'depth4' | 'depth8' | 'depth16' | 'depth64'
const card = (depth: DepthType = 'depth4', radius = 3) => {
  return `
  ${DepthEnum[depth]}
  border-radius: ${radius}px;
  `
}
// hover后出现阴影，带动画
const hoverDepth = (depth: DepthType = 'depth4', radius = 3) => {
  return `
    position: relative;
    border-radius: ${radius}px;
    ::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      ${card(depth, radius)};
      transition:0.5s;
      pointer-events: none;
    }
    :hover::after {
      opacity:1
    }
  `
}
// flex函数
type Direction = 'row' | 'column'
type Justify = 's' | 'sb' | 'sa' | 'e' | 'c'
type Algin = 's' | 'b' | 'sh' | 'e' | 'c'
enum JustifyE {
  's' = 'flex-start',
  'sb' = 'space-between ',
  'sa' = 'space-around',
  'e' = 'flex-end',
  'c' = 'center'
}
enum AlginE {
  's' = 'flex-start',
  'b' = 'baseline',
  'sh' = 'stretch',
  'e' = 'flex-end',
  'c' = 'center'
}

const flex = (direction: Direction, justify: Justify, algin: Algin): string => {
  return `
    display: flex;
    flex-direction: ${direction};
    justify-content: ${JustifyE[justify]};
    align-items: ${AlginE[algin]};
  `
}
const styleObj = {
  extendClick,
  noWrap,
  card,
  hoverDepth,
  flex,
  lineClamp,
  scrollY,
  test,
  flexSS
}
export default styleObj
