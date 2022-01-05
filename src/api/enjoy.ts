import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
import { genDate, gen } from 'src/helpers/bmob'
import dateApi from './date'

const findAllEnjoys = async () => {
  const query = Bmob.Query('enjoy')
  const enjoys = await (query.find() as unknown as Enjoy[])
  return enjoys
}
const findEnjoy = async (enjoyId:string) => {
  const query = Bmob.Query('enjoy')
  query.equalTo('id', '==', enjoyId)
  return gen<Enjoy>(query.find())
}
const addEnjoy = async (enjoy:Enjoy) => {
  const query = Bmob.Query('enjoy')
  query.set('name', enjoy.content)
  return gen<BaseBmobItem>(query.save())
}
const updateEnjoy = async (enjoy:Enjoy) => {
  const query = Bmob.Query('enjoy')
  query.set('id', enjoy.objectId)
  query.set('name', enjoy.content)
  return gen<BaseBmobItem>(query.save())
}
export default {
  findAllEnjoys,
  findEnjoy,
  addEnjoy,
  updateEnjoy
}
