import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Redirect, Link } from 'react-router-dom'
import { Container, Button, Typography } from '@material-ui/core'
import GraphOperatorSection from '../components/GraphOperatorSection'
import SimulationInfoCard from '../components/SimulationInfoCard'
import ResultsTable from '../components/ResultsTable'
import OperatorExplainer from '../components/OperatorExplainer'
import { useSimulation } from '../context/SimulationContext'

const useStyles = makeStyles((theme) => ({
    sectionTitle: {
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginTop: 32,
        marginBottom: 8,
    },
    graphAndTable: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        margin: '12px auto',
        maxWidth: 1100,
    },
    divider: {
        height: 1,
        background: 'linear-gradient(to right, transparent, rgba(175, 85, 214, 0.3), transparent)',
        margin: '28px auto',
        maxWidth: 700,
    },
    backButton: {
        display: 'block',
        margin: '32px auto 0',
        textTransform: 'none',
        fontSize: 14,
        fontWeight: 500,
        color: 'rgba(255, 255, 255, 0.6)',
        borderColor: 'rgba(175, 85, 214, 0.3)',
        borderRadius: 8,
        padding: '8px 28px',
        '&:hover': {
            borderColor: 'rgba(175, 85, 214, 0.6)',
            background: 'rgba(175, 85, 214, 0.08)',
        },
    },
}))

const SimulationPage = () => {
    const classes = useStyles()
    const { simulation, resetSimulation } = useSimulation()

    if (!simulation.isRunning) {
        return <Redirect to="/" />
    }

    return (
        <Container>
            <SimulationInfoCard />

            <Typography className={classes.sectionTitle}>
                Execution Plan & Results
            </Typography>

            <div className={classes.graphAndTable}>
                <GraphOperatorSection />
                <ResultsTable table={simulation.queryMetaData.response} />
            </div>

            <div className={classes.divider} />

            <OperatorExplainer />

            <Button
                className={classes.backButton}
                variant="outlined"
                component={Link}
                to="/"
                onClick={resetSimulation}
            >
                ← Run another query
            </Button>
        </Container>
    )
}

export default SimulationPage
