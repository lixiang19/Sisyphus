// import themeMap from 'src/styles/theme'
// declare module '@emotion/react' {
//   export interface Theme {
//     themeColor: string
//     backgroundColor: string
//     textPrimary: string
//     textRegular: string
//     textSecondary: string
//     textPlaceholder: string
//     borderBase: string
//     borderLight: string
//     borderLighter: string
//   }
// }
interface ColorItem {
  100: string,
  200: string,
  300: string,
  400: string,
  500: string,
  600: string,
  700: string,
  800: string,
  900: string,
}
type ColorUseItem = {
  [key in keyof ColorItem]: IAnyPropObject
}
interface Color {
  slate:Readonly<ColorItem>,
  neutral:Readonly<ColorItem>,
  sky:Readonly<ColorItem>,
  violet:Readonly<ColorItem>,
  rose:Readonly<ColorItem>,
  teal:Readonly<ColorItem>,
  orange:Readonly<ColorItem>,
}
type ColorUse = {
  [key in keyof Color]: ColorUseItem
}
interface BaseColor {
  primary: string,
  white: string,
  black: string,
}
type BaseColorUse = {
  [key in keyof BaseColor]: IAnyPropObject
}
type ThemeColor = Readonly<BaseColor>&Readonly<Color>
type ThemeColorUse = BaseColorUse&ColorUse
