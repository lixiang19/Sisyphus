import themeMap from 'src/assets/styles/theme'
declare module '@emotion/react' {
  export interface Theme {
    themeColor: string
    backgroundColor: string
    textPrimary: string
    textRegular: string
    textSecondary: string
    textPlaceholder: string
    borderBase: string
    borderLight: string
    borderLighter: string
  }
}
