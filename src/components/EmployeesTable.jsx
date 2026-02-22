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
import employees from '../simulation_data/employees.json'

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

export default function EmployeesTable() {
    const classes = useStyles()

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead className={classes.header}>
                    <TableRow>
                        <TableCell className={classes.headerCell}>id</TableCell>
                        <TableCell className={classes.headerCell}>name</TableCell>
                        <TableCell className={classes.headerCell}>salario</TableCell>
                        <TableCell className={classes.headerCell}>capacity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {employees.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.id}
                        </TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.salario}</TableCell>
                        <TableCell>{row.capacity}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
