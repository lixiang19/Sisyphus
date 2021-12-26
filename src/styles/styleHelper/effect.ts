const effect = {
  shadow: {
    md: {
      boxShadow: '0 0.01rem 0.03rem 0 rgb(0 0 0 / 0.1), 0 0.01rem 0.02rem -0.01rem rgb(0 0 0 / 0.1);'
    },
    lg: {
      boxShadow: '0 0.1rem 0.15rem -0.03rem rgb(0 0 0 / 0.1), 0 0.04rem 0.06rem -0.04rem rgb(0 0 0 / 0.1)'
    },
    xl: {
      boxShadow: '0 1rem 2rem rgba(0,0,0,0.1)'
    }
  },
  opacity: {
    0: {
      opacity: 0
    },
    25: {
      opacity: 0.25
    },
    50: {
      opacity: 0.5
    },
    75: {
      opacity: 0.75
    },
    100: {
      opacity: 1
    }
  }
}
export default effect
