import React from 'react';
import './App.css';
import HomePage from './pages/HomePage'
import SimulationPage from './pages/SimulationPage'
import { Route, } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      textAlign: "center",
      height: '100vh'
    },
    h1: {
        fontSize: 40,
        margin: '0 auto'
    },
});

function App() {
    const classes = useStyles();
    return (
        <div className="App">
            <Typography className={classes.h1} variant="h1" component="h1" color="secondary">
                Query Processor Simulator
            </Typography>
            <Route path="/" exact component={HomePage} />
            <Route path="/simulation" exact component={SimulationPage} />
        </div>
    );
}

export default App;
