import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import theme from '../theme';

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
    const employeesTable = useSelector((state: any) => state.simulationState.tables[1].content)

    return (
        <TableContainer className={classes.table} component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead className={classes.header}>
                    <TableRow>
                        <TableCell className={classes.headerCell}>id</TableCell>
                        <TableCell className={classes.headerCell}>name</TableCell>
                        <TableCell className={classes.headerCell}>salary</TableCell>
                        <TableCell className={classes.headerCell}>capacity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {employeesTable.map((row: { name: string; id: Number ; salario: Number; capacity: Number}) => (
                    <TableRow key={row.name+"::"+row.capacity.toString()}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.salario}</TableCell>
                        <TableCell>{row.capacity}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}