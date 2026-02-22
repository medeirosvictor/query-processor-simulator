import departments from '../simulation_data/departments.json'
import employees from '../simulation_data/employees.json'
import dependents from '../simulation_data/dependents.json'

const tables = {
  department: departments,
  departments: departments,
  employee: employees,
  employees: employees,
  dependent: dependents,
  dependents: dependents,
}

/**
 * Execute a parsed query against the in-memory seed data.
 * Takes the queryMetaData produced by QueryParser and returns
 * an array of row objects (matching what the Go backend returned).
 */
export function executeQuery(queryMetaData) {
  const tableName = (queryMetaData.fromTable || '').toLowerCase()
  const sourceTable = tables[tableName]

  if (!sourceTable) {
    return []
  }

  let results = [...sourceTable]

  // Handle JOIN
  if (queryMetaData.joinTable) {
    const joinTableName = queryMetaData.joinTable.toLowerCase()
    const joinTable = tables[joinTableName]

    if (!joinTable) {
      return []
    }

    results = performJoin(results, joinTable, queryMetaData.on)
  }

  // Handle WHERE
  if (queryMetaData.conditional) {
    results = applyWhere(results, queryMetaData.conditional)
  }

  // Handle column projection
  if (queryMetaData.columns && queryMetaData.columns[0] !== '*') {
    results = projectColumns(results, queryMetaData.columns)
  }

  return results
}

/**
 * Perform a nested-loop join on an equality condition like
 * "department.cod_dep=employee.capacity"
 */
function performJoin(leftTable, rightTable, onCondition) {
  if (!onCondition) return leftTable

  // Parse "leftCol=rightCol" or "table.col=table.col"
  const parts = onCondition.split('=').map(s => s.trim())
  if (parts.length !== 2) return leftTable

  const leftKey = extractColumnName(parts[0])
  const rightKey = extractColumnName(parts[1])

  if (!leftKey || !rightKey) return leftTable

  // Figure out which key belongs to which table by checking if the key
  // exists in the first row of each table
  const leftSample = leftTable[0] || {}
  const rightSample = rightTable[0] || {}

  let lk = leftKey
  let rk = rightKey

  // Swap if needed — the ON condition may list right table first
  if (!(lk in leftSample) && (rk in leftSample)) {
    lk = rightKey
    rk = leftKey
  }

  // Build a hash map on the right table for efficiency
  const hashMap = {}
  for (const row of rightTable) {
    const key = String(row[rk])
    if (!hashMap[key]) hashMap[key] = []
    hashMap[key].push(row)
  }

  const joined = []
  for (const leftRow of leftTable) {
    const key = String(leftRow[lk])
    const matches = hashMap[key]
    if (matches) {
      for (const rightRow of matches) {
        joined.push({ ...leftRow, ...rightRow })
      }
    }
  }

  return joined
}

/**
 * Extract just the column name from "table.column" or "column"
 */
function extractColumnName(s) {
  const dotIndex = s.lastIndexOf('.')
  return dotIndex >= 0 ? s.substring(dotIndex + 1) : s
}

/**
 * Apply a WHERE condition like "salary > 5000" or "salary = 5000"
 */
function applyWhere(rows, conditional) {
  // Parse: "column operator value" or "table.column operator value"
  const match = conditional.match(/^(\S+)\s*(>=|<=|!=|>|<|=)\s*(.+)$/)
  if (!match) return rows

  const column = extractColumnName(match[1])
  const operator = match[2]
  const rawValue = match[3].trim().replace(/^['"]|['"]$/g, '') // strip quotes

  return rows.filter(row => {
    const cellValue = row[column]
    if (cellValue === undefined) return false

    // Try numeric comparison first
    const numCell = Number(cellValue)
    const numVal = Number(rawValue)
    const isNumeric = !isNaN(numCell) && !isNaN(numVal)

    if (isNumeric) {
      return compareValues(numCell, operator, numVal)
    }

    // Fall back to string comparison
    return compareValues(String(cellValue), operator, rawValue)
  })
}

function compareValues(a, operator, b) {
  switch (operator) {
    case '=':  return a === b
    case '!=': return a !== b
    case '>':  return a > b
    case '<':  return a < b
    case '>=': return a >= b
    case '<=': return a <= b
    default:   return false
  }
}

/**
 * Project only the requested columns.
 * Handles "table.column" by stripping the table prefix.
 */
function projectColumns(rows, columns) {
  const colNames = columns.map(c => extractColumnName(c))

  return rows.map(row => {
    const projected = {}
    for (const col of colNames) {
      if (col in row) {
        projected[col] = row[col]
      }
    }
    return projected
  })
}
