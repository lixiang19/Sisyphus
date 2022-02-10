import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import MOTIONDATA, { TypeMotion } from './components/MOTIONDATA'
import api from 'src/api'
import { Button, Descriptions } from '@arco-design/web-react'

const KeepFitBox = styled.div(x`
  
`)
function speak (txt: string|number) {
  return new Promise<string>((resolve, reject) => {
    const utterThis = new window.SpeechSynthesisUtterance(txt.toString())
    utterThis.lang = 'zh-TW'
    window.speechSynthesis.speak(utterThis)
    utterThis.onend = function (event) {
      resolve('ok')
    }
  })
}
function wait (duration: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok')
    }, duration * 1000)
  })
}
function waitCountdownSpeak (second: number) {
  return new Promise((resolve, reject) => {
    let i = second
    speak(i)
    setInterval(() => {
      i--
      speak(i)
      if (i === 0) {
        resolve('ok')
      }
    }, 1000)
  })
}
async function waitFrequencySpeak (frequency: number, duration: number) {
  for (let index = 1; index < frequency; index++) {
    await speak(`${index}个`)
    await wait(duration)
  }
}
async function speakMotionByGroup ({ frequency, group, duration }:{frequency:number, group:number, duration:number}) {
  for (let i = 1; i <= group; i++) {
    await speak(`第${i}组动作`)
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
    await speak(`第${i}个动作${iterator}`)
    switch (ruleType) {
      case 'group':
        speakMotionByGroup(data as TypeGroup)
        break
      case 'hiit':
        speakMotionByHiit(data as TypeHiit)
        break
      case 'ladder':
        speakMotionByLadder(data as TypeLadder)
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
      const { type, warmUp, train, relax } = todayFlow
      await speak(warmUp.startWords)
      await waitCountdownSpeak(15)
      await waitMotionListSpeak(warmUp.list, 'group', warmUp)
      await speak(warmUp.endWords)
      await wait(1)
      await speak(train.startWords)
      if (train.type === 'hiit') {
        await waitMotionListSpeak(train.list, 'hiit', train)
      } else if (train.type === 'strength') {
        if (train.ruleType === 'ladder') {
          await waitMotionListSpeak(train.list, 'ladder', train.rule)
        }
      }
      await speak(train.endWords)
      await wait(1)
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

  useEffect(() => {
    setTodayData()
  }, [])
  return (
    <KeepFitBox>
      <Button onClick={startTrain}>开始训练</Button>
      <Descriptions title="今日训练" data={descriptionsData}></Descriptions>
    </KeepFitBox>
  )
}
export default KeepFit
