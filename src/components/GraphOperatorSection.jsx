import React from 'react'
import ReactFlow from 'react-flow-renderer'
import { useSimulation } from '../context/SimulationContext'

export default function GraphOperatorSection() {
    const { simulation } = useSimulation()

    const graphStyles = {
        width: '40%',
        height: '550px',
        backgroundColor: '#fff',
        borderColor: 'lightcoral',
        margin: '20px'
    }

    if (simulation.isRunning) {
        return (
            <ReactFlow elements={simulation.queryMetaData.elements} style={graphStyles} />
        )
    }

    return <div />
}
