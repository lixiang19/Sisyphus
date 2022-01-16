import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import BaseCard from 'src/components/BaseCard'
import useUrlState from '@ahooksjs/use-url-state'
const GalleryViewBox = styled.div(x`
  w.full
  h.full
  flex.row.s.s
  gap.x3
  gap.y3
  bg.gray100
  p4
`)
interface GalleryViewProps<T> {
  filterApi: (...args: any[]) => Promise<T[]>
}
function GalleryView<T extends BaseCard> ({ filterApi }: GalleryViewProps<T>) {
  const [urlObj, setUrlObj] = useUrlState()
  const { data, loading } = useRequest(() => filterApi(urlObj), {
    refreshDeps: [urlObj]
  })
  return (
    <GalleryViewBox>
      {data && data.map((item, index) => (<BaseCard
        key={index}
        name={item.name}
        imgUrl={item.imgUrl}
        note={item.note}
        tagList={item.tagList}
        data={item}
      >
      </BaseCard>))}
    </GalleryViewBox>
  )
}
export default GalleryView
