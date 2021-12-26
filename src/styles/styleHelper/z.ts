
type IZ = {
  auto:IAnyPropObject
}&IAnyPropObject
const z:IZ = {
  99: {
    zIndex: 99
  },
  auto: {
    zIndex: 'auto'
  }
}
for (let i = -10; i <= 10; i++) {
  z[i] = {
    zIndex: i
  }
}
export default z
