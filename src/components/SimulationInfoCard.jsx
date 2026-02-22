import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core'
import { useSimulation } from '../context/SimulationContext'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 700,
        margin: '24px auto 0',
    },
    card: {
        background: 'rgba(175, 85, 214, 0.08)',
        border: '1px solid rgba(175, 85, 214, 0.25)',
        borderRadius: 12,
        padding: '20px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
    },
    icon: {
        fontSize: 28,
        flexShrink: 0,
    },
    info: {
        flex: 1,
    },
    label: {
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        color: 'rgba(255, 255, 255, 0.45)',
        marginBottom: 4,
    },
    queryText: {
        fontSize: 15,
        color: '#fff',
        fontFamily: "'Roboto Mono', monospace",
        background: 'rgba(0, 0, 0, 0.2)',
        padding: '8px 14px',
        borderRadius: 6,
        lineHeight: 1.6,
        wordBreak: 'break-word',
    },
}))

const SimulationInfoCard = () => {
    const classes = useStyles()
    const { simulation } = useSimulation()

    return (
        <Container className={classes.root}>
            <div className={classes.card}>
                <span className={classes.icon}>▶️</span>
                <div className={classes.info}>
                    <Typography className={classes.label}>Running Query</Typography>
                    <div className={classes.queryText}>
                        {simulation.queryMetaData.query}
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default SimulationInfoCard
