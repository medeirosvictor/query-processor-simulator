import React from 'react';
import ReactFlow from 'react-flow-renderer';
import { useSelector } from 'react-redux';

export default function GraphOperatorSection() {
    const isRunning = useSelector((state) => state.simulationState.isRunning)
    const simulationState = useSelector((state) => state.simulationState)

    const graphStyles = { 
        width: '40%', 
        height: '550px', 
        backgroundColor: '#fff',
        borderColor: 'lightcoral',
        margin: '20px'
    };

    if (isRunning) {
        return (
            <ReactFlow elements={simulationState.queryMetaData.elements} style={graphStyles} />
        )
    }

    return (
        <div>
        </div>
    )
}
