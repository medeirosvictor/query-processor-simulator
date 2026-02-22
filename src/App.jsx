import React from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import SimulationPage from './pages/SimulationPage'
import { Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles({
    h1: {
        fontSize: 36,
        fontWeight: 300,
        letterSpacing: '1px',
    },
})

function App() {
    const classes = useStyles()
    return (
        <div className="App">
            <div className="App-header">
                <Typography className={classes.h1} variant="h1" component="h1" color="secondary">
                    Query Processor Simulator
                </Typography>
                <div className="App-subtitle">
                    Learn how databases process SQL queries
                </div>
            </div>
            <Route path="/" exact component={HomePage} />
            <Route path="/simulation" exact component={SimulationPage} />
        </div>
    )
}

export default App
