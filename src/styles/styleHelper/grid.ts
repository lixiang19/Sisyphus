import { genProxy } from 'src/helpers/type'
const items = {
  start: {
    alignItems: 'start'
  }
}

type Grid = {
  cols:IAnyPropObject,
  colSpan:IAnyPropObject,
  rows:IAnyPropObject,
  rowSpan:IAnyPropObject,
  items: typeof items
}
const grid:Grid = {
  cols: {},
  colSpan: {},
  rows: {},
  rowSpan: {},
  items: items
}
for (let i = 1; i <= 12; i++) {
  grid.cols[i] = {
    display: 'grid',
    gridTemplateColumns: `repeat(${i}, 1fr)`
  }
  grid.colSpan[i] = {
    gridColumn: `span ${i}`
  }
  grid.rows[i] = {
    display: 'grid',
    gridTemplateRows: `repeat(${i}, 1fr)`
  }
  grid.rowSpan[i] = {
    gridRow: `span ${i}`
  }
}

const proxy = {
  cols: genProxy(grid.cols, 'gridTemplateColumns', {
    display: 'grid'
  }),
  colSpan: genProxy(grid.colSpan, 'gridColumn'),
  rows: genProxy(grid.rows, 'gridTemplateRows', { display: 'grid' }),
  rowSpan: genProxy(grid.rowSpan, 'gridRow')
}
export default proxy
