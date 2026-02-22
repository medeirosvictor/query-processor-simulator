import React from 'react'
import { makeStyles } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    wrapper: {
        maxWidth: 600,
        margin: '12px auto',
        maxHeight: 550,
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid rgba(175, 85, 214, 0.25)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
        backgroundColor: '#2a2030',
    },
    label: {
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: 1.2,
        color: 'rgba(255, 255, 255, 0.4)',
        padding: '12px 16px 4px',
    },
    tableContainer: {
        maxHeight: 510,
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
    header: {
        backgroundColor: 'rgba(175, 85, 214, 0.2)',
    },
    headerCell: {
        color: '#d79ef5',
        fontWeight: 700,
        fontSize: 13,
        borderBottom: '1px solid rgba(175, 85, 214, 0.3)',
        whiteSpace: 'nowrap',
    },
    bodyCell: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 13,
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    },
    bodyRow: {
        transition: 'background 0.15s',
        '&:hover': {
            backgroundColor: 'rgba(175, 85, 214, 0.08)',
        },
    },
    count: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.35)',
        padding: '6px 16px 10px',
    },
    empty: {
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.5)',
        padding: 40,
        fontSize: 14,
    },
}))

export default function ResultsTable(props) {
    const classes = useStyles()
    const res = props.table

    if (res.length > 0) {
        const keys = Object.keys(res[0])
        const displayRows = res.slice(0, 1000)

        return (
            <div className={classes.wrapper}>
                <Typography className={classes.label}>Query Results</Typography>
                <TableContainer className={classes.tableContainer} component={Paper}>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow className={classes.header}>
                                {keys.map((key) => (
                                    <TableCell key={key} className={classes.headerCell}>
                                        {key}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayRows.map((row, index) => (
                                <TableRow key={`row-${index}`} className={classes.bodyRow}>
                                    {keys.map((key) => (
                                        <TableCell key={`${index}-${key}`} className={classes.bodyCell}>
                                            {row[key]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography className={classes.count}>
                    Showing {displayRows.length} of {res.length} rows
                </Typography>
            </div>
        )
    }

    return (
        <div className={classes.empty}>
            No results found for this query.
        </div>
    )
}
