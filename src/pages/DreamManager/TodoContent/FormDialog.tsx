import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useBoolean, useRequest } from 'ahooks'
import useUrlState from '@ahooksjs/use-url-state'
import { useState, useEffect, useMemo, useRef } from 'react'

import api from 'src/api'
import AddButton from 'src/components/AddButton'
import { Form, Input, Button, Checkbox, Select, DatePicker } from '@arco-design/web-react'
import ConstVar from 'src/helpers/ConstVar'
import Dialog from 'src/components/Dialog'
import StatusWrapper from '../components/StatusWrapper'
const { RangePicker } = DatePicker
const Option = Select.Option
const FormItem = Form.Item
interface FormProps {
  onCancel: () => void;
  onConfirm: (values:any) => void;
  visible: boolean;
  statusInitialValue?: Status
}
const FormDialog = ({ onCancel, visible, onConfirm, statusInitialValue = 'ready' }: FormProps) => {
  const [form] = Form.useForm()
  function handleConfirm () {
    form.validate().then((values) => {
      onConfirm(values)
    }).catch((error) => {
      console.log(error.name)
    })
  }
  useEffect(() => {
    form.resetFields()
  }, [visible])
  function handleCancel () {
    onCancel()
  }
  return (
    <>
      <Dialog visible={visible} onOk={handleConfirm} onCancel={handleCancel}>
        <Form form={form}>
          <FormItem label='任务名称' field='name' rules={[{ required: true }]} >
            <Input />
          </FormItem>
          <FormItem label='状态' field='status' initialValue={statusInitialValue}>
            <Select>
              {ConstVar.statusOptions.map((option, index) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='优先级' field='priority' initialValue={1}>
            <Select>
              {ConstVar.priorityOptions.map((option, index) => (
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
    </>
  )
}
export default FormDialog
