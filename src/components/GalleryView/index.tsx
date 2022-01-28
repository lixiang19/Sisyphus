import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useBoolean, useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import BaseCard from 'src/components/BaseCard'
import useUrlState from '@ahooksjs/use-url-state'
import AddButton from 'src/components/AddButton'
import { ActionContext } from 'src/store/context'
const GalleryViewBox = styled.div(x`
  w.full
  h.full
  gap.x5
  gap.y5
  bg.gray100
  p4,
  border.rounded.xs
  overflow.y
`, {
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, minmax(${s.size[83]}, 1fr))`,
  gridTemplateRows: `repeat(auto-fill, ${s.size[88]})`,
  justifyItems: 'center'
})
interface GalleryViewProps<T> {
  filterApi: (...args: any[]) => Promise<T[]>
  deleteApi?: (id: string) => Promise<BaseBmobItem>
  dialogChild?: (...args: any[]) => React.ReactNode
  routeAction?: (...args: any[]) => void
}
function GalleryView<T extends BaseCard> ({ filterApi, dialogChild, routeAction, deleteApi }: GalleryViewProps<T>) {
  const [urlObj] = useUrlState()
  const [visible, { setFalse, setTrue }] = useBoolean(false)
  const { data, loading, refresh, mutate } = useRequest(() => filterApi(urlObj), {
    refreshDeps: [urlObj]
  })
  async function deleteItem (item:T) {
    mutate(data => {
      return data.filter(i => i.objectId !== item.objectId)
    })
    await (deleteApi && deleteApi(item.objectId))
    refresh()
  }
  return (
    <ActionContext.Provider value={{ routeAction: routeAction, delete: deleteItem }}>
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
        <div css={x`w83 h.f`}>
          <AddButton onClick={setTrue}></AddButton>
        </div>
        {dialogChild && dialogChild(urlObj, { visible, setFalse, setTrue }, { refresh })}
      </GalleryViewBox>
    </ActionContext.Provider>

  )
}
export default GalleryView
