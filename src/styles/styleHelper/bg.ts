import ThemeColor from '../theme/color'

const bg:any = {}
function isColorItem (arg: ColorItem|string): arg is ColorItem {
  return (arg as ColorItem)[100] !== undefined
}

Object.keys(ThemeColor).forEach((key) => {
  if (typeof ThemeColor[key] === 'string') {
    bg[key] = {
      backgroundColor: ThemeColor[key]
    }
  } else if (isColorItem(ThemeColor[key])) {
    Object.keys(ThemeColor[key]).forEach((number) => {
      bg[key][number] = {
        backgroundColor: ThemeColor[key][(number as keyof ColorItem)]
      }
    })
  }
})

export default bg as ThemeColorUse
