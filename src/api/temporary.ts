import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
import { genDate, gen } from 'src/helpers/bmob'
import dateApi from './date'
const findAllTemporary = async () => {
  const query = Bmob.Query('temporary')
  const temporaries = await (query.find() as unknown as Temporary[])
  return temporaries
}
const findTemporary = async (temporaryId:string) => {
  const query = Bmob.Query('temporary')
  query.equalTo('id', '==', temporaryId)
  return gen<Temporary>(query.find())
}
const addTemporary = async (temporary:Temporary) => {
  const query = Bmob.Query('temporary')
  query.set('name', temporary.content)
  return gen<BaseBmobItem>(query.save())
}
const updateTemporary = async (temporary:Temporary) => {
  const query = Bmob.Query('temporary')
  query.set('id', temporary.objectId)
  query.set('name', temporary.content)
  return gen<BaseBmobItem>(query.save())
}
const deleteTemporary = async (temporaryId:string) => {
  const query = Bmob.Query('temporary')
  return gen<BaseBmobItem>(query.destroy(temporaryId))
}
export default {
  findAllTemporary,
  findTemporary,
  addTemporary,
  updateTemporary,
  deleteTemporary
}
