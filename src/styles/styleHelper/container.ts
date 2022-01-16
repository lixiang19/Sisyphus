import size from './size'
import { genProxy } from 'src/helpers/type'
type Container = {
  height: ISizeUse,
  width: ISizeUse,
  minHeight: ISizeUse,
  minWidth: ISizeUse,
  maxHeight: ISizeUse,
  maxWidth: ISizeUse,
}
const container:Container = {
  height: {},
  width: {},
  minHeight: {},
  minWidth: {},
  maxHeight: {},
  maxWidth: {}
}
Object.keys(size).forEach(key => {
  container.height[key] = {
    height: size[key]
  }
  container.width[key] = {
    width: size[key]
  }
  container.minHeight[key] = {
    minHeight: size[key]
  }
  container.minWidth[key] = {
    minWidth: size[key]
  }
  container.maxHeight[key] = {
    maxHeight: size[key]
  }
  container.maxWidth[key] = {
    maxWidth: size[key]
  }
})

const proxy = {
  height: genProxy(container.height, 'height'),
  width: genProxy(container.width, 'width'),
  minHeight: genProxy(container.minHeight, 'minHeight'),
  minH: genProxy(container.minHeight, 'minHeight'),
  minWidth: genProxy(container.minWidth, 'minWidth'),
  minW: genProxy(container.minWidth, 'minWidth'),
  maxHeight: genProxy(container.maxHeight, 'maxHeight'),
  maxH: genProxy(container.maxHeight, 'maxHeight'),
  maxWidth: genProxy(container.maxWidth, 'maxWidth'),
  maxW: genProxy(container.maxWidth, 'maxWidth')
}

export default proxy
