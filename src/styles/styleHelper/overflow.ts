const overflow = {
  auto: {
    overflow: 'auto'
  },
  visibility: {
    overflow: 'visible'
  },
  x: {
    overflowX: 'auto'
  },
  y: {
    overflowY: 'auto'
  },
  hidden: {
    overflow: 'hidden'
  },
  scroll: {
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      width: '0.03rem'
    },
    '&::-webkit-scrollbar-track': {
      borderRadius: '0.03rem',
      webkitBoxShadow: 'inset 0 0 0.05rem rgba(15, 14, 14, 0.08);'
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '0.03rem',
      background: 'rgba(0, 120, 212, 0.4)'
    }
  }
}
export default overflow
