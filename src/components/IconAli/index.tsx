import { Icon } from '@arco-design/web-react'
const IconFont = Icon.addFromIconFontCn({ src: 'http://at.alicdn.com/t/font_2754407_ky0t75kl1o.js' })

const IconAli = ({ type, onClick }:{type:string, onClick?:()=>void}) => {
  return <IconFont type={type} onClick={onClick}></IconFont>
}
export default IconAli
