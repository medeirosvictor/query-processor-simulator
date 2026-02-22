import React from 'react'
import ReactFlow from 'react-flow-renderer'
import { makeStyles } from '@material-ui/core/styles'
import { useSimulation } from '../context/SimulationContext'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid rgba(175, 85, 214, 0.25)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
        width: '45%',
        height: 550,
        margin: 12,
        position: 'relative',
    },
    label: {
        position: 'absolute',
        top: 12,
        left: 16,
        zIndex: 10,
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        color: 'rgba(100, 70, 120, 0.7)',
        pointerEvents: 'none',
    },
}))

export default function GraphOperatorSection() {
    const classes = useStyles()
    const { simulation } = useSimulation()

    const graphStyles = {
        width: '100%',
        height: '100%',
        backgroundColor: '#faf8fc',
    }

    if (simulation.isRunning) {
        return (
            <div className={classes.wrapper}>
                <span className={classes.label}>Operator Graph</span>
                <ReactFlow elements={simulation.queryMetaData.elements} style={graphStyles} />
            </div>
        )
    }

    return <div />
}
