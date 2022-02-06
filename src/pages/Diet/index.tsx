/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/prop-types */
// @ts-nocheck
import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import React, { useState, useEffect, useMemo, useRef, useContext, useCallback } from 'react'
import { Form, Table, Select, Input, Button } from '@arco-design/web-react'
import api from 'src/api/index'

const FormItem = Form.Item

const EditableContext = React.createContext({})

function EditableRow (props:any) {
  const { children, record, className, ...rest } = props
  const refForm = useRef(null)
  const getForm = () => refForm.current

  return (
    <EditableContext.Provider value={{ getForm }}>
      <Form
        style={{ display: 'table-row' }}
        // eslint-disable-next-line react/no-children-prop
        children={children}
        ref={refForm}
        wrapper='tr'
        wrapperProps={rest}
        className={`${className} editable-row`}
      />
    </EditableContext.Provider>
  )
}
function EditableCell (props) {
  const { children, className, rowData, column, onHandleSave } = props

  const ref = useRef(null)
  const refInput = useRef(null)
  const { getForm } = useContext(EditableContext)
  const [editing, setEditing] = useState(false)

  const handleClick = useCallback(
    (e) => {
      if (
        editing &&
        column.editable &&
        ref.current &&
        !ref.current.contains(e.target) &&
        !e.target.classList.contains('js-demo-select-option')
      ) {
        cellValueChangeHandler(rowData[column.dataIndex])
      }
    },
    [editing, rowData, column]
  )

  useEffect(() => {
    editing && refInput.current && refInput.current.focus()
  }, [editing])

  useEffect(() => {
    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [handleClick])

  const cellValueChangeHandler = (value) => {
    const form = getForm()
    form.validate([column.dataIndex], (errors, values) => {
      if (!errors || !errors[column.dataIndex]) {
        setEditing(!editing)
        onHandleSave && onHandleSave(rowData.objectId, values)
      }
    })
  }

  if (editing) {
    return (
      <div ref={ref}>
        <FormItem
          style={{ marginBottom: 0 }}
          labelCol={{
            span: 0
          }}
          wrapperCol={{
            span: 24
          }}
          initialValue={rowData[column.dataIndex]}
          field={column.dataIndex}
          rules={[
            {
              required: true
            }
          ]}
        >
          <Input ref={refInput} onPressEnter={cellValueChangeHandler} />
        </FormItem>
      </div>
    )
  }

  return (
    <div
      className={column.editable ? `editable-cell ${className}` : className}
      onClick={() => column.editable && setEditing(!editing)}
    >
      {children}
    </div>
  )
}
const columns = [
  {
    title: '日期',
    dataIndex: 'weekName'
  },
  {
    title: '早餐',
    dataIndex: 'breakfast',
    editable: true
  },
  {
    title: '午餐',
    dataIndex: 'lunch',
    editable: true
  },
  {
    title: '晚餐',
    dataIndex: 'dinner',
    editable: true
  },
  {
    title: '运动',
    dataIndex: 'sports',
    editable: true
  },
  {
    title: '备注',
    dataIndex: 'note',
    editable: true
  }
]

const DietBox = styled.div(x`
  
`)
interface DietProps {
  children?: React.ReactNode;
}
const Diet = ({ children }: DietProps) => {
  const { data, refresh, mutate } = useRequest(api.diet.getDiet)
  async function handleSave (id, values) {
    const newData = [...data]
    const index = newData.findIndex((item) => id === item.objectId)
    newData.splice(index, 1, {
      ...newData[index],
      ...values
    })
    mutate(newData)
    await api.diet.updateDiet(id, values)
  }
  return (
    <DietBox>
      {/* <Table columns={columns} data={data} pagination={false} stripe/> */}
      <Table
        data={data}
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell
          }
        }}
        columns={columns.map((column) =>
          column.editable
            ? {
              ...column,
              onCell: () => ({
                onHandleSave: handleSave
              })
            }
            : column
        )}
        pagination={false} stripe
      />
    </DietBox>
  )
}
export default Diet
