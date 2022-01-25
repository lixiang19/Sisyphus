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

const { RangePicker } = DatePicker
const Option = Select.Option
const FormItem = Form.Item
interface FormProps {
  onCancel: () => void;
  onConfirm: () => void;
  visible: boolean;
  initialData?: any;
}
const FormDialog = ({ onCancel, visible, initialData, onConfirm }: FormProps) => {
  const { data: taskOptions } = useRequest(() => api.task.filterTask({ status: 'inProgress' }))
  const { run } = useRequest(api.todo.addTodo, {
    manual: true
  })
  const [urlObj] = useUrlState()
  const [form] = Form.useForm()
  function handleConfirm () {
    form.validate().then((values) => {
      run(values).then((result) => {
        onConfirm()
      })
    }).catch((error) => {
      console.log(error.name)
    })
  }
  useEffect(() => {
    form.resetFields()
    form.setFieldsValue(initialData)
  }, [visible])
  function handleCancel () {
    onCancel()
  }
  return (
    <>
      <Dialog visible={visible} onOk={handleConfirm} onCancel={handleCancel}>
        <Form form={form} initialValues={initialData}>
          <FormItem label='任务名称' field='name' rules={[{ required: true }]} >
            <Input />
          </FormItem>
          <FormItem label='状态' field='status'>
            <Select>
              {ConstVar.statusOptions.map((option, index) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='任务' field='taskId' initialValue={urlObj.taskFk}>
            <Select>
              {taskOptions && taskOptions.map((option, index) => (
                <Option key={option.objectId} value={option.objectId}>
                  {option.name}
                </Option>
              ))}
            </Select>
          </FormItem>
          <FormItem label='优先级' field='priority'>
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
