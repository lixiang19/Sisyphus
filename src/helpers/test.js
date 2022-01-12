// eslint-disable-next-line space-before-function-paren
function isObjectValueEqual(a, b) {
  const aProps = Object.getOwnPropertyNames(a)
  const bProps = Object.getOwnPropertyNames(b)

  if (aProps.length !== bProps.length) {
    return false
  }

  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i]
    const propA = a[propName]
    const propB = b[propName]
    if (propA !== propB) {
      return false
    }
  }
  return true
}
export default isObjectValueEqual
console.log(new URLSearchParams('?dreamId=a'))

const a = ('avc')
const b = ('aaa')
function tag(stringArr, ...values) {
  console.log('🚀 ~ file: test.js ~ line 26 ~ tag ~ values', values)
  console.log('🚀 ~ file: test.js ~ line 26 ~ tag ~ stringArr', stringArr)
  // ...
}
tag`const a = 1 ${a} c ${b}`
