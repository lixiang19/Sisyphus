import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
function setRem () {
  const docEl = document.documentElement
  const clientWidth = docEl.clientWidth

  if (!clientWidth) {
    return
  }
  docEl.style.fontSize = 100 * (clientWidth / 2560) + 'px'
}
// setRem()
// window.onresize = () => {
//   setRem()
// }
ReactDOM.render(

  <App />,

  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
