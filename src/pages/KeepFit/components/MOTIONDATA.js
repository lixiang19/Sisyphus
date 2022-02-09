function genWarmUp (list) {
  return {
    startWords: '祝贺你又一次战胜了自己的懒惰，执行了健身计划，现在倒计时15s，请准备开始你的训练吧！',
    frequency: 10,
    group: 1,
    duration: 5,
    list: list,
    endWords: '热身完成，下面开始正式训练！'
  }
}

function genHiit () {

}
function genStrength (ruleType, list) {
  const ruleMap = {
    ladderGroup: {
      break: 90,
      groupTime: 300
    }
  }
  return {
    startWords: '接下来进行背部训练，采用阶梯组的形式，一个动作5分钟，预备', // TODO:5分钟
    ruleType: ruleType,
    list: [],
    rule: ruleMap[ruleType],
    endWords: '恭喜你坚持到了最后，训练完成！！'
  }
}
function genTrain (type) {
  switch (type) {
    case 'hiit':
      return genHiit()

    case 'strength':
      return genStrength()

    default:
      break
  }
}
const list = {
  4: {
    type: 'strength',
    warmUp: {

    },
    strength: {

    },
    hiit: {
      startWords: '接下来进行HIIT训练，全力地运动20s，然后可以休息40s，一组5分钟，预备',
      high: 20,
      low: 40,
      break: 60,
      groupTime: 300,
      list: ['波比', '壶铃摇摆'],
      endWords: '恭喜你坚持到了最后，HIIT训练完成！'
    },
    relax: {
      startWords: '休息10s，开始做放松动作，拉伸一下，放松肌肉，预备',
      frequency: 10,
      group: 1,
      duration: 5,
      list: [
        '拉伸'
      ],
      endWords: '恭喜你完成了今天的训练，距离好身材又近了一步，继续加油！'
    }
  }
}
export default list
