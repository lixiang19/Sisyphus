import styled from '@emotion/styled'
import s, { x } from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef, useContext } from 'react'
import StatusTag from 'src/components/StatusTag'
import { Dropdown, Menu, Button, Space } from '@arco-design/web-react'
import { IconArrowRight, IconDelete, IconEdit, IconMore } from '@arco-design/web-react/icon'
import { ActionContext } from 'src/store/context'
import CompleteIcon from 'src/components/CompleteIcon'
import { isUrl } from 'src/helpers/str'
import { openExternal } from 'src/helpers/platformApi'

const Header = styled.div(x`
  w.full
  fc.neutral800
  fs.lg
  flex.row.sb.c
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
  w90
  px3
  transform.all
`,
s.hover(
  s.card.lg
  // {
  //   img: {
  //     transform: 'scale(1.1)'
  //   }
  // }
))
const FlexBox = styled.div(x`
  flex.row.e.c
  gap.x1
`)
const FlexBoxStart = styled.div(x`
  flex.row.s.c
  gap.x1
`)
const Href = styled.div(x`
  font.color.sky500
`)

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
    if (isUrl(note)) {
      // return (<a target="_blank" href={note} rel="noreferrer">{note}</a>)
      return <Href onClick={() => openExternal(note)}>{note}</Href>
    } else {
      return (<p css={{ whiteSpace: 'pre-line', lineHeight: '200%' }} >{note}</p>)
    }
  } else {
    return (<p>暂无内容</p>)
  }
}
const DropList = ({ data }:{data:any}) => {
  const action = useContext(ActionContext)

  return (
    <Menu>
      <Menu.Item key='1' css={{ color: s.theme.color.danger }} onClick={() => action.update && action.update(data)}><IconEdit css={x`mr2`}/>编辑</Menu.Item>
      <Menu.Item key='2' onClick={() => action.delete && action.delete(data)}><IconDelete css={x`mr2`}/>删除</Menu.Item>
    </Menu>
  )
}
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
  isHome?:boolean
}
function BaseCard<T> ({ name, tagList, children, isHome = true, imgUrl, note, innerRef, provided, data, size = 'normal' }:BaseCardProps<T>) {
  const action = useContext(ActionContext)

  return (
    <BaseCardBox ref={innerRef} {...provided?.draggableProps} {...provided?.dragHandleProps}>
      <Header>
        <FlexBoxStart>

          <CompleteIcon onClick={() => action.complete && action.complete(data)}></CompleteIcon>
          <span>{name}</span>
        </FlexBoxStart>

        <FlexBox>
          <Button type='text' icon={<IconArrowRight />} onClick={() => action.routeAction && action.routeAction(data)}></Button>
          <Dropdown droplist={<DropList data={data}></DropList>} trigger='click'>
            <Button type='text' icon={<IconMore />}></Button>
          </Dropdown>
        </FlexBox>

      </Header>
      {
        (size !== 'small' || imgUrl || note || children) &&
        (<ContentBox size={size}>
          <Content imgUrl={imgUrl} note={note}>{children}</Content>
        </ContentBox>)
      }
      <Bottom>
        {tagList && tagList.map((tag, index) => (
          <StatusTag small={size === 'small'} color={tag.color} key={index}>{tag.label}</StatusTag>
        ))}
      </Bottom>
    </BaseCardBox>
  )
}
export default BaseCard
