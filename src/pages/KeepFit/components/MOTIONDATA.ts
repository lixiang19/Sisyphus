type TypeRuleType = 'ladder'
type TypeType = 'hiit'|'strength'
function genWarmUp (list:string[]) {
  return {
    startWords: '祝贺你又一次战胜了自己的懒惰，执行了健身计划，现在倒计时10秒，请准备开始你的训练吧！',
    frequency: 10,
    group: 1,
    duration: 5,
    breakTime: 3,
    list: list,
    endWords: '热身完成，下面开始正式训练！'
  }
}

function genHiit (list:string[]) {
  return {
    startWords: '接下来进行HIIT训练，全力地运动20秒，然后可以休息40秒，一组5分钟，准备',
    high: 20,
    low: 40,
    breakTime: 60,
    group: 5,
    list: list,
    type: 'hiit' as 'hiit',
    endWords: '恭喜你坚持到了最后，HIIT训练完成！'
  }
}
function genStrength (ruleType:TypeRuleType, bodyPart:string, list:string[]) {
  const ruleMap = {
    ladder: {
      breakTime: 90,
      duration: 60,
      group: 5
    }
  }
  return {
    startWords: `接下来进行${bodyPart}训练，采用阶梯组的形式，一个动作5分钟，准备`, // TODO:5分钟
    ruleType: ruleType,
    list: list,
    rule: ruleMap[ruleType],
    type: 'strength' as 'strength',
    endWords: '恭喜你坚持到了最后，训练完成！！'
  }
}
function genTrain (type:TypeType, list:string[], ruleType?:TypeRuleType, bodyPart?:string) {
  switch (type) {
    case 'hiit':
      return genHiit(list)

    case 'strength':
      return genStrength(ruleType || 'ladder', bodyPart || '全身', list)

    default:
      return genHiit(list)
  }
}
function genRelax (list:string[]) {
  return {
    startWords: '休息10秒，开始做放松动作，拉伸一下，放松肌肉，准备',
    frequency: 10,
    group: 1,
    duration: 5,
    breakTime: 3,
    list: list,
    endWords: '恭喜你完成了今天的训练，距离好身材又近了一步，继续加油！'
  }
}
function genFlow (type:TypeType = 'hiit', warmList:string[], relaxList:string[], { trainList, ruleType, bodyPart }:{trainList:string[], ruleType?:TypeRuleType, bodyPart?:string}) {
  return {
    type: type,
    warmUp: genWarmUp(warmList),
    train: genTrain(type, trainList, ruleType, bodyPart),
    relax: genRelax(relaxList)
  }
}
const list = {
  4: genFlow(
    'strength',
    ['扩胸运动', '开合步', '壶铃摇摆'],
    ['胸部拉伸', '肱二头肌拉伸', '猫式伸展'],
    { trainList: ['俯身转体', '俯身转体', '哑铃水平飞鸟', '交替锤式弯举'], ruleType: 'ladder', bodyPart: '胸肌和肱二头肌' }),
  5: genFlow(
    'hiit',
    ['开合步', '直立体前屈', '肩膀环绕'],
    ['大腿前侧拉伸', '肱三头肌拉伸'],
    { trainList: ['波比', '动态平板支撑'] }
  )
}
export type TypeMotion = typeof list[4]

export default list
