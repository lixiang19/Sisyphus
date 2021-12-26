import { genProxy } from 'src/helpers/type'
import size from './size'
type Inset = {
  top:ISizeUse,
  right:ISizeUse,
  bottom:ISizeUse,
  left:ISizeUse,
}
const inset:Inset = {
  top: {},
  right: {},
  bottom: {},
  left: {}
}
Object.keys(size).forEach(key => {
  inset.top[key] = {
    top: size[key]
  }
  inset.right[key] = {
    right: size[key]
  }
  inset.bottom[key] = {
    bottom: size[key]
  }
  inset.left[key] = {
    left: size[key]
  }
})
const proxy = {
  top: genProxy(inset.top, 'top'),
  right: genProxy(inset.right, 'right'),
  bottom: genProxy(inset.bottom, 'bottom'),
  left: genProxy(inset.left, 'left')
}

export default proxy
