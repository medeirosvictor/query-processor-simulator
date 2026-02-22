import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core'
import GraphOperatorSection from '../components/GraphOperatorSection'
import SimulationInfoCard from '../components/SimulationInfoCard'
import ResultsTable from '../components/ResultsTable'
import { useSimulation } from '../context/SimulationContext'

const useStyles = makeStyles({
  root: {
    margin: '40px auto',
    display: 'flex'
  },
  message: {
    textAlign: 'center',
    color: '#fff'
  }
})

const SimulationPage = () => {
    const classes = useStyles()
    const { simulation } = useSimulation()

    if (!simulation.isRunning) {
        return <Redirect to="/" />
    }

    return (
        <Container>
            <SimulationInfoCard />
            <div className={classes.message}>Results for Graph and Query</div>
            <Container className={classes.root}>
                <GraphOperatorSection />
                <ResultsTable table={simulation.queryMetaData.response} />
            </Container>
        </Container>
    )
}

export default SimulationPage
