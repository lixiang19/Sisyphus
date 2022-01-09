import styled from '@emotion/styled'
import s from 'src/styles/styleHelper'
import { useRequest } from 'ahooks'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Modal, Button } from '@arco-design/web-react'

const FooterBox = styled.div(
  s.w.full,
  s.flex.row.e.c,
  s.gap.x[3]
)
interface FooterProps {
  onOk: () => void;
  onCancel: () => void;
}
const Footer = ({ onOk, onCancel }:FooterProps) => {
  return (
    <FooterBox>
      <Button onClick={onCancel}>取消</Button>
      <Button onClick={onOk} type='primary'>确认</Button>
    </FooterBox>
  )
}
const DialogBox = styled.div(

)
interface DialogProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
}
const Dialog = ({ visible, onOk, onCancel, children }:DialogProps) => {
  return (
    <>
      <Modal
        title='创建'
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        okText='确认'
        cancelText='取消'
        autoFocus={false}
        focusLock={true}
        footer={<Footer onOk={onOk} onCancel={onCancel}></Footer>}
      >
        {children}
      </Modal>
    </>
  )
}
export default Dialog
