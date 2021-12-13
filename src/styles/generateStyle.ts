import theme from './theme'
const pmMap = {
  '': '',
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: 'x',
  y: 'y'
}
function generatePM (): IPm {
  const baseStandards = ['5px', '10px', '15px', '20px', '25px']
  const directions = ['', 't', 'r', 'b', 'l', 'x', 'y']
  const pm: any = {}
  baseStandards.forEach((item, index) => {
    directions.forEach((direction) => {
      const keyM = 'm' + direction + (index + 1)
      const keyP = 'p' + direction + (index + 1)
      if (direction === 'y') {
        pm[keyM] = {
          marginTop: item,
          marginBottom: item
        }
        pm[keyP] = {
          paddingTop: item,
          paddingBottom: item
        }
      } else if (direction === 'x') {
        pm[keyM] = {
          marginLeft: item,
          marginRight: item
        }
        pm[keyP] = {
          paddingLeft: item,
          paddingRight: item
        }
      } else {
        pm[keyM] = {
          ['margin' + pmMap[direction as pmkey]]: item
        }
        pm[keyP] = {
          ['padding' + pmMap[direction as pmkey]]: item
        }
      }
    })
  })
  return pm as IPm
}
export const space = generatePM()

export function textBase (fontSize: string, color: string, weight: number) {
  return {
    fontSize: fontSize,
    color: color,
    fontWeight: weight
  }
}

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
export const flex = generateFlex()
export const depth = {
  depth1: {
    boxShadow:
      '0 1.6px 3.6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%)'
  },
  depth2: {
    boxShadow:
      '0 3.2px 7.2px 0 rgb(0 0 0 / 13%), 0 0.6px 1.8px 0 rgb(0 0 0 / 11%)'
  },
  depth3: {
    boxShadow:
      '0 6.4px 14.4px 0 rgb(0 0 0 / 13%), 0 1.2px 3.6px 0 rgb(0 0 0 / 11%)'
  },
  depth4: {
    boxShadow:
      '0 25.6px 57.6px 0 rgb(0 0 0 / 22%), 0 4.8px 14.4px 0 rgb(0 0 0 / 18%)'
  }
}
type DepthType = 'depth1' | 'depth2' | 'depth3' | 'depth4'
export const card = {
  card: {
    ...depth.depth1,
    borderRadius: '3px',
    backgroundColor: theme.cardBg
  },
  cardc (dep: DepthType = 'depth1', radius = 3) {
    return {
      ...depth[dep],
      borderRadius: radius
    }
  }
}
// const foo = {
//   grid: {
//     display: 'grid'
//   },
//   grid
// }

// 这样玩虽然很炫酷，full和full.w返回不同的东西，但是和其他的style表现不一致了
// const full: IFull = {
//   height: '100%',
//   width: '100%'
// }
// const proxyFull = new Proxy(full, {
//   get (target, propKey) {
//     if (propKey === 'w') {
//       return {
//         width: target.width
//       }
//     } else if (propKey === 'h') {
//       return {
//         height: target.height
//       }
//     }
//   }
// })
