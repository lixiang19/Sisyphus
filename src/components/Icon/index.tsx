import { css } from '@emotion/react'
interface IIconProps {
  children: React.ReactNode
  size?: number
  color?: string
  className?: string
}
const Icon = ({ size, color, children, className }: IIconProps) => {
  return (
    <svg
      className={'icon ' + className}
      aria-hidden="true"
      fontSize={size + 'px'}
      color={color}>
      <use xlinkHref={'#icon-' + children}></use>
    </svg>
  )
}
export default Icon
