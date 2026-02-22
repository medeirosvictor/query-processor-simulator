export function QueryParse(query) {
    // Normalize to lowercase for keyword matching, keep original for display
    const originalQuery = query
    query = query.toLowerCase().trim()

    let queryTokens = query.match(/[^\s,;]+|;/gm)

    if (!queryTokens || queryTokens.length === 0) {
        return { query: originalQuery, statement: '', columns: [], fromTable: '' }
    }

    let queryType = "noCondition"
    if (query.includes("join")) {
        queryType = "withJoin"
    } else if (query.includes("where")) {
        queryType = "withWhere"
    }

    return QuerySimulationTreatment(originalQuery, queryTokens, queryType)
}

export function QuerySimulationTreatment(query, queryTokens, queryType) {
    const queryMetaData = {}

    // Store original query for display
    queryMetaData.query = query

    // Get statement
    queryMetaData.statement = queryTokens[0]
    queryTokens = queryTokens.slice(1)

    // Get columns (everything between statement and "from")
    queryMetaData.columns = []
    for (let i = 0; i < queryTokens.length; i++) {
        if (queryTokens[i] === "from") {
            queryTokens = queryTokens.slice(i + 1)
            break
        }
        queryMetaData.columns.push(queryTokens[i])
    }

    if (queryType === "noCondition") {
        queryMetaData.fromTable = queryTokens[0] || ''
    } else if (queryType === "withWhere") {
        // Initialize fromTable as a string
        queryMetaData.fromTable = ''

        for (let j = 0; j < queryTokens.length; j++) {
            // Check if the next token is "where"
            if (j + 1 < queryTokens.length && queryTokens[j + 1] === 'where') {
                queryMetaData.fromTable = queryTokens[j]
                queryTokens = queryTokens.slice(j + 2)
                break
            } else if (queryTokens[j] === 'where') {
                // "where" is the current token (table was already set or missing)
                queryTokens = queryTokens.slice(j + 1)
                break
            } else if (queryMetaData.fromTable === '') {
                // First token after FROM is the table name
                queryMetaData.fromTable = queryTokens[j]
            }
            // Skip alias tokens (e.g., "Employee E" — "E" is consumed but not stored)
        }

        // Get conditional args (everything after WHERE)
        queryMetaData.conditional = queryTokens.join(' ')
    } else if (queryType === "withJoin") {
        queryMetaData.fromTable = queryTokens[0] || ''
        queryTokens = queryTokens.slice(2) // skip "join" keyword
        queryMetaData.joinTable = queryTokens[0] || ''
        queryTokens = queryTokens.slice(1)

        // Get ON condition from JOIN
        const onParts = []
        let foundWhere = false
        for (let j = 0; j < queryTokens.length; j++) {
            if (queryTokens[j] === 'where') {
                queryTokens = queryTokens.slice(j + 1)
                foundWhere = true
                break
            }
            if (queryTokens[j] !== 'on') {
                onParts.push(queryTokens[j])
            }
        }
        queryMetaData.on = onParts.join(' ')

        // Get WHERE conditional if present
        if (foundWhere) {
            queryMetaData.conditional = queryTokens.join(' ')
        }
    }

    return queryMetaData
}
