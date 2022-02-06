import styled from '@emotion/styled'
import BaseCard from 'src/components/BaseCard'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import Menu from 'src/components/Menu'
import s, { x } from 'src/styles/styleHelper'
import Tomato from 'src/components/Tomato'

const DemoBox = styled.div(
  {
    height: '100vh',
    width: '100vw'
  }
)

const Demo = () => {
  const NOTIFICATION_TITLE = 'Title'
  const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
  const CLICK_MESSAGE = 'Notification clicked!'

  useEffect(() => {
    const notification = new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
  })
  return (
    <DemoBox>
      {/* <Menu></Menu> */}
      {/* <BaseCard title='一个任务'></BaseCard> */}
      <Tomato></Tomato>
    </DemoBox>
  )
}
export default Demo
