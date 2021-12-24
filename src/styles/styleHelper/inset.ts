
import size from './size'
const inset = {
  top: {},
  right: {},
  bottom: {},
  left: {}
}
Object.keys(size).forEach(key => {
  inset.top = {
    key: size[key]
  }
  inset.right = {
    right: size[key]
  }
  inset.bottom = {
    bottom: size[key]
  }
  inset.left = {
    left: size[key]
  }
})
export default inset
