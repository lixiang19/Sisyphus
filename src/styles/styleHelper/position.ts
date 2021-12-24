const pos = {
  absolute: {
    position: 'absolute'
  },
  relative: {
    position: 'relative'
  },
  fixed: {
    position: 'fixed'
  },
  sticky: {
    position: 'sticky'
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)'
  },
  top: {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)'
  },
  left: {
    center: {
      position: 'absolute',
      top: '50%',
      left: 0,
      transform: 'translateY(-50%)'
    },
    bottom: {
      position: 'absolute',
      bottom: 0,
      left: 0
    },
    top: {
      position: 'absolute',
      top: 0,
      left: 0
    }
  },
  right: {
    center: {
      position: 'absolute',
      top: '50%',
      right: 0,
      transform: 'translateY(-50%)'
    },
    bottom: {
      position: 'absolute',
      bottom: 0,
      right: 0
    },
    top: {
      position: 'absolute',
      top: 0,
      right: 0
    }
  },
  center: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}
export default pos
