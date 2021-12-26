import { genProxy } from 'src/helpers/type'
import size from './size'
type Space = {
  margin: PosSize,
  padding: PosSize,
}

const map:Pos&any = {
  t: 'top',
  r: 'right',
  b: 'bottom',
  l: 'left'
}
const space:Space = {
  margin: {
    t: {},
    r: {},
    b: {},
    l: {},
    x: {},
    y: {},
    all: {}
  },
  padding: {
    t: {},
    r: {},
    b: {},
    l: {},
    x: {},
    y: {},
    all: {}
  }
}
Object.keys(size).forEach(key => {
  Object.keys(space.margin).forEach(pos => {
    // pos = pos as PosKey
    if (pos === 'x') {
      space.margin[pos][key] = {
        marginLeft: size[key],
        marginRight: size[key]
      }
      space.padding[pos][key] = {
        paddingLeft: size[key],
        paddingRight: size[key]
      }
    } else if (pos === 'y') {
      space.margin[pos][key] = {
        marginTop: size[key],
        marginBottom: size[key]
      }
      space.padding[pos][key] = {
        paddingTop: size[key],
        paddingBottom: size[key]
      }
    } else if (pos === 'all') {
      space.margin[pos][key] = {
        margin: `${size[key]}`
      }
      space.padding[pos][key] = {
        padding: `${size[key]}`
      }
    } else {
      space.margin[pos][key] = {
        [`margin-${map[pos]}`]: size[key]
      }
      space.padding[pos][key] = {
        [`padding-${map[pos]}`]: size[key]
      }
    }
  })
})

const proxy = {
  margin: genProxy(space.margin, 'margin'),
  padding: genProxy(space.padding, 'padding')
}
export default proxy
