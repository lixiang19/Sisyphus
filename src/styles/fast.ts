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
  title: {
    ...font.weight.medium,
    ...font.size.lg

  },
  label: {
    ...font.weight.medium,
    ...font.size.md

  },
  value: {
    ...font.weight.medium,
    ...font.size.md

  },
  text: {
    ...font.weight.normal,
    ...font.size.sm

  }
}
export default fast
