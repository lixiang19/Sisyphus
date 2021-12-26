const pseudoClass = {
  hover (...args: any[]) {
    return {
      ':hover': Object.assign({}, ...args)
    }
  }
}
export default pseudoClass
