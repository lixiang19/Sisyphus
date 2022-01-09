import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import StatusTag from 'src/components/StatusTag'
import useUrlState from '@ahooksjs/use-url-state'
import { genStatus, genPriority } from 'src/helpers/bmob'
import dayjs from 'dayjs'
const Header = styled.div(
  s.width.full,
  s.height[10],
  s.font.color.neutral[800],
  s.font.size.lg,
  s.flex.row.s.c,
  s.gap.x[3]
)
const Bottom = styled.div(
  s.width.full,
  s.minHeight[12],
  s.border.top,
  s.font.size.lg,
  s.flex.row.s.c,
  s.flex.wrap,
  s.gap.x[3],
  s.gap.y[2],
  s.py[2]
)

const ContentBox = styled.div(
  s.width.full,
  s.minHeight[10],
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

const BaseCardBox = styled.div<{isActive: boolean}>(
  s.width[72],
  s.cp,
  s.card(),
  s.flex.col.s.s,
  s.padding.x[3],
  s.transform.all,
  props => (props.isActive ? { borderRight: `0.1rem solid ${s.theme.color.primary}` } : ''),
  s.hover(
    s.card('lg'),
    {
      img: {

        transform: 'scale(1.1)'
      }
    }
  )
)
type BaseCardProps = {
  onClick:()=>void
}&Goal

const BaseCard = ({ name, imgUrl, note, status, timeConsuming, priority, dreamFk, onClick, deadline, objectId, ...others }:BaseCardProps) => {
  const statusDetail = genStatus(status)
  const priorityDetail = genPriority(priority)
  const [urlObj] = useUrlState({ dreamId: '', goalId: '' })
  const goalId = urlObj.goalId
  const isActive = useMemo(() => goalId === objectId, [goalId])
  return (
    <BaseCardBox onClick={onClick} isActive={isActive}>
      <Header>{name}</Header>
      <ContentBox>
        {imgUrl ? <img src={imgUrl} /> : <span>{note}</span>}
      </ContentBox>
      <Bottom>
        <StatusTag color={statusDetail.color}>{statusDetail.label}</StatusTag>
        <StatusTag color={priorityDetail.color}>{priorityDetail.label}</StatusTag>
        <StatusTag color={dreamFk.color}>{dreamFk.name}</StatusTag>
        <StatusTag color={s.theme.color.slate[400]}>{timeConsuming}</StatusTag>
        <StatusTag color={s.theme.color.rose[400]}>{dayjs(deadline.iso).format('YYYY-MM-DD')}</StatusTag>
      </Bottom>
    </BaseCardBox>
  )
}
export default BaseCard
