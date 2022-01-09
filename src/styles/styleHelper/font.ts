import size from './size'
import ThemeColor from '../theme/color'
import { genProxy } from 'src/helpers/type'
function isColorItem (arg: ColorItem|string): arg is ColorItem {
  return (arg as ColorItem)[100] !== undefined
}

const color:any = {}
Object.keys(ThemeColor).forEach((key) => {
  if (typeof ThemeColor[key] === 'string') {
    color[key] = {
      color: ThemeColor[key]
    }
  } else if (isColorItem(ThemeColor[key])) {
    Object.keys(ThemeColor[key]).forEach((number) => {
      color[key] = color[key] || {}
      color[key][number] = {
        color: ThemeColor[key][(number as keyof ColorItem)]
      }
    })
  }
})
const fontSize:any = {}
Object.keys(size).forEach(key => {
  fontSize[key] = {
    fontSize: size[key]
  }
})
const font = {
  size: fontSize as ISizeUse,
  color: color as ThemeColorUse,
  weight: {
    thin: {
      fontWeight: '100'
    },
    light: {
      fontWeight: '300'
    },
    normal: {
      fontWeight: '400'
    },
    medium: {
      fontWeight: '500'
    },
    bold: {
      fontWeight: '700'
    },
    black: {
      fontWeight: '900'
    }
  },
  tracking: {
    tight: {
      letterSpacing: '-0.05em'
    },
    normal: {
      letterSpacing: '0'
    },
    wide: {
      letterSpacing: '0.05em'
    }
  },
  wrap: {
    wordWrap: 'break-word'
  }
}

const proxy = {
  size: genProxy(font.size, 'fontSize'),
  color: genProxy(font.color, 'color'),
  weight: genProxy(font.weight, 'fontWeight'),
  tracking: genProxy(font.tracking, 'letterSpacing'),
  wrap: font.wrap as any
}
export default proxy
