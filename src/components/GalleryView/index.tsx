import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import BaseCard from 'src/components/BaseCard'
import useUrlState from '@ahooksjs/use-url-state'
import AddButton from 'src/components/AddButton'

const GalleryViewBox = styled.div(x`
  w.full
  h.full
  gap.x5
  gap.y5
  bg.gray100
  p4,
  overflow.y
`, {
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(${s.size[83]}, 1fr))`,
  gridTemplateRows: `repeat(auto-fill, minmax(${s.size[80]}, 1fr))`,
  justifyItems: 'center'
})
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
      <div css={x`w83 h.f`}>
        <AddButton onClick={() => {}}></AddButton>
      </div>
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
