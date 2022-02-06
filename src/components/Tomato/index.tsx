import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest, useInterval, useBoolean } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Progress, Button, Icon, Slider } from '@arco-design/web-react'
import { IconPlayArrow, IconPause, IconRecordStop } from '@arco-design/web-react/icon'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import IconAli from 'src/components/IconAli'
import { notice } from 'src/helpers/platformApi'
dayjs.extend(duration)
const NameBox = styled.div(x`
  absolute
  top20
  font.size.xl
  font.weight.200
`)
const TomatoBox = styled.div(
  // s.relative,
  s.flex.col.c.c,
  s.h.full,
  s.w[100],
  s.gap.y[2]
)

const TomatoProgress = styled(Progress)({

})

const ActionBox = styled.div(
  s.height[30],
  s.width.full,
  s.font.color.primary,
  s.font.size.xl,
  s.flex.row.sb.c
)
const MIconButton = styled.div(
  {
    cursor: 'pointer',
    fontSize: 30,
    backgroundColor: '#e7d8fd',
    borderRadius: '50%',
    padding: '0.2rem'
  },
  s.flex.row.c.c,
  s.font.color.primary
)
const Inner = styled.div({
  backgroundColor: '#e7d8fd',
  height: '2.5rem',
  width: '2.5rem',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#5f6f90'
})
interface ITimeLabelProps {
  second:number
}
const TimeLabel = ({ second }:ITimeLabelProps) => {
  const hms = dayjs.duration(second * 1000).format('mm:ss')
  return (
    <div css={s.font.size[14]}>
      {hms}
    </div>
  )
}
function noticeComplete (title:string, message:string) {
  // const notification = new Notification('25分钟结束', { body: '休息一下吧，做10个深蹲' })
  notice({ title, message })
}
interface ITomatoProps {
  onStart?:()=>void
  onStop?:(time:number)=>void
  onPause?:()=>void
  name?:string
}
const Tomato = ({ onStart, onStop, onPause, name }:ITomatoProps) => {
  const [minute, setMinute] = useState(25)
  const [second, setSecond] = useState(() => minute * 60)
  const progressPiece = useMemo(() => minute * 600, [minute])

  const [progress, setProgress] = useState(0)
  const [isProgress, { setTrue: startTomato, setFalse: setPause }] = useBoolean(false)
  function pause () {
    setPause()
    onPause && onPause()
  }
  function stop () {
    setPause()

    const timeConsuming = Math.ceil((minute * 60 - second) / 60)
    onStop && onStop(timeConsuming)
  }
  function timeUp () {
    const title = name + '已经做了' + minute + '分钟'
    const message = '休息一下吧，做点运动'
    noticeComplete(title, message)
    stop()
  }
  useInterval(() => {
    if (second > 0) {
      setSecond(second - 1)
    } else {
      setProgress(100)
      timeUp()
    }
  }, isProgress ? 1000 : null)
  useInterval(() => {
    setProgress(progress + 1)
    if (progress >= 100) {
      timeUp()
    }
  }, isProgress ? progressPiece : null)

  return (
    <TomatoBox>
      <NameBox>{name}</NameBox>
      <TomatoProgress width={300} trailColor='#f7dd99' color='#edeef5' strokeWidth={10} percent={progress} type='circle'
        formatText={() => <Inner><TimeLabel second={second}></TimeLabel></Inner>}></TomatoProgress>
      <ActionBox>
        <MIconButton onClick={stop}>
          <IconAli type='icon-stop1'></IconAli>
        </MIconButton>
        <MIconButton onClick={isProgress ? pause : startTomato}>
          {/* {isProgress ? <IconPause onClick={setPause}/> : <IconPlayArrow onClick={startTomato}/>} */}
          {isProgress ? <IconAli type='icon-pause'></IconAli> : <IconAli type='icon-playfill' ></IconAli>}
        </MIconButton>
      </ActionBox>
      <Slider
        defaultValue={minute}
        min={5}
        max={60}
        step={5}
        showTicks={false}
        onChange={(value) => {
          setMinute(value as number)
          setSecond(value as number * 60)
        }}
      />
    </TomatoBox>
  )
}
export default Tomato
