import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useBoolean, useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import useUrlState from '@ahooksjs/use-url-state'

import api from 'src/api'
import { DragDropContext, Droppable, Draggable, DraggableChildrenFn } from 'react-beautiful-dnd'
import BaseCard from 'src/components/BaseCard'
const ListWrapper = styled.div(
  s.h.full,
  s.w.full,
  s.py[4],
  s.gap.y[4],
  s.flex.col.s.c,
  s.overflow.y,
  s.overflow.scrollBarNone
)
const Item = styled.div(
  s.h[10],
  s.w[10],
  s.bg.red[400]
)
interface ListProps<T> {
  list?:T[],
  keyId:string
}
function List<T extends BaseTask> ({ list, keyId }:ListProps<T>) {
  return (
    <Droppable droppableId={keyId}>
      {(provided:any) => (
        <ListWrapper ref={provided.innerRef}>
          {list && list.map((item, index) => {
            return (
              <Draggable key={item.objectId} draggableId={item.objectId} index={index}>
                {(provided:any) => (
                  <BaseCard size='small' {...item} innerRef={provided.innerRef} provided={provided}></BaseCard>
                )}
              </Draggable>
            )
          })}
          {provided.placeholder}
        </ListWrapper>
      )}
    </Droppable>

  )
}
export default List
