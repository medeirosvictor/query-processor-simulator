export function QueryStringValidate(query) {
    if (!query || typeof query !== 'string') return false
    const lower = query.toLowerCase()
    return lower.includes('select')
}

export function QueryTokenValidate(queryMetaData) {
    if (!queryMetaData) return false

    const statement = (queryMetaData.statement || '').toLowerCase()
    const validStatement = statement === 'select'
    const validColumn = Array.isArray(queryMetaData.columns) && queryMetaData.columns.length > 0
    const validTable = typeof queryMetaData.fromTable === 'string' && queryMetaData.fromTable !== ''

    return validStatement && validColumn && validTable
}
