interface ISize {
  [index: number]: string,
  [property: string]: string
  xs: string,
  sm: string,
  md: string,
  lg: string,
  xl: string,
  xxl: string,
}
const size:ISize = {
  xs: '0.75rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  xxl: '4rem',
  '1/2': '50%',
  '1/3': '33.33%',
  '2/3': '66.66%',
  '1/4': '25%',
  '3/4': '75%',
  full: '100%'
}
function gen () {
  const base = 0.4
  for (let index = 0; index <= 200; index = index + 0.5) {
    size[index] = base * index + 'rem'
    size[-index] = -base * index + 'rem'
  }
}
gen()
export default size
