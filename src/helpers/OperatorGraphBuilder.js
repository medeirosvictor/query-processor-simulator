const graphPositions = [
    [150, 200],
    [250, 300],
    [350, 400],
    [450, 500]
]

const tableStyle = {
    background: 'linear-gradient(135deg, #ede7f6, #e1d5f0)',
    color: '#4a2d6b',
    border: '2px solid #af55d6',
    borderRadius: 8,
    width: 180,
    fontWeight: 600,
    fontSize: 14,
    padding: '8px 0',
    textAlign: 'center',
}

const selectionStyle = {
    background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
    color: '#2e7d32',
    border: '2px solid #66bb6a',
    borderRadius: 8,
    width: 180,
    fontWeight: 600,
    fontSize: 14,
    padding: '8px 0',
    textAlign: 'center',
}

const projectionStyle = {
    background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
    color: '#1565c0',
    border: '2px solid #42a5f5',
    borderRadius: 8,
    width: 180,
    fontWeight: 600,
    fontSize: 14,
    padding: '8px 0',
    textAlign: 'center',
}

const edgeStyle = {
    stroke: '#af55d6',
    strokeWidth: 2,
}

export function BuildOperatorGraph(queryMetaData) {
    let nodes = []
    let counter = 0

    // From Table Node
    nodes.push({
        id: '0',
        data: { label: `📄 ${queryMetaData.fromTable}` },
        position: { x: 50, y: 100 },
        style: tableStyle,
    })

    if ('joinTable' in queryMetaData) {
        nodes.push({
            id: (nodes.length).toString(),
            data: { label: `📄 ${queryMetaData.joinTable}` },
            position: { x: 250, y: 100 },
            style: tableStyle,
        })
    }

    // Selection Operator
    nodes.push({
        id: (nodes.length).toString(),
        data: {
            label: queryMetaData.columns[0] === '*' || queryMetaData.conditional === undefined
                ? 'σ  all'
                : `σ  ${queryMetaData.conditional}`
        },
        position: { x: graphPositions[counter][0], y: graphPositions[counter][1] },
        style: selectionStyle,
    })
    counter++

    // Projection Operator
    if (queryMetaData.conditional === '') {
        nodes.push({
            id: (nodes.length).toString(),
            data: { label: 'Π  all' },
            position: { x: graphPositions[counter][0], y: graphPositions[counter][1] },
            style: projectionStyle,
        })
    } else {
        nodes.push({
            id: (nodes.length).toString(),
            data: { label: `Π  ${getColumnsString(queryMetaData.columns)}` },
            position: { x: graphPositions[counter][0], y: graphPositions[counter][1] },
            style: projectionStyle,
        })
    }

    // Edges
    if ('joinTable' in queryMetaData) {
        nodes.push({
            id: 'e0-2', source: '0', target: '2', animated: true,
            style: edgeStyle,
        })
        nodes.push({
            id: 'e1-2', source: '1', target: '2', animated: true,
            style: edgeStyle,
        })
        nodes.push({
            id: 'e2-3', source: '2', target: '3', animated: true,
            style: edgeStyle,
        })
    } else {
        nodes.push({
            id: 'e0-1', source: '0', target: '1', animated: true,
            style: edgeStyle,
        })
        nodes.push({
            id: 'e1-2', source: '1', target: '2', animated: true,
            style: edgeStyle,
        })
    }

    return nodes
}

function getColumnsString(columns) {
    let s = columns.reduce((prev, curr) => {
        return prev + ', ' + curr
    })
    return s
}
