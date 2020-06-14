import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles({
    root: {
      maxWidth: 550,
      backgroundColor: '#424242',
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      margin: '10px',
      color: 'rgba(255, 255, 255, 0.7)'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    content: {
        textAlign: 'left'
    },
    querytype: {
      fontSize: 17
    },
    example: {
      marginBottom: 5
    }
});

export default function QueryExamplesCard () {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Typography variant="body2" component="p" className={classes.p}>
                    <div className={classes.example}><strong className={classes.querytype}>Table scan (linear search): </strong><span>select * from department</span></div>
                    <div className={classes.example}><strong className={classes.querytype}>Table scan ordered (binary search): </strong><span>select * from employee</span></div>
                    <div className={classes.example}><strong className={classes.querytype}>Index seek: </strong><span>select name, salary from employee where salary = 5000</span></div>
                    <div className={classes.example}><strong className={classes.querytype}>Index scan: </strong><span>select name, salary from employee where salary > 5000</span></div>
                    <div className={classes.example}><strong className={classes.querytype}>Join No Hash: </strong>select employee.id, employee.salary, department.cod_dep from Employee join Department on Department.cod_dep=Employee.capacity</div>
                    join using hash <br />
                    merge-join if both tables are tidy on primary key <br />
                    hashjoin if join condition is equals between both tables
                </Typography>
            </CardContent>
        </Card>
    )
}