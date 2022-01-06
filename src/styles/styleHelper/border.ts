import theme from '../theme/theme'
import { genProxy } from 'src/helpers/type'
type Border = {
  rounded: {
    xs:IAnyPropObject,
    sm:IAnyPropObject,
    md: IAnyPropObject,
    lg: IAnyPropObject,
    xl: IAnyPropObject
    xxl: IAnyPropObject
    circle: IAnyPropObject,
  },
  primary: IAnyPropObject,
  secondary: IAnyPropObject,
  tertiary: IAnyPropObject,
  left: IAnyPropObject,
  right: IAnyPropObject,
  top: IAnyPropObject,
  bottom: IAnyPropObject,
}
const border:any = {
  rounded: {
    xs: {
      borderRadius: '0.07rem'
    },
    sm: {
      borderRadius: '0.1rem'
    },
    md: {
      borderRadius: '0.25rem'
    },
    lg: {
      borderRadius: '0.5rem'
    },
    xl: {
      borderRadius: '1rem'
    },
    xxl: {
      borderRadius: '2rem'
    },
    circle: {
      borderRadius: '50%'
    }
  },
  primary: {
    border: `0.01rem solid ${theme.border.primary}`
  },
  secondary: {
    border: `0.01rem solid ${theme.border.secondary}`
  },
  tertiary: {
    border: `0.01rem solid ${theme.border.tertiary}`
  },
  right: {
    borderRight: `0.01rem solid ${theme.border.tertiary}`
  },
  left: {
    borderLeft: `0.01rem solid ${theme.border.tertiary}`
  },
  top: {
    borderTop: `0.01rem solid ${theme.border.tertiary}`
  },
  bottom: {
    borderBottom: `0.01rem solid ${theme.border.tertiary}`
  }
}
const proxyRounded = genProxy(border.rounded, 'borderRadius')
const proxy = genProxy(border, 'border')
proxy.rounded = proxyRounded

export default proxy as Border
