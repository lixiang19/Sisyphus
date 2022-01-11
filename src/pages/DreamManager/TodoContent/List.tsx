import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useBoolean, useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import useUrlState from '@ahooksjs/use-url-state'
import BaseCard from './BaseCard'
import api from 'src/api'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const ListWrapper = styled.div(
  s.h.full,
  s.w.full,
  s.pb[4],
  s.overflow.y,
  s.overflow.scrollBarNone
)
const Item = styled.div(
  s.h[10],
  s.w[10],
  s.bg.red[400]
)

interface ListProps {
  list?:Todo[],
  keyId:string
  refresh:()=>void
}
const List = ({ list, keyId, refresh }:ListProps) => {
  return (
    <Droppable droppableId={keyId}>
      {(provided:any) => (
        <ListWrapper ref={provided.innerRef}>
          {list && list.map((item, index) => {
            return (
              <Draggable key={item.objectId} draggableId={item.objectId} index={index}>
                {(provided:any) => (
                  <BaseCard innerRef={provided.innerRef} provided={provided} refresh={refresh} key={item.objectId} {...item}></BaseCard>
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
