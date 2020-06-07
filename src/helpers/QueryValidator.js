export function QueryStringValidate(query) {
    let validStatement = query.includes('select') || query.includes('SELECT') ? true : false

    if (validStatement) {
        return true
    } else {
        return false
    }
}

export function QueryTokenValidate(queryMetaData) {
    let validStatement = queryMetaData.statement === 'select' || queryMetaData.statement === 'SELECT' ? true : false
    let validColumn = queryMetaData.columns.length > 0 ? true : false
    let validTable = queryMetaData.fromTable.length > 0 ? true : false

    if (validStatement && validColumn && validTable) {
        return true
    } else {
        return false
    }
}