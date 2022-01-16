import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import useUrlState from '@ahooksjs/use-url-state'
import StatusTag from 'src/components/StatusTag'
import { genStatusTag } from 'src/helpers/bmob'
import { useQuery } from 'src/helpers/hooks'
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
  s.card,
  s.flex.col.s.s,
  s.padding.x[3],
  s.transform.all,
  props => (props.isActive ? { borderRight: `0.1rem solid ${s.theme.color.primary}` } : ''),
  s.hover(
    s.card.lg,
    {
      img: {

        transform: 'scale(1.1)'
      }
    }
  )
)
type BaseCardProps = {
  onClick:()=>void
}&Dream
const BaseCard = ({ name, imgUrl, note, status, timeConsuming, objectId, onClick, ...others }:BaseCardProps) => {
  const statusDetail = genStatusTag(status)
  const [urlObj] = useUrlState({ dreamId: '' })
  const dreamId = urlObj.dreamId
  const isActive = useMemo(() => dreamId === objectId, [dreamId])
  return (
    <BaseCardBox onClick={onClick} isActive={isActive}>
      <Header>{name}</Header>
      <ContentBox>
        {imgUrl ? <img src={imgUrl} /> : <span>{note}</span>}
      </ContentBox>
      <Bottom>
        <StatusTag color={statusDetail.color}>{statusDetail.label}</StatusTag>
        <StatusTag color={s.theme.color.slate[400]}>{timeConsuming}</StatusTag>
        {/* <StatusTag status='inProgress'>ss</StatusTag> */}
      </Bottom>
    </BaseCardBox>
  )
}
export default BaseCard
