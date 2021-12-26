const hasKey = <T extends object>(obj: T, k: keyof any): k is keyof T =>
  k in obj
function genProxy<T extends IAnyPropObject> (obj:T, property:string, otherProperties?:IAnyPropObject) {
  const proxy = new Proxy(obj, {
    get: function (target, propKey) {
      if (hasKey(target, propKey)) {
        return target[propKey as string]
      } else {
        return {
          [property]: propKey,
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
