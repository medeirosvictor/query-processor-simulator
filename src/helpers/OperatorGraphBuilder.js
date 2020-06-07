// const elements = [
//     { id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 5 } },
//     { id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 100 } },
//     { id: 'e1-2', source: '1', target: '2', animated: true }
//   ];

const graphPositions = [
    [50, 100],
    [150, 200],
    [250, 300],
    [350, 400],
    [450, 500]
]


export function BuildOperatorGraph (queryMetaData) {
    //Connect Tables
    let nodes = []
    let counter = 0

    queryMetaData.fromTable.forEach((el, index)=> {
        //0
        nodes.push({
            id: index.toString(),
            data: { label: el },
            position: {
                x: graphPositions[index][0],
                y: graphPositions[index][1]
            }
        })
        counter++
    })

    if (queryMetaData.joinTable !== '') {
        //1
        nodes.push({
            id: (nodes.length).toString(),
            data: { label: queryMetaData.joinTable },
            position: {
                x: 250,
                y: 100
            }
        })
    }

    //Get Select Operator
    nodes.push({
        id: (nodes.length).toString(),
        data: {label: queryMetaData.columns[0] === '*'? queryMetaData.statement+" all": "select " + queryMetaData.conditional},
        position: {
            x: graphPositions[counter][0],
            y: graphPositions[counter][1]
        }
    })
    counter++

    if (queryMetaData.conditional === '') {
        nodes.push({
            id: (nodes.length).toString(),
            data: {label: 'project all'},
            position: {
                x: graphPositions[counter][0],
                y: graphPositions[counter][1]
            }
        })
    } else {
        nodes.push({
            id: (nodes.length).toString(),
            data: {label: 'project ' + getColumnsString(queryMetaData.columns)},
            position: {
                x: graphPositions[counter][0],
                y: graphPositions[counter][1]
            }
        })
    }

    

    if(queryMetaData.joinTable !== '') {
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
            id: 'e1-3', source: '1', target: '3', animated: false,
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