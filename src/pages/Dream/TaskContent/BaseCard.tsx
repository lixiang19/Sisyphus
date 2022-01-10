import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import useUrlState from '@ahooksjs/use-url-state'
import StatusTag from 'src/components/StatusTag'
import { genPriority, genStatus } from 'src/helpers/bmob'
import { useQuery } from 'src/helpers/hooks'
import dayjs from 'dayjs'
import { IconArrowRight } from '@arco-design/web-react/icon'
const Header = styled.div(
  s.width.full,
  s.minHeight[10],
  s.font.color.neutral[800],
  s.font.size.xl,
  s.flex.row.s.s,
  s.gap.x[3],
  s.pt[4]
)
const Bottom = styled.div(
  s.width.full,
  s.minHeight[12],
  s.border.top,
  s.font.size.lg,
  s.flex.row.s.c,
  s.flex.wrap,
  s.gap.x[4],
  s.gap.y[3],
  s.pt[4],
  s.pb[2]
)

const ContentBox = styled.div(
  s.width.full,
  s.minHeight[30],
  s.margin.y[6],
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

const BaseCardBox = styled.div<{isActive: boolean}>(
  s.width[72],
  s.cp,
  s.card(),
  s.flex.col.s.s,
  s.padding.x[3],
  s.transform.all,
  props => (props.isActive ? { borderRight: `0.01rem solid ${s.theme.color.primary}` } : ''),
  s.hover(
    s.card('lg'),
    {
      img: {
        transform: 'scale(1.1)'
      }
    }
  )
)
const TagCenter = styled.div(
  s.mx[1]
)

type BaseCardProps = {
  onClick:()=>void
}&Task
const BaseCard = ({ name, imgUrl, note, status, priority, timeConsuming, objectId, goalFk, timePeriodEnd, timePeriodStart, onClick, ...others }:BaseCardProps) => {
  const statusDetail = genStatus(status)
  const priorityDetail = genPriority(priority)
  const [urlObj] = useUrlState({ taskId: '' })
  const taskId = urlObj.taskId
  const isActive = useMemo(() => taskId === objectId, [taskId])
  return (
    <BaseCardBox onClick={onClick} isActive={isActive}>
      <Header>{name}</Header>
      <ContentBox>
        {imgUrl ? <img src={imgUrl} /> : <span>{note}</span>}
      </ContentBox>
      <Bottom>
        <StatusTag color={statusDetail.color}>{statusDetail.label}</StatusTag>
        <StatusTag color={priorityDetail.color}>{priorityDetail.label}</StatusTag>
        <StatusTag color={goalFk.color}>{goalFk.name}</StatusTag>
        <StatusTag color={s.theme.color.slate[400]}>{timeConsuming}</StatusTag>
        {
          timePeriodStart && timePeriodEnd && <StatusTag color={s.theme.color.slate[400]}>{dayjs(timePeriodStart.iso).format('YYYY-MM-DD')}<TagCenter>至</TagCenter>{dayjs(timePeriodEnd.iso).format('YYYY-MM-DD')}</StatusTag>
        }
      </Bottom>
    </BaseCardBox>
  )
}
export default BaseCard
