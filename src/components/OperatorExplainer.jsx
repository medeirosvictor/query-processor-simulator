import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import { useSimulation } from '../context/SimulationContext'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 700,
        margin: '20px auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
    },
    title: {
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        color: 'rgba(255, 255, 255, 0.4)',
        marginBottom: 4,
    },
    card: {
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(175, 85, 214, 0.2)',
        borderRadius: 10,
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
        transition: 'border-color 0.2s',
        '&:hover': {
            borderColor: 'rgba(175, 85, 214, 0.45)',
        },
    },
    symbolBadge: {
        minWidth: 48,
        height: 48,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 24,
        fontWeight: 700,
        flexShrink: 0,
    },
    selectionBadge: {
        background: 'rgba(129, 199, 132, 0.15)',
        color: '#81c784',
        border: '1px solid rgba(129, 199, 132, 0.3)',
    },
    projectionBadge: {
        background: 'rgba(100, 181, 246, 0.15)',
        color: '#64b5f6',
        border: '1px solid rgba(100, 181, 246, 0.3)',
    },
    joinBadge: {
        background: 'rgba(255, 183, 77, 0.15)',
        color: '#ffb74d',
        border: '1px solid rgba(255, 183, 77, 0.3)',
    },
    tableBadge: {
        background: 'rgba(175, 85, 214, 0.15)',
        color: '#d79ef5',
        border: '1px solid rgba(175, 85, 214, 0.3)',
        fontSize: 18,
    },
    content: {
        flex: 1,
    },
    opName: {
        fontSize: 14,
        fontWeight: 600,
        color: '#fff',
        marginBottom: 2,
    },
    opDetail: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.55)',
        fontFamily: "'Roboto Mono', monospace",
        marginBottom: 4,
    },
    opExplain: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.7)',
        lineHeight: 1.6,
    },
    highlight: {
        color: '#d79ef5',
        fontWeight: 500,
    },
    arrow: {
        textAlign: 'center',
        color: 'rgba(175, 85, 214, 0.4)',
        fontSize: 18,
        margin: '-4px 0',
    },
}))

export default function OperatorExplainer() {
    const classes = useStyles()
    const { simulation } = useSimulation()
    const meta = simulation.queryMetaData

    const steps = []

    // 1. Table source(s)
    steps.push({
        symbol: '📄',
        badgeClass: classes.tableBadge,
        name: 'Table Source',
        detail: meta.fromTable,
        explain: `The engine starts by reading all rows from the "${meta.fromTable}" table in memory. This is the base data that all subsequent operations will work on.`,
    })

    if (meta.joinTable) {
        steps.push({
            symbol: '📄',
            badgeClass: classes.tableBadge,
            name: 'Table Source (Join)',
            detail: meta.joinTable,
            explain: `A second table "${meta.joinTable}" is also loaded. Its rows will be combined with "${meta.fromTable}" in the join step.`,
        })
    }

    // 2. Join (if applicable)
    if (meta.joinTable) {
        steps.push({
            symbol: '⋈',
            badgeClass: classes.joinBadge,
            name: 'Join (⋈)',
            detail: `${meta.fromTable} ⋈ ${meta.joinTable} ON ${meta.joinCondition || '...'}`,
            explain: `The Join operator (⋈) combines rows from both tables where the join condition is met. Each row from "${meta.fromTable}" is matched with rows from "${meta.joinTable}" where the keys correspond. This is how relational databases link related data across tables.`,
        })
    }

    // 3. Selection
    const hasCondition = meta.conditional && meta.conditional !== ''
    steps.push({
        symbol: 'σ',
        badgeClass: classes.selectionBadge,
        name: 'Selection (σ)',
        detail: hasCondition ? `σ ${meta.conditional}` : 'σ all (no filter)',
        explain: hasCondition
            ? `The Selection operator (σ) filters rows based on the condition "${meta.conditional}". Only rows where this evaluates to true are kept. In SQL, this corresponds to the WHERE clause. Think of it as a row-level filter.`
            : `No WHERE clause was provided, so the Selection operator (σ) passes all rows through without filtering. Every row from the source table is included in the result.`,
    })

    // 4. Projection
    const isAllColumns = meta.columns.length === 1 && meta.columns[0] === '*'
    const colStr = meta.columns.join(', ')
    steps.push({
        symbol: 'Π',
        badgeClass: classes.projectionBadge,
        name: 'Projection (Π)',
        detail: isAllColumns ? 'Π * (all columns)' : `Π ${colStr}`,
        explain: isAllColumns
            ? `The Projection operator (Π) selects which columns to include. Since you used SELECT *, all columns are returned. In a real query optimizer, selecting only needed columns can significantly improve performance.`
            : `The Projection operator (Π) selects only the columns you requested: ${colStr}. Columns not listed are discarded from the result. This reduces the data returned and is how SELECT column lists work internally.`,
    })

    return (
        <div className={classes.root}>
            <Typography className={classes.title}>🧠 Step-by-Step Breakdown</Typography>
            {steps.map((step, i) => (
                <React.Fragment key={i}>
                    {i > 0 && <div className={classes.arrow}>↓</div>}
                    <div className={classes.card}>
                        <div className={`${classes.symbolBadge} ${step.badgeClass}`}>
                            {step.symbol}
                        </div>
                        <div className={classes.content}>
                            <Typography className={classes.opName}>{step.name}</Typography>
                            <Typography className={classes.opDetail}>{step.detail}</Typography>
                            <Typography className={classes.opExplain}>{step.explain}</Typography>
                        </div>
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}
