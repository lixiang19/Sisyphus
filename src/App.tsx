import React from 'react'
import { renderRoutes } from 'react-router-config'
import routes from 'src/routes/index'
import theme from 'src/styles/theme'
import Home from 'src/components/Home'
import 'src/styles/reset.css'
import '@arco-design/web-react/dist/css/arco.css'
import { HashRouter as Router } from 'react-router-dom'

import { ThemeProvider } from '@emotion/react'

function App () {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Home>
          {renderRoutes(routes)}
        </Home>
      </ThemeProvider>
    </Router>
  )
}
export default App
