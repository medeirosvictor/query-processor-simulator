import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import theme from './theme'
import { HashRouter as Router } from 'react-router-dom'
import { SimulationProvider } from './context/SimulationContext'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'

ReactDOM.render(
  <SimulationProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </SimulationProvider>,
  document.getElementById('root')
)
