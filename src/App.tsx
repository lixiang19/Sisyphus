import React from 'react'
import { renderRoutes } from 'react-router-config'
import routes from 'src/routes/index'
import theme from 'src/assets/styles/theme'

// import 'src/assets/styles/reset.css'
import { HashRouter as Router } from 'react-router-dom'

import { ThemeProvider } from '@emotion/react'

function App () {
  return (
    <Router>
      {renderRoutes(routes)}
    </Router>
  )
}
export default App
