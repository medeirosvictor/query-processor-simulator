import { describe, it, expect } from 'vitest'
import { executeQuery } from '../QueryEngine'

describe('executeQuery', () => {
  describe('select * (no condition)', () => {
    it('returns all rows from departments', () => {
      const result = executeQuery({
        fromTable: 'department',
        columns: ['*'],
      })
      expect(result.length).toBe(20)
      expect(result[0]).toHaveProperty('cod_dep')
      expect(result[0]).toHaveProperty('name')
    })

    it('returns all rows from employees', () => {
      const result = executeQuery({
        fromTable: 'employee',
        columns: ['*'],
      })
      expect(result.length).toBe(10000)
      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('name')
      expect(result[0]).toHaveProperty('salario')
    })

    it('returns empty for unknown table', () => {
      const result = executeQuery({
        fromTable: 'nonexistent',
        columns: ['*'],
      })
      expect(result).toEqual([])
    })
  })

  describe('WHERE clause', () => {
    it('filters with equality', () => {
      const result = executeQuery({
        fromTable: 'employee',
        columns: ['*'],
        conditional: 'id = 1',
      })
      expect(result.length).toBe(1)
      expect(result[0].name).toBe('Rogan Saunders')
    })

    it('filters with greater than on numeric string', () => {
      const result = executeQuery({
        fromTable: 'employee',
        columns: ['*'],
        conditional: 'salario > 9900',
      })
      expect(result.length).toBeGreaterThan(0)
      result.forEach(row => {
        expect(Number(row.salario)).toBeGreaterThan(9900)
      })
    })

    it('filters with less than', () => {
      const result = executeQuery({
        fromTable: 'employee',
        columns: ['*'],
        conditional: 'salario < 1100',
      })
      expect(result.length).toBeGreaterThan(0)
      result.forEach(row => {
        expect(Number(row.salario)).toBeLessThan(1100)
      })
    })
  })

  describe('column projection', () => {
    it('projects specific columns', () => {
      const result = executeQuery({
        fromTable: 'employee',
        columns: ['name', 'salario'],
        conditional: 'id = 1',
      })
      expect(result.length).toBe(1)
      expect(Object.keys(result[0])).toEqual(['name', 'salario'])
      expect(result[0].name).toBe('Rogan Saunders')
    })

    it('handles table.column syntax', () => {
      const result = executeQuery({
        fromTable: 'department',
        columns: ['department.name'],
      })
      expect(result.length).toBe(20)
      expect(Object.keys(result[0])).toEqual(['name'])
    })
  })

  describe('JOIN', () => {
    it('joins employee and department on capacity=cod_dep', () => {
      const result = executeQuery({
        fromTable: 'employee',
        joinTable: 'department',
        columns: ['*'],
        on: 'department.cod_dep=employee.capacity',
      })
      // Every employee has a capacity matching a department cod_dep
      expect(result.length).toBeGreaterThan(0)
      // Joined rows should have fields from both tables
      expect(result[0]).toHaveProperty('id')
      expect(result[0]).toHaveProperty('cod_dep')
    })

    it('join with column projection', () => {
      const result = executeQuery({
        fromTable: 'employee',
        joinTable: 'department',
        columns: ['employee.id', 'department.cod_dep'],
        on: 'department.cod_dep=employee.capacity',
      })
      expect(result.length).toBeGreaterThan(0)
      expect(Object.keys(result[0]).sort()).toEqual(['cod_dep', 'id'])
    })
  })
})
