import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef, useContext } from 'react'
import BoardView from 'src/components/BoardView'
import FormDialog from 'src/pages/Todo/FormDialog'
import ConstVar from 'src/helpers/ConstVar'
import api from 'src/api'
import Tomato from 'src/components/Tomato'
import { EventContext } from 'src/store/EventContext'
import { Button, Radio } from '@arco-design/web-react'
import useUrlState from '@ahooksjs/use-url-state'
const RadioGroup = Radio.Group

const ActionBox = styled.div(x`
  flex.row.e.c
  gap.x6
`, {
  '.arco-radio-group-type-button': {
    lineHeight: 0
  }
})
interface IAction {
  children?: React.ReactNode;
}
const Action = ({ children }: IAction) => {
  const [urlObj, setUrlObj] = useUrlState()
  function setUrlObjOnly (obj:IAnyPropObject) {
    const undefinedUrlObj = Object.keys(urlObj).reduce((acc, key) => {
      (acc as any)[key] = undefined
      return acc
    }, {})
    setUrlObj({ ...undefinedUrlObj, ...obj })
  }
  function clearUrlState () {
    setUrlObjOnly({})
  }
  function filterUrgent () {
    setUrlObjOnly({ priority: 3 })
  }
  function filterNormal () {
    setUrlObjOnly({ taskFk: '' })
  }
  function onChange (value:any) {
    if (value === 'urgent') {
      filterUrgent()
    } else if (value === 'normal') {
      filterNormal()
    } else {
      clearUrlState()
    }
  }
  return (
    <ActionBox>
      {/* <Button size='small' type='secondary' onClick={filterUrgent}>
          紧急
      </Button>
      <Button size='small' type='secondary' onClick={filterNormal}>
            日常
      </Button>
      <Button size='small' type='secondary' onClick={clearUrlState}>
          全部
      </Button> */}
      <RadioGroup
        type='button'
        name='filter'
        defaultValue='all'
        onChange={onChange}
      >
        <Radio value='urgent'>紧急</Radio>
        <Radio value='normal'>日常</Radio>
        <Radio value='all'>全部</Radio>
      </RadioGroup>
    </ActionBox>
  )
}
const TodoContentBox = styled.div(x`
  h.full
  relative
`, {
  display: 'grid',
  gridTemplateRows: '8% auto'
})
interface TodoContentProps {
  children?: React.ReactNode;
}
const TodoContent = ({ children }: TodoContentProps) => {
  const { event$ } = useContext(EventContext)

  function onComplete () {
    event$.emit('refresh')
  }
  return (
    <TodoContentBox>
      <Action>

      </Action>

      <BoardView
        groupBy='status'
        group={ConstVar.TodoStatusOptions}
        routeAction={(data) => { console.log(data) }}
        deleteApi={api.todo.deleteItem}
        completeApi={api.todo.completeItem}
        updateApi={api.todo.updateTodo}
        filterApi={(groupBy, group, obj) => api.todo.filterAndGroupTodo(groupBy, group, obj, { priority: 0 })}
        isHome={true}
        onComplete={onComplete}
        dialogChild={(data, { visible, setFalse }, { refresh }) => (
          <FormDialog initialData={data} visible={visible} onCancel={setFalse} onConfirm={() => { setFalse(); refresh() }}></FormDialog>)}
      ></BoardView>
    </TodoContentBox>
  )
}
export default TodoContent
