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
import ObjectFit from './styleHelper/ObjectFit'
import overflow from './styleHelper/overflow'
import position from './styleHelper/position'
import space from './styleHelper/space'
import z from './styleHelper/z'
import pseudoClass from './styleHelper/pseudoClass'
import theme from './theme/theme'
import fast from './fast'
const s = {
  theme,
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
  ObjectFit,
  overflow,
  space,
  position,
  z,
  pseudoClass,
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
  rounded: border.rounded,
  scroll: overflow.scroll,
  absolute: position.absolute,
  relative: position.relative,
  fixed: position.fixed,
  sticky: position.sticky,
  margin: space.margin,
  padding: space.padding,
  hover: pseudoClass.hover,
  join: fast.join
}
export default s
