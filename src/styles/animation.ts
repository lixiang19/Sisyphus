import { keyframes } from '@emotion/react'

const heatBeatAni = keyframes({
  from: {
    transform: 'scale(1)'
  },
  '50%': {
    transform: 'scale(1.1)'
  },
  to: {
    transform: 'scale(1)'
  }
})
const animation = {
  heatBeat: {
    animation: `${heatBeatAni} 0.8s infinite`
  }
}
export default animation
