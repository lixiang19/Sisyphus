import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useBoolean, useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import useUrlState from '@ahooksjs/use-url-state'
import BaseCard from './BaseCard'
import api from 'src/api'
import AddButton from 'src/components/AddButton'
import { Form, Input, Button, Checkbox, Select, DatePicker } from '@arco-design/web-react'
import ConstVar from 'src/helpers/ConstVar'
import Dialog from 'src/components/Dialog'

const Option = Select.Option

const FormItem = Form.Item
const GoalBox = styled.div(
  s.width[72],
  s.flex.col.s.c,
  s.gap.y[4]
)
const Goal = () => {
  const [urlObj, setUrlObj] = useUrlState({ dreamId: '', goalId: '' })
  const dreamId = urlObj.dreamId

  // useRequest
  const [form] = Form.useForm()
  const { data, refresh } = useRequest(() => api.dream.findGoalByDream(dreamId), {
    refreshDeps: [dreamId]
  })

  const { run } = useRequest(api.dream.addGoal, {
    manual: true,
    onSuccess: () => {
      refresh()
    }
  })
  const [visible, { toggle, setFalse, setTrue }] = useBoolean(false)
  function handleConfirm () {
    form.validate().then((values) => {
      run(values, dreamId).then((result) => {
        setFalse()
      })
    }).catch((error) => {
      console.log(error.name)
    })
  }
  function handleCard (objectId:string) {
    const currentGoadId = urlObj.goalId
    if (currentGoadId === objectId) {
      setUrlObj({ goalId: null })
    } else {
      setUrlObj({ goalId: objectId })
    }
  }
  return (
    <GoalBox>
      {data && data.map((item) => {
        return (
          <BaseCard onClick={() => handleCard(item.objectId)} key={item.objectId} {...item}></BaseCard>
        )
      })}

      <AddButton onClick={setTrue}></AddButton>
      <Dialog visible={visible} onOk={handleConfirm} onCancel={setFalse}>
        <Form form={form}>
          <FormItem label='目标名称' field='name' rules={[{ required: true }]} >
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
            label='截至日期'
            field='deadlineParam'
          >
            <DatePicker />
          </FormItem>
          <FormItem label='备注' field='note'>
            <Input />
          </FormItem>
          <FormItem label='图片地址' field='imgUrl'>
            <Input />
          </FormItem>
        </Form>
      </Dialog>
    </GoalBox>
  )
}
export default Goal
