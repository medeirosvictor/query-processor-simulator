import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: 20,
        padding: '16px 0 4px',
        borderTop: '1px solid rgba(175, 85, 214, 0.15)',
    },
    title: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 12,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        marginBottom: 10,
    },
    example: {
        display: 'flex',
        alignItems: 'baseline',
        gap: 10,
        marginBottom: 8,
        padding: '6px 10px',
        borderRadius: 6,
        transition: 'background 0.2s',
        '&:hover': {
            background: 'rgba(175, 85, 214, 0.08)',
        },
    },
    tag: {
        fontSize: 10,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        color: theme.palette.primary.main,
        background: 'rgba(175, 85, 214, 0.12)',
        padding: '2px 8px',
        borderRadius: 4,
        whiteSpace: 'nowrap',
        flexShrink: 0,
    },
    query: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.7)',
        fontFamily: "'Roboto Mono', monospace",
        lineHeight: 1.5,
    },
}))

export default function QueryExamplesCard() {
    const classes = useStyles()

    const examples = [
        { tag: 'Scan', query: 'select * from department' },
        { tag: 'Full scan', query: 'select * from employee' },
        { tag: 'Filter =', query: 'select name, salario from employee where id = 1' },
        { tag: 'Filter >', query: 'select name, salario from employee where salario > 9000' },
        { tag: 'Join', query: 'select employee.id, employee.salario, department.cod_dep from employee join department on department.cod_dep=employee.capacity' },
    ]

    return (
        <div className={classes.root}>
            <Typography className={classes.title}>Example Queries</Typography>
            {examples.map((ex, i) => (
                <div key={i} className={classes.example}>
                    <span className={classes.tag}>{ex.tag}</span>
                    <span className={classes.query}>{ex.query}</span>
                </div>
            ))}
        </div>
    )
}
