import styled from '@emotion/styled'
import s from 'src/styles/styleObject'
import { useRequest, useInterval, useBoolean } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Progress, Button } from '@arco-design/web-react'
import { IconPlayArrow, IconPause, IconRecordStop } from '@arco-design/web-react/icon'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

const TomatoBox = styled.div(
  {
    height: 200,
    width: 200,
    position: 'relative'
  },
  s.flex.col.c.c
)

const TomatoProgress = styled(Progress)({
  '.arco-progress-circle-wrapper': {
    // height: '200px !important',
    // width: '200px !important'
  }
})

const ActionBox = styled.div(
  {
    position: 'absolute',
    fontSize: 40,
    color: s.theme.themeColor
  },
  s.full,
  s.flex.col.c.c
)
const MIconButton = styled.div(
  {
    cursor: 'pointer',
    position: 'absolute',
    bottom: '10%',
    fontSize: 30,
    color: s.theme.textSecondary
  }
)

interface ITimeLabelProps {
  second:number
}
const TimeLabel = ({ second }:ITimeLabelProps) => {
  const hms = dayjs.duration(second * 1000).format('mm:ss')
  return (
    <div>
      {hms}
    </div>
  )
}
interface ITomatoProps {

}
const Tomato = () => {
  const minute = 25
  const [second, setSecond] = useState(() => 25 * 60)
  const progressPiece = useMemo(() => minute * 600, [minute])
  const [progress, setProgress] = useState(0)
  const [isProgress, { setTrue: startTomato, setFalse: setPause }] = useBoolean(false)
  useInterval(() => {
    setSecond(second - 1)
  }, isProgress ? 1000 : null)
  useInterval(() => {
    setProgress(progress + 1)
    if (progress >= 100) {
      setPause()
    }
  }, isProgress ? progressPiece : null)

  return (
    <TomatoBox>
      <TomatoProgress width={200} percent={progress} type='circle' showText={false}></TomatoProgress>
      <ActionBox>
        <TimeLabel second={second}></TimeLabel>
        <MIconButton>
          {isProgress ? <IconPause onClick={setPause}/> : <IconPlayArrow onClick={startTomato}/>}
          {isProgress ? <IconRecordStop css={{ color: s.theme.dangerColor }}/> : ''}
        </MIconButton>
      </ActionBox>

    </TomatoBox>
  )
}
export default Tomato
