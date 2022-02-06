import { Icon } from '@arco-design/web-react'
const IconFont = Icon.addFromIconFontCn({ src: 'http://at.alicdn.com/t/font_2754407_vbd1n3wdak.js' })

const IconAli = ({ type, onClick }:{type:string, onClick?:()=>void}) => {
  return <IconFont type={type} onClick={onClick}></IconFont>
}
export default IconAli
