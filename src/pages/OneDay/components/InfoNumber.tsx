import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Statistic } from '@arco-design/web-react'
const Number = styled.div(x`
  font.size.23
  font.weight.500
`)
const Label = styled.div(x`
  font.size.5
  font.weight.100
`)
const Top = styled.div(x`
  flex.row.s.e
  gap.x[3]
`)

const Bottom = styled.div(x`
  flex.row.c.e
`)
const InfoNumberBox = styled.div(x`
  flex.col.c.c
  gap.y[10]
  bg.white
  w.50
  h60
  border.rounded.md
  font.size.xl
`)
interface InfoNumberProps {
  children?: React.ReactNode;
  label?: string;
  value?: string|number;
}
const InfoNumber = ({ children, label, value }: InfoNumberProps) => {
  return (
    <InfoNumberBox>
      {/* <Top>
        <Number>{value}</Number>
      </Top>
      <Bottom>
        <Label>{label}</Label>
      </Bottom> */}
      <Statistic extra={label} value={value} countUp />
    </InfoNumberBox>
  )
}
export default InfoNumber
