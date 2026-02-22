import { describe, it, expect } from 'vitest'
import { QueryParse } from '../QueryParser'

describe('QueryParse', () => {
  describe('noCondition queries', () => {
    it('parses select * from table', () => {
      const result = QueryParse('select * from department')
      expect(result.statement).toBe('select')
      expect(result.columns).toEqual(['*'])
      expect(result.fromTable).toBe('department')
      expect(result.query).toBe('select * from department')
    })

    it('parses select with specific columns', () => {
      const result = QueryParse('select name, cod_dep from department')
      expect(result.statement).toBe('select')
      expect(result.columns).toEqual(['name', 'cod_dep'])
      expect(result.fromTable).toBe('department')
    })
  })

  describe('case insensitivity', () => {
    it('handles uppercase SELECT FROM', () => {
      const result = QueryParse('SELECT * FROM department')
      expect(result.statement).toBe('select')
      expect(result.columns).toEqual(['*'])
      expect(result.fromTable).toBe('department')
      // Original query preserved for display
      expect(result.query).toBe('SELECT * FROM department')
    })

    it('handles mixed case', () => {
      const result = QueryParse('Select name From employee Where salary > 5000')
      expect(result.statement).toBe('select')
      expect(result.fromTable).toBe('employee')
      expect(result.conditional).toBe('salary > 5000')
    })
  })

  describe('withWhere queries', () => {
    it('parses select with where clause', () => {
      const result = QueryParse('select name, salary from employee where salary = 5000')
      expect(result.statement).toBe('select')
      expect(result.columns).toEqual(['name', 'salary'])
      expect(result.fromTable).toBe('employee')
      expect(result.conditional).toBe('salary = 5000')
    })

    it('parses where with greater than', () => {
      const result = QueryParse('select name, salary from employee where salary > 5000')
      expect(result.statement).toBe('select')
      expect(result.fromTable).toBe('employee')
      expect(result.conditional).toBe('salary > 5000')
    })

    it('does not crash on table with alias pattern', () => {
      // Previously this would crash because .push() was called on a string
      const result = QueryParse('select name from employee where salary > 5000')
      expect(result.fromTable).toBe('employee')
      expect(result.conditional).toBe('salary > 5000')
    })
  })

  describe('withJoin queries', () => {
    it('parses a basic join', () => {
      const result = QueryParse(
        'select employee.id, department.name from employee join department on department.cod_dep=employee.capacity'
      )
      expect(result.statement).toBe('select')
      expect(result.columns).toEqual(['employee.id', 'department.name'])
      expect(result.fromTable).toBe('employee')
      expect(result.joinTable).toBe('department')
      expect(result.on).toBe('department.cod_dep=employee.capacity')
    })

    it('parses join with where clause', () => {
      const result = QueryParse(
        'select employee.id from employee join department on department.cod_dep=employee.capacity where employee.id > 5'
      )
      expect(result.fromTable).toBe('employee')
      expect(result.joinTable).toBe('department')
      expect(result.on).toBe('department.cod_dep=employee.capacity')
      expect(result.conditional).toBe('employee.id > 5')
    })
  })

  describe('edge cases', () => {
    it('handles extra whitespace', () => {
      const result = QueryParse('  select  *  from  department  ')
      expect(result.statement).toBe('select')
      expect(result.columns).toEqual(['*'])
      expect(result.fromTable).toBe('department')
    })

    it('returns safe defaults for empty input', () => {
      const result = QueryParse('')
      expect(result.statement).toBe('')
      expect(result.columns).toEqual([])
      expect(result.fromTable).toBe('')
    })

    it('returns safe defaults for garbage input', () => {
      const result = QueryParse('select')
      expect(result.statement).toBe('select')
      expect(result.columns).toEqual([])
    })
  })
})
