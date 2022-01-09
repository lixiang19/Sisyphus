
const size:Size = {
  xs: '0.075rem',
  sm: '0.12rem',
  md: '0.16rem',
  lg: '0.22rem',
  xl: '0.3rem',
  xxl: '0.4rem',
  '1/2': '50%',
  '1/3': '33.33%',
  '2/3': '66.66%',
  '1/4': '25%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  full: '100%',
  auto: 'auto'
}
function gen () {
  const base = 0.04
  // TODO:
  for (let index = 0; index <= 200; index = index + 0.5) {
    size[index] = Math.floor(base * 100) / 100 * index + 'rem'
    size[-index] = -Math.floor(base * 100) / 100 * index + 'rem'
  }
}
gen()

export default size
