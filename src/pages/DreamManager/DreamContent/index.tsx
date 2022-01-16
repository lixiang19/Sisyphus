import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useBoolean, useRequest } from 'ahooks'
import useUrlState from '@ahooksjs/use-url-state'
import { useState, useEffect, useMemo, useRef } from 'react'
import BaseCard from './BaseCard'
import api from 'src/api'
import AddButton from 'src/components/AddButton'
import { Form, Input, Button, Checkbox, Select } from '@arco-design/web-react'
import ConstVar from 'src/helpers/ConstVar'
import Dialog from 'src/components/Dialog'
const Option = Select.Option

const FormItem = Form.Item
const DreamBox = styled.div(
  s.width[72],
  s.flex.col.s.c,
  s.gap.y[4]

)
const ActiveItem = styled.div(
  s.w[72],
  s.h[20],
  s.font.size.xl,
  s.font.color.white,
  s.flex.row.c.c,
  s.card,
  {
    borderRight: '1px solid black'
  }
)
const Dream = () => {
  const [urlObj, setUrlObj] = useUrlState({})

  // useRequest
  const [form] = Form.useForm()
  const { data, refresh } = useRequest(api.dreamManager.findAllDream)
  const { run } = useRequest(api.dreamManager.addDream, {
    manual: true,
    onSuccess: () => {
      refresh()
    }
  })
  const [visible, { toggle, setFalse, setTrue }] = useBoolean(false)
  function handleConfirm () {
    form.validate().then((values) => {
      run(values).then((result) => {
        setFalse()
      })
    }).catch((error) => {
      console.log(error.name)
    })
  }
  function handleCard (objectId:string) {
    setUrlObj({ dreamId: objectId })
  }
  return (
    <DreamBox>
      <AddButton onClick={setTrue}></AddButton>
      {/* <ActiveItem>编程高手</ActiveItem> */}
      {data && data.map((item) => {
        return (
          <BaseCard onClick={() => handleCard(item.objectId)} key={item.objectId} {...item}></BaseCard>
        )
      })}

      <Dialog visible={visible} onOk={handleConfirm} onCancel={setFalse}>
        <Form form={form}>
          <FormItem label='梦想名称' field='name' rules={[{ required: true }]} >
            <Input />
          </FormItem>
          <FormItem label='状态' field='status' initialValue='inProgress'>
            <Select>
              {ConstVar.statusOptions.map((option, index) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='备注' field='note'>
            <Input />
          </FormItem>
          <FormItem label='图片地址' field='imgUrl'>
            <Input />
          </FormItem>
        </Form>
      </Dialog>
    </DreamBox>
  )
}
export default Dream
