import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
const KeepFitBox = styled.div(x`
  
`)
function speak (txt: string) {
  return new Promise<string>((resolve, reject) => {
    const utterThis = new window.SpeechSynthesisUtterance('接下来进行背部训练，采用阶梯组的形式，一个动作5分钟,')
    utterThis.lang = 'zh-TW'
    window.speechSynthesis.speak(utterThis)
    utterThis.onend = function (event) {
      resolve('ok')
    }
  })
}
interface KeepFitProps {
  children?: React.ReactNode;
}
const KeepFit = ({ children }: KeepFitProps) => {
  async function startTrain () {
    await speak('接下来进行背部训练，采用阶梯组的形式，一个动作5分钟,')
    console.log('start train')
  }
  useEffect(() => {
    startTrain()
  }, [])
  return (
    <KeepFitBox>

    </KeepFitBox>
  )
}
export default KeepFit
