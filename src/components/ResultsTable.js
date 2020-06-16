import React from 'react'
import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import theme from '../theme';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        maxWidth: 600,
        margin: "10px auto",
        maxHeight: 550
    },
    header: {
        backgroundColor: theme.palette.common.black,
    },
    headerCell: {
        color: theme.palette.common.white,
    },
})

export default function ResultsTable(props) {
    const classes = useStyles()
    const res = props.table


        if (res.length > 0) {
            const keys = Object.keys(res[0])

            const HCells = keys.map(function(key) {
                    return (
                        <TableCell component="th" scope="row" className={classes.headerCell}>
                            {key}
                        </TableCell>
                    )
            })
            
            const BRows = res.map(function (row, index) {
                if(index < 1000) {
                    const b = keys.map(function(key) {
                        return (
                            <TableCell component="th" scope="row">
                                {row[key]}
                            </TableCell>
                        )
                    })

                    return (
                        <TableRow key={Math.random() + "carambaaa"}>
                            {b}
                        </TableRow>
                    )
                }
            })


            debugger
            return (
            <TableContainer className={classes.table} component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow key={Math.random() + "carambaaa"} className={classes.header}>
                            {
                             HCells
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {BRows}
                    </TableBody>
                </Table>
            </TableContainer>

            )
    } else {
        return (
            <div>
                ayy nothign ehre mat
            </div>
        )
    }
}