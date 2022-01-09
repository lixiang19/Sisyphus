import size from './size'
import { genProxy } from 'src/helpers/type'
type IGap = {
  x:Partial<ISizeUse>,
  y:Partial<ISizeUse>,
  all:Partial<ISizeUse>,
}
const gap:IGap = {
  x: {},
  y: {},
  all: {}
}
Object.keys(size).forEach(key => {
  gap.all[key] = {
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
