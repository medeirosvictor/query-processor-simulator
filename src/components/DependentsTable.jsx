import React from 'react'
import { makeStyles } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import theme from '../theme'
import dependents from '../simulation_data/dependents.json'

const useStyles = makeStyles({
    table: {
        maxWidth: 400,
        margin: "30px auto",
        maxHeight: 400
    },
    header: {
        backgroundColor: theme.palette.common.black,
    },
    headerCell: {
        color: theme.palette.common.white,
    }
})

export default function DependentsTable() {
    const classes = useStyles()

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow className={classes.header}>
                        <TableCell className={classes.headerCell}>name</TableCell>
                        <TableCell className={classes.headerCell}>id_resp</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {dependents.map((row, index) => (
                    <TableRow key={`${row.id_resp}-${index}`}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell>{row.id_resp}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
