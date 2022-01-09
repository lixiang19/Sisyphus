import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useBoolean, useRequest } from 'ahooks'
import useUrlState from '@ahooksjs/use-url-state'
import { useState, useEffect, useMemo, useRef } from 'react'
import List from './List'
import AddButton from 'src/components/AddButton'
import { Form, Input, Button, Checkbox, Select, DatePicker } from '@arco-design/web-react'
import FormDialog from './FormDialog'

interface ControlProps {
  addApi: (values: any, id: string) => void;
  listData?:any[],
  refresh:()=>void;
  id: string;
  keyId: string;
  statusInitialValue?:Status
}
const Control = ({ addApi, listData, refresh, id, statusInitialValue, keyId }: ControlProps) => {
  const [visible, { toggle, setFalse, setTrue }] = useBoolean(false)

  const { run } = useRequest(addApi, {
    manual: true,
    onSuccess: () => {
      refresh()
    }
  })
  function handleConfirm (values:any) {
    run(values, id).then((result) => {
      setFalse()
    })
  }
  return (
    <>
      <AddButton onClick={setTrue}></AddButton>
      <List list={listData} refresh={refresh} keyId={keyId}></List>
      <FormDialog statusInitialValue={statusInitialValue} visible={visible} onCancel={setFalse} onConfirm={handleConfirm}></FormDialog>
    </>
  )
}
export default Control
