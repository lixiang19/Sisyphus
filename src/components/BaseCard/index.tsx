import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import StatusTag from 'src/components/StatusTag'
const Header = styled.div(x`
  w.full
  minHeight10
  fc.neutral800
  fs.xl
  flex.row.s.s
  gap.x3
  pt4
`)
const Bottom = styled.div(x`
  w.full
  minHeight12
  border.top
  fs.lg
  flex.row.s.c
  flex.wrap
  gap.x4
  gap.y3
  pt4
  pb2
`)
const BaseCardBox = styled.div(x`
  card
`)
interface BaseCardProps {
  title: string,
  tagList?:{color: string, label: string}[]
}
const BaseCard = ({ title, tagList }:BaseCardProps) => {
  return (
    <BaseCardBox>
      <Header>{title}</Header>
      <Bottom>
        {tagList && tagList.map((tag, index) => (
          <StatusTag color={tag.color} key={index}>{tag.label}</StatusTag>
        ))}
      </Bottom>
    </BaseCardBox>
  )
}
export default BaseCard
