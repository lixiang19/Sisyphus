import size from './size'
import { genProxy } from 'src/helpers/type'
type IGap = {
  x:Partial<ISizeUse>,
  y:Partial<ISizeUse>,
}&Partial<ISizeUse>
const gap:IGap = {
  x: {},
  y: {}
}
Object.keys(size).forEach(key => {
  gap[key] = {
    gap: size[key]
  }
  gap.x[key] = {
    columnGap: size[key]
  }
  gap.y[key] = {
    rowGap: size[key]
  }
})
const proxy = genProxy(gap, 'gap')

export default proxy
