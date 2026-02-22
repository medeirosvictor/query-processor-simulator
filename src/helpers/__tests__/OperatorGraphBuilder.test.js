import { describe, it, expect } from 'vitest'
import { BuildOperatorGraph } from '../OperatorGraphBuilder'

describe('BuildOperatorGraph', () => {
  describe('noCondition query (select * from table)', () => {
    it('builds correct nodes and edges', () => {
      const meta = {
        fromTable: 'department',
        columns: ['*'],
        conditional: undefined,
      }
      const elements = BuildOperatorGraph(meta)

      // Should have: 1 table node + 1 σ node + 1 Π node + 2 edges = 5
      expect(elements).toHaveLength(5)

      // Table node
      expect(elements[0].id).toBe('0')
      expect(elements[0].data.label).toBe('department')

      // σ node — should show "σ all" when columns is * or conditional is undefined
      expect(elements[1].data.label).toBe('σ all')

      // Π node — conditional is undefined so it falls to else branch, shows columns
      expect(elements[2].data.label).toBe('Π *')

      // Edges: 0→1, 1→2
      expect(elements[3]).toMatchObject({ source: '0', target: '1' })
      expect(elements[4]).toMatchObject({ source: '1', target: '2' })
    })
  })

  describe('withWhere query (select cols from table where ...)', () => {
    it('builds correct nodes with conditional', () => {
      const meta = {
        fromTable: 'employee',
        columns: ['name', 'salary'],
        conditional: 'salary > 5000',
      }
      const elements = BuildOperatorGraph(meta)

      // 1 table + 1 σ + 1 Π + 2 edges = 5
      expect(elements).toHaveLength(5)

      // σ node shows the conditional
      expect(elements[1].data.label).toBe('σ salary > 5000')

      // Π node shows the projected columns
      expect(elements[2].data.label).toBe('Π name, salary')
    })
  })

  describe('withJoin query', () => {
    it('builds correct nodes and edges for a join', () => {
      const meta = {
        fromTable: 'employee',
        joinTable: 'department',
        columns: ['employee.id', 'department.name'],
        conditional: undefined,
        on: 'department.cod_dep=employee.capacity',
      }
      const elements = BuildOperatorGraph(meta)

      // 2 table nodes + 1 σ + 1 Π + 3 edges = 7
      expect(elements).toHaveLength(7)

      // Table nodes
      expect(elements[0].data.label).toBe('employee')
      expect(elements[1].data.label).toBe('department')

      // σ node — no conditional, so "σ all"
      expect(elements[2].data.label).toBe('σ all')

      // Edges for join: 0→2, 1→2, 2→3
      expect(elements[4]).toMatchObject({ source: '0', target: '2' })
      expect(elements[5]).toMatchObject({ source: '1', target: '2' })
      expect(elements[6]).toMatchObject({ source: '2', target: '3' })
    })
  })

  describe('logical OR fix (was bitwise |)', () => {
    it('shows σ all when columns is * regardless of conditional', () => {
      const meta = {
        fromTable: 'department',
        columns: ['*'],
        conditional: 'id > 5',
      }
      const elements = BuildOperatorGraph(meta)
      // Even though conditional exists, columns[0] === '*' should trigger "σ all"
      expect(elements[1].data.label).toBe('σ all')
    })

    it('shows σ with conditional when columns is not *', () => {
      const meta = {
        fromTable: 'employee',
        columns: ['name'],
        conditional: 'salary > 5000',
      }
      const elements = BuildOperatorGraph(meta)
      expect(elements[1].data.label).toBe('σ salary > 5000')
    })
  })
})
