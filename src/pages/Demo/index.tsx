import styled from '@emotion/styled'
import BaseCard from 'src/components/BaseCard'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import Menu from 'src/components/Menu'
import s, { x } from 'src/styles/styleHelper'

const DemoBox = styled.div(
  {
    height: '100vh',
    width: '100vw'
  }
)

const Demo = () => {
  return (
    <DemoBox>
      {/* <Menu></Menu> */}
      <BaseCard title='一个任务'></BaseCard>

    </DemoBox>
  )
}
export default Demo
