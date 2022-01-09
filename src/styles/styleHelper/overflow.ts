const overflow = {
  auto: {
    overflow: 'auto'
  },
  visibility: {
    overflow: 'visible'
  },
  x: {
    overflowX: 'auto',
    overflowY: 'hidden'
  },
  y: {
    overflowX: 'hidden',
    overflowY: 'auto'
  } as any,
  hidden: {
    overflow: 'hidden'
  },
  scrollBar: {
    '&::-webkit-scrollbar': {
      width: '0.03rem'
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '0.03rem',
      webkitBoxShadow: 'inset 0 0 0.05rem rgba(15, 14, 14, 0.08);'
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '0.03rem',
      background: 'rgba(167, 139, 250, 0.4)'
    }
  }
}
export default overflow
