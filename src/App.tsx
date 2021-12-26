import React from 'react'
import { renderRoutes } from 'react-router-config'
import routes from 'src/routes/index'
import Home from 'src/components/Home'
import '@arco-design/web-react/dist/css/arco.css'
import 'src/styles/reset.css'
import api from 'src/api'
import { HashRouter as Router } from 'react-router-dom'
import Bmob from 'hydrogen-js-sdk'
import { useRequest } from 'ahooks'
Bmob.initialize('f0f490ebe4ca47d3', '123456')

function App () {
  const { data, error, loading } = useRequest(api.user.login)
  return (
    <Router>
      <Home>
        {data ? renderRoutes(routes) : 'loading'}
      </Home>
    </Router>
  )
}
export default App
