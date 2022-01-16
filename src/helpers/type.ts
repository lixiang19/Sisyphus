import str from 'src/helpers/str'
const hasKey = <T extends object>(obj: T, k: keyof any): k is keyof T =>
  k in obj
function genProxy<T extends IAnyPropObject> (obj:T, property:string, otherProperties?:IAnyPropObject) {
  const proxy = new Proxy(obj, {
    get: function (target, propKey:string) {
      if (hasKey(target, propKey)) {
        return target[propKey as string]
      } else {
        return {
          [property]: str.hyphenate(propKey),
          ...otherProperties
        }
      }
    }
  })
  return proxy as T
}
export {
  genProxy
}
