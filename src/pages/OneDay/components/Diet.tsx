import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Descriptions } from '@arco-design/web-react'
import api from 'src/api'

const DietBox = styled.div(
  s.flex.row.sb.c,

  s.width[80]
)
const DescriptionItemBox = styled.div(
  s.flex.row.s.s,
  s.gap.x[2]
)
interface IDescriptionItem {
  children?: React.ReactNode;
  label?: string;
  value?: string;
}
const DescriptionItem = ({ children, label, value }: IDescriptionItem) => {
  return (
    <DescriptionItemBox>
      <span css={s.label}>{label}</span>
      <span css={s.value}>{value}</span>
    </DescriptionItemBox>
  )
}
const Diet = () => {
  const { data, loading: loading1 } = useRequest(api.diet.findDietToday)
  const finallyData = [
    {
      label: '早餐',
      value: data?.breakfast
    },
    {
      label: '午餐',
      value: data?.lunch
    },
    {
      label: '晚餐',
      value: data?.dinner
    }
  ]
  return (
    <DietBox>
      {finallyData.map((item) => {
        return <DescriptionItem {...item} key={item.label}
        />
      })}
    </DietBox>
  )
}
export default Diet
