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
const TextArea = Input.TextArea

const { RangePicker } = DatePicker
const Option = Select.Option
const FormItem = Form.Item
function formatData (data:any) {
  const newData = data
  if (data.timePeriodStart) {
    newData.timePeriod = [data.timePeriodStart.iso, data.timePeriodEnd.iso]
  }
  if (data.goalFk) {
    newData.goalId = data.goalFk.objectId
  }
  return newData
}
interface FormProps {
  onCancel: () => void;
  onConfirm: () => void;
  visible: boolean;
  initialData?: any;
}
const FormDialog = ({ onCancel, visible, initialData, onConfirm }: FormProps) => {
  const { data: goalOptions } = useRequest(() => api.goal.filterGoal({ status: 'inProgress' }))
  const formatterInitialData = useMemo(() => formatData(initialData), [initialData])
  const [urlObj] = useUrlState()
  const [form] = Form.useForm()
  function handleConfirm () {
    form.validate().then((values) => {
      if (initialData.objectId) {
        values = Object.assign(values, { objectId: initialData.objectId })
      }
      api.task.addTask(values).then((result) => {
        onConfirm()
      })
    }).catch((error) => {
      console.log(error.name)
    })
  }
  useEffect(() => {
    form.resetFields()
    form.setFieldsValue(formatterInitialData)
  }, [initialData])
  function handleCancel () {
    onCancel()
  }
  return (
    <>
      <Dialog visible={visible} onOk={handleConfirm} onCancel={handleCancel}>
        <Form form={form} initialValues={formatterInitialData}>
          <FormItem label='任务名称' field='name' rules={[{ required: true }]} >
            <Input />
          </FormItem>
          <FormItem label='状态' field='status' rules={[{ required: true }]} initialValue='ready'>
            <Select>
              {ConstVar.statusOptions.map((option, index) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='目标' field='goalId' initialValue={urlObj.goalFk} rules={[{ required: true }]}>
            <Select>
              {goalOptions && goalOptions.map((option, index) => (
                <Option key={option.objectId} value={option.objectId}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='优先级' field='priority' rules={[{ required: true }]} initialValue={1}>
            <Select>
              {ConstVar.priorityOptions.map((option, index) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem
            label='任务日期'
            field='timePeriod'
            rules={[{ required: true }]}

          >
            <RangePicker />
          </FormItem>
          <FormItem label='备注' field='note'>
            <TextArea autoSize/>
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
