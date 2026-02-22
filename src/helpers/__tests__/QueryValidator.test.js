import { describe, it, expect } from 'vitest'
import { QueryStringValidate, QueryTokenValidate } from '../QueryValidator'

describe('QueryStringValidate', () => {
  it('returns true for lowercase select', () => {
    expect(QueryStringValidate('select * from department')).toBe(true)
  })

  it('returns true for uppercase SELECT', () => {
    expect(QueryStringValidate('SELECT * FROM department')).toBe(true)
  })

  it('returns true for mixed case', () => {
    expect(QueryStringValidate('Select name From employee')).toBe(true)
  })

  it('returns false for non-select query', () => {
    expect(QueryStringValidate('insert into department values (1, "test")')).toBe(false)
  })

  it('returns false for empty string', () => {
    expect(QueryStringValidate('')).toBe(false)
  })

  it('returns false for null', () => {
    expect(QueryStringValidate(null)).toBe(false)
  })

  it('returns false for undefined', () => {
    expect(QueryStringValidate(undefined)).toBe(false)
  })
})

describe('QueryTokenValidate', () => {
  it('returns true for valid metadata', () => {
    expect(QueryTokenValidate({
      statement: 'select',
      columns: ['*'],
      fromTable: 'department'
    })).toBe(true)
  })

  it('returns true for uppercase SELECT statement', () => {
    expect(QueryTokenValidate({
      statement: 'SELECT',
      columns: ['name'],
      fromTable: 'employee'
    })).toBe(true)
  })

  it('returns false when statement is not select', () => {
    expect(QueryTokenValidate({
      statement: 'insert',
      columns: ['*'],
      fromTable: 'department'
    })).toBe(false)
  })

  it('returns false when columns are empty', () => {
    expect(QueryTokenValidate({
      statement: 'select',
      columns: [],
      fromTable: 'department'
    })).toBe(false)
  })

  it('returns false when fromTable is empty', () => {
    expect(QueryTokenValidate({
      statement: 'select',
      columns: ['*'],
      fromTable: ''
    })).toBe(false)
  })

  it('returns false for null input', () => {
    expect(QueryTokenValidate(null)).toBe(false)
  })

  it('returns false for undefined input', () => {
    expect(QueryTokenValidate(undefined)).toBe(false)
  })

  it('returns false when columns is not an array', () => {
    expect(QueryTokenValidate({
      statement: 'select',
      columns: 'name',
      fromTable: 'department'
    })).toBe(false)
  })
})
