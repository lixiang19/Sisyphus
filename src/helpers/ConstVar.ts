import s from 'src/styles/styleHelper'

const statusOptions = [
  { label: '进行中', value: 'inProgress', color: s.theme.color.amber[400] },
  { label: '待开始', value: 'ready', color: s.theme.color.gray[400] },
  { label: '已完成', value: 'complete', color: s.theme.color.emerald[400] }]
const priorityOptions = [
  { label: '正常', value: 1, color: s.theme.color.sky[400] },
  { label: '重要', value: 2, color: s.theme.color.fuchsia[400] },
  { label: '紧急', value: 3, color: s.theme.color.red[400] },
  { label: '延后', value: 0, color: s.theme.color.slate[400] }
]
// const TaskStatusOptions = statusOptions.concat(
//   [
//     { label: '重复任务', value: 'repeat', color: s.theme.color.blue[400] }
//   ]
// )
const TodoStatusOptions = [statusOptions[0], statusOptions[1]]
const AllStatusOptions = statusOptions.concat(TodoStatusOptions)
export default {
  statusOptions,
  priorityOptions,
  TodoStatusOptions,
  AllStatusOptions
}
