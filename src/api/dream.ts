import Bmob from 'hydrogen-js-sdk'
import dayjs from 'dayjs'
import { genDate, gen, genRandColor, genStatusTag, genConsumingTag } from 'src/helpers/bmob'
import dateApi from './date'
import orderApi from './order'
async function setTagList<T extends BaseTask> (obj:T) {
  const statusTag = genStatusTag(obj.status)
  const consumingTag = genConsumingTag(obj.timeConsuming)
  obj.tagList = [statusTag, consumingTag]
  return obj
}
const filterDream = async (obj:IAnyPropObject) => {
  const query = Bmob.Query('dream')
  Object.keys(obj).forEach((key) => {
    query.equalTo(key as any, '==', obj[key])
  })
  const dreams = await (query.find() as unknown as Dream[])
  dreams.forEach((dream) => {
    return setTagList(dream)
  })
  return dreams
}
export default {
  filterDream

}
