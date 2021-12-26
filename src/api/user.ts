import Bmob from 'hydrogen-js-sdk'

const login = () => {
  return Bmob.User.login('li', '123456')
}
export default {
  login
}
