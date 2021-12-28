import React from 'react'
import { renderRoutes } from 'react-router-config'
import routes from 'src/routes/index'
import Home from 'src/components/Home'
import '@arco-design/web-react/dist/css/arco.css'
import 'src/styles/reset.css'
import api from 'src/api'
import { HashRouter as Router } from 'react-router-dom'

import { useRequest } from 'ahooks'

function App () {
  const { data, error, loading } = useRequest(api.user.preload)
  return (
    <Router>
      <Home>
        {data ? renderRoutes(routes) : 'loading'}
      </Home>
    </Router>
  )
}
export default App
