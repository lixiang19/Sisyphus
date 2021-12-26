import effect from './styleHelper/effect'
import theme from './theme/theme'
import font from './styleHelper/font'
import border from './styleHelper/border'
const fast = {
  join (...args: any[]) {
    return Object.assign({}, ...args)
  },
  // 一行文字溢出部分用... 代替
  noWrap: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    'white-space': 'nowrap'
  },
  // 多行文字溢出部分用...代替
  lineClamp (line = 2) {
    return {
      '-webkit-line-clamp': line,
      display: '-webkit-box',
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  },
  card (shadow :keyof typeof effect.shadow = 'md') {
    return {
      backgroundColor: theme.color.white,
      ...effect.shadow[shadow],
      ...border.rounded.xs
    }
  },
  hoverCard (shadow :keyof typeof effect.shadow = 'lg') {
    return {
      position: 'relative',
      ...effect.shadow[shadow],
      ...border.rounded.md,
      '::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0,
        ...effect.shadow[shadow],
        ...border.rounded.md,
        transition: '0.5s',
        pointerEvents: 'none'
      },
      ':hover::after': {
        opacity: 1
      }
    }
  },
  title: {
    ...font.weight.black,
    ...font.size.xl,
    ...font.color.black
  },
  label: {
    ...font.weight.normal,
    ...font.size.md,
    ...font.color.black
  },
  text: {
    ...font.weight.normal,
    ...font.size.sm,
    ...font.color.black
  }
}
export default fast
