import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import GraphOperatorSection from '../components/GraphOperatorSection'
import SimulationInfoCard from '../components/SimulationInfoCard'

const useStyles = makeStyles({
  root: {
    margin: '40px auto',
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
    <Container className={classes.root}>
        <SimulationInfoCard />
        <GraphOperatorSection/>
    </Container>
  );
}

export default SimulationPage;