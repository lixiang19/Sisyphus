import size from './size'
import { genProxy } from 'src/helpers/type'
type Container = {
  height: ISizeUse,
  width: ISizeUse,
}
const container:Container = {
  height: {},
  width: {}
}
Object.keys(size).forEach(key => {
  container.height[key] = {
    height: size[key]
  }
  container.width[key] = {
    width: size[key]
  }
})

const proxy = {
  height: genProxy(container.height, 'height'),
  width: genProxy(container.width, 'width')
}

export default proxy
