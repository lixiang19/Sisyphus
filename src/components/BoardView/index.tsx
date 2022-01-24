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
import { Button } from '@arco-design/web-react'

function genGroupValue (droppableId:string) {
  const droppableIdStrs = droppableId?.split('_')
  const propValue = droppableIdStrs[2]
  return propValue
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

  return {
    sourceOrder: sourceItem?.order,
    targetOrder: targetItem?.order
  }
}
const BoardViewBox = styled.div(x`
  w.full
  h.full
  bg.gray100
  p4
  flex.row.s.s
  gap.x10
`)
interface GalleryViewProps<T> {
  group:Options[],
  groupBy:string,

  filterApi: (groupBy:string, ...args: any[]) => Promise<Record<string, T[]>>
  updateApi: (id:string, ...args: any[]) => Promise<any>
  dialogChild?: (...args: any[])=>React.ReactNode
}

function BoardView<T extends BaseTask> ({ group, filterApi, updateApi, groupBy, dialogChild }: GalleryViewProps<T>) {
  const [initialData, setInitialData] = useSetState<IAnyPropObject>({})

  const [urlObj, setUrlObj] = useUrlState()
  const [visible, { setFalse, setTrue }] = useBoolean(false)
  const { data, loading, refresh } = useRequest(() => filterApi(groupBy, group, urlObj), {
    refreshDeps: [groupBy, group, urlObj]
  })
  const { data: res, run } = useRequest(updateApi, {
    manual: true
  })
  function onDragEnd (result: any, provided: any) {
    if (!data || !result) {
      return
    }
    const id = result?.draggableId
    const destinationGroupValue = genGroupValue(result.destination.droppableId)
    const { sourceOrder, targetOrder } = findOrder(data, result.source, result.destination, id)
    const obj:IAnyPropObject = {}
    obj[groupBy] = destinationGroupValue
    run(id, obj, sourceOrder, targetOrder).then(() => {
      refresh()
    })
  }
  function handleAdd (initialValue:string|number) {
    setTrue()
    setInitialData({ [groupBy]: initialValue })
  }
  return (
    <BoardViewBox>
      <DragDropContext onDragEnd={onDragEnd}>
        {group.map((item, index) => (
          <TagBoardWrapper
            title={item.label}
            color={item.color}
            key={item.value}
            count={data && data[item.value].length}
            headerChildren={ <Button type='text' icon={<IconPlus />} onClick={() => handleAdd(item.value)}></Button>}>
            <List list={data && data[item.value]} keyId={'group_' + groupBy + '_' + item.value}></List>
          </TagBoardWrapper>
        ))}
      </DragDropContext>
      {dialogChild && dialogChild(initialData, { visible, setFalse, setTrue }, { refresh })}
    </BoardViewBox>
  )
}
export default BoardView
