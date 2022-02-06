import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
import { genDate, gen, genRandColor, genStatusTag, genConsumingTag } from 'src/helpers/bmob'
import dateApi from './date'
import orderApi from './order'
function genAdd (tableName:string, obj:IAnyPropObject) {
  const query = Bmob.Query(tableName)
  Object.keys(obj).forEach((key) => {
    query.set(key as any, obj[key])
  })
  return gen<BaseBmobItem>(query.save())
}
