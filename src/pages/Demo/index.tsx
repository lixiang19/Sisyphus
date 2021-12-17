import styled from '@emotion/styled'
import s from 'src/styles/styleObject'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import Menu from 'src/components/Menu'
const DemoBox = styled.div(
  {
    height: '100vh',
    width: '100vw',
    backgroundColor: s.theme.backgroundColor
  }
)
const Demo = () => {
  return (
    <DemoBox>
      <Menu></Menu>
    </DemoBox>
  )
}
export default Demo
