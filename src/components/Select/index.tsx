import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Select, Tag } from '@arco-design/web-react'
const options = [
  'red',
  'orangered',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'arcoblue',
  'purple',
  'magenta'
]
function tagRender (props:any) {
  const { label, value, closable, onClose } = props

  return (
    <Tag
      color={options.indexOf(value) > -1 ? value : 'gray'}
      closable={closable}
      onClose={onClose}
      style={{ margin: '2px 6px 2px 0' }}
    >
      {label}
    </Tag>
  )
}
const SelectBox = styled.div(

)
interface SelectProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}
const CusSelect = ({ onClick, children, className }: SelectProps) => {
  return (
    <>
      <Select
        style={{ maxWidth: 350, marginRight: 20 }}
        allowClear
        placeholder='Please Select'
        mode={'multiple'}
        allowCreate={true}
        defaultValue={options.slice(0, 2)}
        options={options}
        renderTag={tagRender}
      />
    </>
  )
}
export default CusSelect
