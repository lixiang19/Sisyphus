import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef, useContext } from 'react'
import StatusTag from 'src/components/StatusTag'
import { Dropdown, Menu, Button, Space } from '@arco-design/web-react'
import { IconDelete, IconEdit, IconMore } from '@arco-design/web-react/icon'
import { ActionContext } from 'src/store/context'

const Header = styled.div(x`
  w.full
  fc.neutral800
  fs.lg
  flex.row.sb.s
  gap.x3
  pt3
  pb2
  border.bottom
`)
const Bottom = styled.div(x`
  w.full
  minHeight12
  border.top
  fs.lg
  flex.row.s.c
  flex.wrap
  gap.x4
  gap.y3
  pt4
  pb2
`)
const ContentBox = styled.div<{size: 'normal'|'large'|'small'}>(x`
  py2
  overflow.hidden
  border.rounded.xs
  fs.sm
  fw.light
`,
props => (props.size === 'small' ? x`minHeight15` : x`h60`),
{
  img: x`w.full h.full  border.rounded.xs transform.all`
})
const BaseCardBox = styled.div(x`
  cp
  card
  w83
  px3
  transform.all
`,
s.hover(
  s.card.lg,
  {
    img: {
      transform: 'scale(1.1)'
    }
  }
))

interface IContent {
  children?: React.ReactNode;
  imgUrl?: string;
  note?:string
}
const Content = ({ children, imgUrl, note }: IContent) => {
  if (children) {
    return (<>{ children }</>)
  } else if (imgUrl) {
    return (<img src={imgUrl}></img>)
  } else if (note) {
    return (<p>{note}</p>)
  } else {
    return (<p>暂无内容</p>)
  }
}
const dropList = (
  <Menu>
    <Menu.Item key='1' css={{ color: s.theme.color.danger }}><IconEdit css={x`mr2`}/>编辑</Menu.Item>
    <Menu.Item key='2'><IconDelete css={x`mr2`}/>删除</Menu.Item>
  </Menu>
)
interface BaseCardProps<T> {
  name: string,
  children?: React.ReactNode;
  tagList?:{color: string, label: string}[];
  imgUrl?: string;
  note?:string;
  provided?:any,
  innerRef?: any,
  size?: 'normal'|'large'|'small',
  data?:T
}
function BaseCard<T> ({ name, tagList, children, imgUrl, note, innerRef, provided, data, size = 'normal' }:BaseCardProps<T>) {
  const action = useContext(ActionContext)

  return (
    <BaseCardBox onClick={() => action.cardClick && action.cardClick(data)} ref={innerRef} {...provided?.draggableProps} {...provided?.dragHandleProps}>
      <Header>
        <span>{name}</span>
        <Dropdown droplist={dropList} trigger='click'>
          <IconMore />
        </Dropdown>
      </Header>
      <ContentBox size={size}>
        <Content imgUrl={imgUrl} note={note}>{children}</Content>
      </ContentBox>
      <Bottom>
        {tagList && tagList.map((tag, index) => (
          <StatusTag small={size === 'small'} color={tag.color} key={index}>{tag.label}</StatusTag>
        ))}
      </Bottom>
    </BaseCardBox>
  )
}
export default BaseCard
