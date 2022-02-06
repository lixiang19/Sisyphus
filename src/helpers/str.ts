const hyphenateRE = /\B([A-Z])/g
const hyphenate = function (str:string) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}
export const isUrl = function (str:string) {
  const regex = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g
  return regex.test(str)
}
export const urlToLink = function (str:string) {
  const re = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g

  str = str.replace(re, function (website) {
    return "<a href='" + website + "' target='_blank'>" + website + '</a>'
  })
  return str
}
export default {
  hyphenate,
  isUrl,
  urlToLink
}
