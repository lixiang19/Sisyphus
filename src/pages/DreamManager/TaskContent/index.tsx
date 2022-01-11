import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useBoolean, useRequest } from 'ahooks'
import useUrlState from '@ahooksjs/use-url-state'
import { useState, useEffect, useMemo, useRef } from 'react'
import BaseCard from './BaseCard'
import api from 'src/api'
import AddButton from 'src/components/AddButton'
import { Form, Input, Button, Checkbox, Select, DatePicker } from '@arco-design/web-react'
import ConstVar from 'src/helpers/ConstVar'
import Dialog from 'src/components/Dialog'
const { RangePicker } = DatePicker

const Option = Select.Option
const ActiveItem = styled.div(
  s.w[72],
  s.h[20],
  s.font.size.xl,
  s.font.color.white,
  s.flex.row.c.c,
  s.card(),
  s.cp,
  s.bg.primary
  // {
  //   borderRight: `0.1em solid ${s.theme.color.primary}`
  // }
)
const FormItem = Form.Item
const TaskBox = styled.div(
  s.width[72],
  s.flex.col.s.c,
  s.gap.y[4]
)
const Task = () => {
  const [urlObj, setUrlObj] = useUrlState({ dreamId: '', goalId: '', taskId: '' })
  const goalId = urlObj.goalId
  const taskId = urlObj.taskId
  console.log('🚀 ~ file: index.tsx ~ line 36 ~ Task ~ taskId', taskId)

  // useRequest
  const [form] = Form.useForm()
  const { data, refresh } = useRequest(() => api.dream.findTaskByGoal(goalId), {
    refreshDeps: [goalId]
  })
  const { run } = useRequest(api.dream.addTask, {
    manual: true,
    onSuccess: () => {
      refresh()
    }
  })
  const [visible, { toggle, setFalse, setTrue }] = useBoolean(false)
  function handleConfirm () {
    form.validate().then((values) => {
      run(values, goalId).then((result) => {
        setFalse()
      })
    }).catch((error) => {
      console.log(error.name)
    })
  }
  function handleCard (objectId:string) {
    if (taskId === objectId) {
      setUrlObj({ taskId: null })
    } else {
      setUrlObj({ taskId: objectId })
    }
  }
  function cancelActive () {
    setUrlObj({ taskId: null })
  }
  const list = () => {
    return data && data.map((item) => (
      <BaseCard onClick={() => handleCard(item.objectId)} key={item.objectId} {...item}></BaseCard>
    ))
  }
  return (
    <TaskBox>
      {taskId ? <ActiveItem onClick={cancelActive}>完成第一版打包</ActiveItem> : list()}

      <AddButton onClick={setTrue}></AddButton>
      <Dialog visible={visible} onOk={handleConfirm} onCancel={setFalse}>
        <Form form={form}>
          <FormItem label='任务名称' field='name' rules={[{ required: true }]} >
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
          <FormItem label='优先级' field='priority' initialValue={1}>
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
          >
            <RangePicker />
          </FormItem>
          <FormItem label='备注' field='note'>
            <Input />
          </FormItem>
          <FormItem label='图片地址' field='imgUrl'>
            <Input />
          </FormItem>
        </Form>
      </Dialog>
    </TaskBox>
  )
}
export default Task
