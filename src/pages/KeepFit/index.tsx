import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import MOTIONDATA, { TypeMotion } from './components/MOTIONDATA'
import api from 'src/api'
import { Button, Descriptions } from '@arco-design/web-react'
let isPause = false
let timer:any = null
const KeepFitBox = styled.div(x`
  
`)
function speak (txt: string|number) {
  return new Promise<string>((resolve, reject) => {
    const utterThis = new window.SpeechSynthesisUtterance(txt.toString())
    // utterThis.lang = 'zh-TW'
    window.speechSynthesis.speak(utterThis)
    utterThis.onend = function (event) {
      resolve('ok')
    }
  })
}

function waitCountDown (second: number, startFn?:Function, fn?:Function) {
  return new Promise((resolve, reject) => {
    let i = second
    startFn && startFn(i)
    timer = setInterval(() => {
      if (!isPause) {
        i--
        fn && fn(i)
        if (i === 0) {
          clearTimeout(timer)
          resolve('ok')
        }
      }
    }, 1000)
  })
}
async function waitCountdownSpeak (second: number) {
  await waitCountDown(second, speak, speak)
}
async function waitFrequencySpeak (frequency: number, duration: number) {
  for (let index = 1; index <= frequency; index++) {
    await speak(`完成${index}个`)
    await waitCountDown(duration)
  }
}
async function speakMotionByGroup ({ frequency, group, duration }:{frequency:number, group:number, duration:number}) {
  for (let i = 1; i <= group; i++) {
    await speak(`第${i}组动作`)
    await waitCountDown(1)
    await waitFrequencySpeak(frequency, duration)
  }
}
async function speakMotionByHiit ({ high, low, group }:{high:number, low:number, group:number}) {
  for (let i = 1; i <= group; i++) {
    await speak('开始高强度')
    await waitCountdownSpeak(high)
    await speak('开始低强度')
    await waitCountdownSpeak(low)
  }
}
async function speakMotionByLadder ({ duration, group }:{duration:number, group:number}) {
  for (let i = 1; i <= group; i++) {
    await speak(`${i}分钟`)
    await waitCountdownSpeak(duration)
  }
}

type TypeLadder = {
  breakTime:number, duration:number, group:number
}
type TypeGroup = {
  frequency:number, group:number, duration:number, breakTime:number
}
type TypeHiit = {
  high:number, low:number, group:number, breakTime:number
}
async function waitMotionListSpeak (list:string[], ruleType:'group'|'hiit'|'ladder', data:TypeLadder|TypeGroup|TypeHiit) {
  let i = 1
  for (const iterator of list) {
    await speak(`第${i}个动作，${iterator},开始计时`)
    switch (ruleType) {
      case 'group':
        await speakMotionByGroup(data as TypeGroup)
        break
      case 'hiit':
        await speakMotionByHiit(data as TypeHiit)
        break
      case 'ladder':
        await speakMotionByLadder(data as TypeLadder)
        break
      default:
        break
    }
    const { breakTime } = data
    await speak(`休息${breakTime}秒`)
    await waitCountdownSpeak(breakTime)
    i++
  }
}
interface KeepFitProps {
  children?: React.ReactNode;
}
const KeepFit = ({ children }: KeepFitProps) => {
  const [todayFlow, setTodayFlow] = useState<TypeMotion|null>(null)
  async function startTrain () {
    // await speak('接下来进行背部训练，采用阶梯组的形式，一个动作5分钟,')
    if (!todayFlow) {
      await speak('获取训练计划不成功')
    } else {
      isPause = false
      const { type, warmUp, train, relax } = todayFlow
      await speak(warmUp.startWords)
      await waitCountdownSpeak(10)
      await waitMotionListSpeak(warmUp.list, 'group', warmUp)
      await speak(warmUp.endWords)
      await waitCountDown(1)
      await speak(train.startWords)
      if (train.type === 'hiit') {
        await waitMotionListSpeak(train.list, 'hiit', train)
      } else if (train.type === 'strength') {
        if (train.ruleType === 'ladder') {
          await waitMotionListSpeak(train.list, 'ladder', train.rule)
        }
      }
      await speak(train.endWords)
      await waitCountDown(1)
      await speak(relax.startWords)
      await waitCountdownSpeak(10)
      await waitMotionListSpeak(relax.list, 'group', relax)
      await speak(relax.endWords)
    }
  }
  const descriptionsData = useMemo(() => {
    return [
      {
        label: '放松',
        value: todayFlow?.relax?.list.join(',')
      },
      {
        label: '锻炼',
        value: todayFlow?.train?.list.join(',')
      },
      {
        label: '拉伸',
        value: todayFlow?.warmUp?.list.join(',')
      }
    ]
  }, [todayFlow])
  async function setTodayData () {
    const { dayjsTime } = await api.date.getTimestamp()
    const weekDay = dayjsTime.day()
    const todayFlow = (MOTIONDATA as any)[weekDay]
    setTodayFlow(todayFlow)
  }
  function onPause () {
    isPause = !isPause
  }
  function onStop () {
    clearTimeout(timer)
    timer = null
  }
  useEffect(() => {
    setTodayData()
  }, [])
  return (
    <KeepFitBox>
      <Button onClick={startTrain} type='primary'>开始训练</Button>
      <Button onClick={onPause} type='primary'>{isPause ? '恢复' : '暂停'}计时</Button>
      <Button onClick={onStop} type='primary'>结束训练</Button>
      <Descriptions title="今日训练" data={descriptionsData}></Descriptions>
    </KeepFitBox>
  )
}
export default KeepFit
