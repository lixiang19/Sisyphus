import theme from './theme'
import { space, textBase, flex, card, depth } from './generateStyle'
const fz = {
  sm: '12px',
  md: '16px',
  lg: '20px'
}
const text = {
  title: textBase(fz.lg, theme.textPrimary, 800),
  label: textBase(fz.md, theme.textRegular, 400),
  value: textBase(fz.md, theme.textRegular, 400),
  subtitle: textBase(fz.sm, theme.textSecondary, 200)
}

const styleHelper = {
  full: {
    height: '100%',
    width: '100%'
  },
  fullw: {
    width: '100%'
  },
  fullh: {
    height: '100%'
  },
  oh: {
    overflow: 'hidden'
  },
  cp: {
    cursor: 'pointer'
  },
  theme,
  ...card,
  depth,
  fz,
  text,
  flex,
  space
}
export default styleHelper
