import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useBoolean, useRequest, useSetState } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import List from './List'
import TagBoardWrapper from './TagBoardWrapper'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import useUrlState from '@ahooksjs/use-url-state'
import AddButton from 'src/components/AddButton'
import { IconPlus } from '@arco-design/web-react/icon'
import { Button, Skeleton, Spin } from '@arco-design/web-react'
import { ActionContext } from 'src/store/context'
import Tomato from 'src/components/Tomato'
import { genConsumingTag } from 'src/helpers/bmob'
import { keyframes } from '@emotion/react'
const SpinBox = styled.div(x`
  absolute
  h.full
  w.full
  flex.row.c.c
  top0
`,
{
  backgroundColor: 'rgba(0, 0, 0, 0.2)'
})
const scale = keyframes`
  0%{
    transform: scale(0.1);
  }
  100% {
    transform: scale(1);
  }
`
const TomatoBox = styled.div(x`
  h.full
  w.full
  gradient.101
  absolute
  flex.row.c.c
  z1
`, {
  animation: `${scale} 0.2s ease-in-out`
})
function genGroupValue (droppableId:string) {
  const droppableIdStrs = droppableId?.split('_')
  const propValue = droppableIdStrs[2]

  if (!Number.isNaN(Number(propValue))) {
    return Number(propValue)
  } else {
    return propValue
  }
}
type DropItem = {
  droppableId: string,
  index: number,
}
function findOrder<T extends BaseTask> (data:Record<string, T[]>, source:DropItem, destination:DropItem, draggableId:string) {
  const sourceGroupValue = genGroupValue(source.droppableId)
  const destinationGroupValue = genGroupValue(destination.droppableId)
  const sourceList = data[sourceGroupValue]

  const destinationList = data[destinationGroupValue]

  const sourceItem = sourceList.find(item => item.objectId === draggableId)

  const targetPosIndex = destination.index
  const targetItem = destinationList[targetPosIndex]
  const sourceIndex = source.index
  const targetIndex = destination.index
  return {
    sourceOrder: sourceItem?.order ?? 0,
    sourceIndex,
    targetOrder: targetItem?.order ?? 0,
    targetIndex
  }
}
const BoardViewBox = styled.div<{isHome:boolean}>(x`
  w.full
  h.full
  flex.row.s.s
`,
props => props.isHome ? x`p0 gap.x1` : x`p4 gap.x10   bg.gray100`)
interface GalleryViewProps<T> {
  group:Options[],
  groupBy:GroupBy,
  routeAction?: (...args: any[]) => void,
  deleteApi: (id: string) => Promise<BaseBmobItem>
  filterApi: (groupBy:string, ...args: any[]) => Promise<Record<string, T[]>>
  updateApi: (id:string, ...args: any[]) => Promise<any>
  dialogChild?: (...args: any[])=>React.ReactNode
  completeApi: (id:string) => Promise<any>
  onComplete?: (...args: any[]) => void,
  isHome?:boolean
}

function BoardView<T extends BaseTask> ({ group, filterApi, updateApi, onComplete, groupBy, isHome, dialogChild, routeAction, completeApi, deleteApi }: GalleryViewProps<T>) {
  const [initialData, setInitialData] = useState<IAnyPropObject>({})
  const [currentItem, setCurrentItem] = useState<T|null>(null)
  const [urlObj, setUrlObj] = useUrlState()
  const [visible, { setFalse, setTrue }] = useBoolean(false)
  const [tomatoVisible, { setFalse: setTomatoFalse, setTrue: setTomatoTrue }] = useBoolean(false)

  const { data, loading, refresh, mutate } = useRequest(() => filterApi(groupBy, group, urlObj), {
    refreshDeps: [groupBy, group, urlObj]
  })
  async function deleteItem (item:T) {
    mutate(data => {
      const groupId = item[groupBy] as string
      data[groupId] = data[groupId].filter(i => i.objectId !== item.objectId)
      return data
    })
    await (deleteApi && deleteApi(item.objectId))
    refresh()
  }
  async function updateItem (item:T) {
    setInitialData(item)
    setTrue()
  }
  async function onDragEnd (result: any, provided: any) {
    if (!data || !result) {
      return
    }
    const id = result?.draggableId
    const destinationGroupValue = genGroupValue(result.destination.droppableId)
    const sourceGroupValue = genGroupValue(result.source.droppableId)

    const { sourceOrder, targetOrder, sourceIndex, targetIndex } = findOrder(data, result.source, result.destination, id)
    const dragItem = data[sourceGroupValue].splice(sourceIndex, 1)

    data[destinationGroupValue].splice(targetIndex, 0, dragItem[0])

    await updateApi(id, { [groupBy]: destinationGroupValue }, targetOrder, sourceOrder)

    await refresh()
  }
  function handleAdd (initialValue:string|number) {
    setInitialData({ [groupBy]: initialValue })
    setTrue()
  }
  async function completeItem (item:T) {
    mutate(data => {
      const groupId = item[groupBy] as string
      data[groupId] = data[groupId].filter(i => i.objectId !== item.objectId)
      return data
    })
    await completeApi(item.objectId)
    await refresh()
    onComplete && onComplete()
  }
  function readyTomato (item:T) {
    setCurrentItem(item)
    setTomatoTrue()
  }
  async function onTomatoStop (timeConsuming:number) {
    setTomatoFalse()
    if (timeConsuming === 0) {
      return
    }
    mutate(data => {
      if (!currentItem) {
        return data
      }
      const groupId = currentItem[groupBy] as string

      data[groupId] = data[groupId].map(i => {
        if (i.objectId === currentItem.objectId) {
          i.timeConsuming = i.timeConsuming + timeConsuming
        }
        i.tagList[i.tagList.length - 1] = genConsumingTag(i.timeConsuming)
        return i
      })

      return data
    })
    if (!currentItem) {
      return
    }
    await updateApi(currentItem.objectId, { timeConsuming, updateTimeConsuming: true })
    refresh()
  }
  const finallyGroup = isHome ? [group[0], group[1], group[2]] : group
  return (
    <ActionContext.Provider value={{ routeAction: isHome ? readyTomato : routeAction, delete: deleteItem, update: updateItem, complete: completeItem }}>
      {
        tomatoVisible && (
          <TomatoBox>
            <Tomato name={currentItem?.name} onStop={onTomatoStop}></Tomato>
          </TomatoBox>
        )
      }
      <BoardViewBox isHome={true}>
        <DragDropContext onDragEnd={onDragEnd}>
          {finallyGroup.map((item, index) => (
            <TagBoardWrapper
              title={item.label}
              color={item.color}
              key={item.value}
              count={data && data[item.value].length}
              headerChildren={ <Button type='text' icon={<IconPlus />} onClick={() => handleAdd(item.value)}></Button>}>
              {
                loading
                  ? (<SpinBox>
                    <Spin></Spin>
                  </SpinBox>
                  )
                  : ''
              }

              <List list={data && data[item.value]} keyId={'group_' + groupBy + '_' + item.value}></List>
            </TagBoardWrapper>
          ))}
        </DragDropContext>
        {dialogChild && dialogChild(initialData, { visible, setFalse, setTrue }, { refresh })}
      </BoardViewBox>
    </ActionContext.Provider>
  )
}
export default BoardView
