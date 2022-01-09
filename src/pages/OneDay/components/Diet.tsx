import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Descriptions } from '@arco-design/web-react'
import api from 'src/api'

const DietBox = styled.div(
  s.flex.col.s.s,
  s.width[20],
  s.gap.y[5],
  s.py[4]
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
      <span css={{ ...s.label, ...s.font.color.white }}>{label}</span>
      <span css={{ ...s.value, ...s.font.color.white }}>{value}</span>
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
    },
    {
      label: '运动',
      value: data?.sports
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
