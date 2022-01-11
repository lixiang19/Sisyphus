const pseudoClass = {
  hover (...args: any[]) {
    return {
      ':hover': Object.assign({}, ...args)
    }
  },
  before (...args: any[]) {
    return {
      '::before': Object.assign({
        content: '""',
        display: 'block'
      }, ...args)
    }
  }
}
export default pseudoClass
