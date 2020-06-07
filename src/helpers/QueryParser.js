
// let regexArray = {
//     noCondition: '/[^\s,;]+|;/gm',// select * from TABLE
//     withWhereSingleTable: '/(select)\s+((\*)|(\w+(?:,(\s)*))(\w+))\s+(from)\s+(\w+)\s+(where)\s+(\w+)\s+(<|>|=|<=|>=)\s+(\w+)/g'
// }

export function QueryParse (query) {

    //Get type of query
    let queryTokens = []
    let queryMetaData = {}

    queryTokens = query.match(/[^\s,;]+|;/gm)

    if (!query.includes("where")) {
        queryMetaData = QuerySimulationTreatment(query, queryTokens, "noCondition")
    } else {
        if (query.includes("join")) {
            queryMetaData = QuerySimulationTreatment(query, queryTokens, "withJoin")
        } else {
            queryMetaData = QuerySimulationTreatment(query, queryTokens, "withWhereSingleTable")
        }
    }

    return queryMetaData
}

export function QuerySimulationTreatment (query, queryTokens, queryType) {
    let queryMetaData = {}

    queryMetaData.query = query
    [queryTokens, queryMetaData] = getStatementTokens(queryTokens, queryMetaData)
    [queryTokens, queryMetaData] = getColumnTokens(queryTokens, queryMetaData)

    debugger
    if (queryType === "noCondition") {
        //Get Tables
        for (let j = 0; j < queryTokens.length; j++) {
            if (queryTokens[j+1]) {
                queryMetaData.fromTable.push(queryTokens[j]+" "+queryTokens[j+1])
                j++
            } else {
                queryMetaData.fromTable.push(queryTokens[j])
            }
        }
    }
    else if (queryType === "withWhereSingleTable") {
        for (let i = 0; i < queryTokens.length; i++) {
            if (queryTokens[i] !== "from") {
                queryMetaData.columns.push(queryTokens[i])
            } else {
                queryTokens = queryTokens.slice(i+1)
                break
            }
        }

        for (let j = 0; j < queryTokens.length; j++) {
            if (queryTokens[j+1] === 'where') {
                queryMetaData.fromTable.push(queryTokens[j])
                queryTokens = queryTokens.slice(j+2)
                break
            } else {
                //named table pattern (Employee E)
                queryMetaData.fromTable.push(queryTokens[j] + " " + queryTokens[j+1])
            }
        }

        //Get conditional args
        for (let j = 0; j < queryTokens.length; j++) {
            if (queryMetaData.conditional === '') {
                queryMetaData.conditional = queryMetaData.conditional + queryTokens[j]
            } else {
                queryMetaData.conditional = queryMetaData.conditional + " " + queryTokens[j]
            }
        }
    } else if (queryType === "withJoin") {
        [queryTokens, queryMetaData] = getColumnTokens(queryTokens, queryMetaData)

        queryMetaData.fromTable.push(queryTokens[0])
        queryTokens = queryTokens.slice(2)
        queryMetaData.joinTable = queryTokens[0]
        queryTokens = queryTokens.slice(1)

        for (let j = 0; j < queryTokens.length; j++) {
            if (queryTokens[j] !== 'where') {
                if (queryTokens[j] !== 'on') {
                    if (queryMetaData.on === '') {
                        queryMetaData.on = queryMetaData.on + queryTokens[j]
                    } else {
                        queryMetaData.on = queryMetaData.on + " " + queryTokens[j]
                    }
                }
            } else {
                queryTokens = queryTokens.slice(j+1)
                break
            }
        }

        for (let j = 0; j < queryTokens.length; j++) {
            if (queryMetaData.conditional === '') {
                queryMetaData.conditional = queryMetaData.conditional + queryTokens[j]
            } else {
                queryMetaData.conditional = queryMetaData.conditional + " " + queryTokens[j]
            }
        }
    }

    debugger
    return queryMetaData
}

function getStatementTokens(queryTokens, queryMetaData) {
    queryMetaData.statement = queryTokens[0]
    queryTokens = queryTokens.slice(1)

    return [queryTokens, queryMetaData]
}

function getColumnTokens(queryTokens, queryMetaData) {
    for (let i = 0; i < queryTokens.length; i++) {
        if (queryTokens[i] !== "from") {
            queryMetaData.columns.push(queryTokens[i])
        } else {
            queryTokens = queryTokens.slice(i+1)
            break
        }
    }

    return [queryTokens, queryMetaData]
}

function getFromTableToken(queryTokens, queryMetaData) {

    return [queryTokens, queryMetaData]
}