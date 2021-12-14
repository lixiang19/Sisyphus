import styled from '@emotion/styled'
import s from 'src/styles/styleObject'
import { useRequest, useInterval } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Progress, Button } from '@arco-design/web-react'

const TomatoBox = styled.div(
  s.flex.col.s.s
)
interface ITimeLabelProps {
  second:number
}
const TimeLabel = ({ second }:ITimeLabelProps) => {
  return (
    <div>
      {second}
    </div>
  )
}

interface ITomatoProps {

}
const Tomato = () => {
  const minute = 25
  const [second, setSecond] = useState(0)
  const progressPiece = useMemo(() => minute * 600, [minute])
  const [progress, setProgress] = useState(0)
  useInterval(() => {
    // 这里需要改成1s—+1，但是进度判断时间
    setSecond(second + 1)
  }, 1000)
  useInterval(() => {
    // 这里需要改成1s—+1，但是进度判断时间
    setProgress(progress + 1)
  }, progressPiece)

  return (
    <TomatoBox>
      <Progress formatText={(percent) => (<TimeLabel second={second}></TimeLabel>)} percent={progress} type='circle'></Progress>
      <Button>开始</Button>
    </TomatoBox>
  )
}
export default Tomato
