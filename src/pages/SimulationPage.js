import React, { useEffect } from 'react';
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

    useEffect(() => {
      // Atualiza o titulo do documento usando a API do browser
      if(simulationState.isRunning) {
        debugger
        fetch('http://localhost:8080/query', {
          method: 'POST',
          body: simulationState,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        }).then(function (response) {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(response);
        }).then(function (data) {
          console.log(data);
        }).catch(function (error) {
          console.warn('Something went wrong.', error);
        });
      }
    });

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