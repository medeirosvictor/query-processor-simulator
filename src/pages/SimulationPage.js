import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import GraphOperatorSection from '../components/GraphOperatorSection'
import SimulationInfoCard from '../components/SimulationInfoCard'
import ResultsTable from '../components/ResultsTable'

const useStyles = makeStyles({
  root: {
    margin: '40px auto',
    display: 'flex'
  },
  card: {
    maxWidth: 400,
    margin: '0 auto'
  },
  h2: {
      fontSize: 30,
      textAlign: 'center',
      color: '#000'
  },
  tablesContainer: {
      display: 'flex',
      flexWrap: 'wrap'
  },
  queryCardsContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2vh',
    padding: '5px'
  },
  message: {
    textAlign: 'center',
    color: '#fff'
  }
});

const SimulationPage = () => {
    const classes = useStyles();
    const simulationState = useSelector((state) => state.simulationState)

    if (!simulationState.isRunning) {
        return (
            <Redirect to="/"/>
        )
    }

  return (
    <Container>
      <SimulationInfoCard />
      <div className={classes.message}>Results for Graph and Query</div>
      <Container className={classes.root}>
          <GraphOperatorSection/>
          <ResultsTable table={simulationState.queryMetaData.response}/>
      </Container>
    </Container>
  );
}

export default SimulationPage;