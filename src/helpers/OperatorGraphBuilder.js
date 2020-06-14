// const elements = [
//     { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
//     { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
//     { id: 'e1-2', source: '1', target: '2', animated: true }
//   ];

const graphPositions = [
    [150, 200],
    [250, 300],
    [350, 400],
    [450, 500]
]


export function BuildOperatorGraph (queryMetaData) {
    //Connect Tables
    let nodes = []
    let counter = 0

    // From Table Node
    nodes.push({
        id: '0',
        data: { label: queryMetaData.fromTable },
        position: {
            x: 50,
            y: 100
        },
        style: { background: 'rgb(227, 227, 247)', color: '#222', border: '1px solid #bbb', width: 180 }
    })

    if ('joinTable' in queryMetaData) {
        //1
        nodes.push({
            id: (nodes.length).toString(),
            data: { label: queryMetaData.joinTable },
            position: {
                x: 250,
                y: 100
            },
            style: { background: 'rgb(227, 227, 247)', color: '#222', border: '1px solid #bbb', width: 180 }
        })
    }

    //Get Select Operator
    nodes.push({
        id: (nodes.length).toString(),
        data: {label: queryMetaData.columns[0] === '*' | queryMetaData.conditional === undefined ? "σ all": "σ " + queryMetaData.conditional},
        position: {
            x: graphPositions[counter][0],
            y: graphPositions[counter][1]
        },
        style: { background: 'rgb(227, 227, 247)', color: '#222', border: '1px solid #bbb', width: 180 }
    })
    counter++

    if (queryMetaData.conditional === '') {
        nodes.push({
            id: (nodes.length).toString(),
            data: {label: 'Π all'},
            position: {
                x: graphPositions[counter][0],
                y: graphPositions[counter][1]
            },
            style: { background: 'rgb(227, 227, 247)', color: '#222', border: '1px solid #bbb', width: 180 }
        })
    } else {
        nodes.push({
            id: (nodes.length).toString(),
            data: {label: 'Π ' + getColumnsString(queryMetaData.columns)},
            position: {
                x: graphPositions[counter][0],
                y: graphPositions[counter][1]
            },
            style: { background: 'rgb(227, 227, 247)', color: '#222', border: '1px solid #bbb', width: 180 }
        })
    }

    

    if('joinTable' in queryMetaData) {
        nodes.push({ 
            id: 'e0-2', source: '0', target: '2', animated: false,
        })

        nodes.push({ 
            id: 'e1-2', source: '1', target: '2', animated: false,
        })

        nodes.push({ 
            id: 'e2-3', source: '2', target: '3', animated: false,
        })
    } else {
        nodes.push({ 
            id: 'e0-1', source: '0', target: '1', animated: false,
        })
        nodes.push({ 
            id: 'e1-2', source: '1', target: '2', animated: false,
        })
    }

    return nodes
}

function getColumnsString(columns) {
    let s = columns.reduce((prev, curr) => {
        return prev + ", " +  curr
    })
    return s
}