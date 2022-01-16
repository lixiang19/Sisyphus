import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useBoolean, useRequest, useTimeout } from 'ahooks'
import { useState, useEffect, useMemo, useRef, forwardRef } from 'react'
import useUrlState from '@ahooksjs/use-url-state'
import StatusTag from 'src/components/StatusTag'
import { genPriorityTag, genStatusTag } from 'src/helpers/bmob'
import { useQuery } from 'src/helpers/hooks'
import dayjs from 'dayjs'
import { IconArrowRight, IconPlayCircleFill } from '@arco-design/web-react/icon'
import { Checkbox, Icon } from '@arco-design/web-react'
import api from 'src/api'
import CompleteIcon from 'src/components/CompleteIcon'
const Header = styled.div(
  s.width.full,
  s.minHeight[10],
  s.font.color.neutral[800],
  s.font.size.lg,
  s.flex.row.s.s,
  s.gap.x[1]
)
const Bottom = styled.div(
  s.width.full,
  // s.minHeight[12],
  s.font.size.lg,
  s.flex.row.s.b,
  s.flex.wrap,
  s.gap.x[3],
  s.gap.y[2],
  s.py[2]
)

const ContentBox = styled.div(
  s.width.full,
  s.margin.y[1],
  s.overflow.hidden,
  s.border.rounded.xs,
  s.font.size.sm,
  s.font.weight.light,
  {
    img: {
      width: '100%',
      height: '100%',
      transition: 'all 0.2s ease-in-out'
    }
  }
)
const InfoBox = styled.div(
  s.width[66],
  s.flex.col.s.s,
  s.padding.x[3],
  s.pt[2]
)
const TomatoBox = styled.div(
  s.w[14],
  // s.h.full,
  s.border.right,
  s.flex.row.c.c
)
interface ITomato {
  children?: React.ReactNode;
}
const IconCss = s.join(
  s.font.size.xxl,
  s.font.color.primary
)
const Tomato = ({ children }: ITomato) => {
  return (
    <TomatoBox>
      <IconPlayCircleFill css={IconCss}/>
    </TomatoBox>
  )
}

const BaseCardBox = styled.div<{isActive?: boolean, isCompleted:boolean}>(
  s.mb[4],
  s.cp,
  s.card,
  s.flex.row.s.sh,
  s.transform.all,
  s.hover(
    s.card.lg,
    {
      img: {
        transform: 'scale(1.1)'
      }
    }
  ),
  props => (props.isCompleted && {
    transform: 'scaleY(0)'
  })
)
type BaseCardProps = {
  onClick?:()=>void,
  refresh:()=>void,
  provided:any,
  innerRef: any,
}&Todo
const BaseCard = ({ name, imgUrl, note, status, priority, timeConsuming, objectId, taskFk, innerRef, provided, onClick, refresh, ...others }:BaseCardProps) => {
  const [isCompleted, { setTrue }] = useBoolean(false)
  const statusDetail = genStatusTag(status)
  const priorityDetail = genPriorityTag(priority)
  const { run } = useRequest(api.dreamManager.completeTodo, {
    manual: true,
    onSuccess: () => {
      refresh()
    }
  })
  function handleComplete () {
    setTrue()
    const timer = setTimeout(() => {
      run(objectId)
      clearTimeout(timer)
    }, 200)
  }
  return (
    <BaseCardBox onClick={onClick} isCompleted={isCompleted} ref={innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <Tomato></Tomato>
      <InfoBox>
        <Header><CompleteIcon onClick={handleComplete}></CompleteIcon>{name}</Header>
        <ContentBox>
          {imgUrl ? <img src={imgUrl} /> : <span>{note}</span>}
        </ContentBox>
        <Bottom>
          {/* <StatusTag color={statusDetail.color}>{statusDetail.label}</StatusTag> */}
          <StatusTag color={priorityDetail.color}>{priorityDetail.label}</StatusTag>
          <StatusTag color={taskFk.color ?? s.theme.color.slate[400]}>{taskFk.name ?? '其他任务'}</StatusTag>
          <StatusTag color={s.theme.color.slate[400]}>{timeConsuming}</StatusTag>
        </Bottom>
      </InfoBox>

    </BaseCardBox>
  )
}

export default BaseCard
