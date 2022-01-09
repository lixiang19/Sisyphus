import bg from './styleHelper/bg'
import border from './styleHelper/border'
import effect from './styleHelper/effect'
import display from './styleHelper/display'
import flex from './styleHelper/flex'
import grid from './styleHelper/grid'
import container from './styleHelper/container'
import font from './styleHelper/font'
import gap from './styleHelper/gap'
import inset from './styleHelper/inset'
import interactivity from './styleHelper/interactivity'
import objectFit from './styleHelper/objectFit'
import overflow from './styleHelper/overflow'
import position from './styleHelper/position'
import space from './styleHelper/space'
import z from './styleHelper/z'
import pseudoClass from './styleHelper/pseudoClass'
import theme from './theme/theme'
import fast from './fast'
import transform from './styleHelper/transform'
import size from './styleHelper/size'
import animation from './animation'
import gradient from './styleHelper/gradient'
const s = {
  theme,
  size,
  bg,
  border,
  container,
  display,
  effect,
  flex,
  grid,
  font,
  gap,
  inset,
  interactivity,
  objectFit,
  overflow,
  space,
  position,
  z,
  pseudoClass,
  transform,
  animation,
  gradient,
  ...interactivity,
  ...fast,
  left: inset.left,
  right: inset.right,
  top: inset.top,
  bottom: inset.bottom,
  shadow: effect.shadow,
  opacity: effect.opacity,
  height: container.height,
  width: container.width,
  h: container.height,
  w: container.width,
  minHeight: container.minHeight,
  minWidth: container.minWidth,
  maxHeight: container.maxHeight,
  maxWidth: container.maxWidth,
  rounded: border.rounded,
  absolute: position.absolute,
  relative: position.relative,
  fixed: position.fixed,
  sticky: position.sticky,
  margin: space.margin,
  m: space.margin.all,
  mt: space.margin.t,
  mr: space.margin.r,
  mb: space.margin.b,
  ml: space.margin.l,
  mx: space.margin.x,
  my: space.margin.y,
  padding: space.padding,
  p: space.padding.all,
  pt: space.padding.t,
  pr: space.padding.r,
  pb: space.padding.b,
  pl: space.padding.l,
  px: space.padding.x,
  py: space.padding.y,
  hover: pseudoClass.hover,
  join: fast.join
}
export default s
