import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import BaseCard from './BaseCard'
import api from 'src/api'
import AddButton from 'src/components/AddButton'
const DreamBox = styled.div(
  s.width.full
)
const Dream = () => {
  // useRequest
  const { data } = useRequest(api.dream.findAllDream)
  return (
    <DreamBox>
      <BaseCard></BaseCard>
      <AddButton></AddButton>
    </DreamBox>
  )
}
export default Dream
