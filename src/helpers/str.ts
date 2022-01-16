const hyphenateRE = /\B([A-Z])/g
const hyphenate = function (str:string) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}
export default {
  hyphenate
}
