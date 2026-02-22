import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import { TextField, Typography } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import { QueryParse } from '../helpers/QueryParser'
import { QueryStringValidate, QueryTokenValidate } from '../helpers/QueryValidator'
import { BuildOperatorGraph } from '../helpers/OperatorGraphBuilder'
import { executeQuery } from '../helpers/QueryEngine'
import { useSimulation } from '../context/SimulationContext'
import QueryExamplesCard from './QueryExamplesCard'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 640,
    margin: '0 auto',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(175, 85, 214, 0.3)',
    borderRadius: 12,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px 24px 16px',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 12,
  },
  input: {
    width: '100%',
    '& .MuiFilledInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      borderRadius: 8,
      color: '#fff',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
      },
      '&.Mui-focused': {
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255, 255, 255, 0.5)',
    },
    '& .MuiFilledInput-underline:before': {
      borderBottomColor: 'rgba(175, 85, 214, 0.3)',
    },
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: theme.palette.primary.main,
    },
  },
  button: {
    marginTop: 16,
    height: 44,
    minWidth: 200,
    fontSize: 14,
    fontWeight: 600,
    borderRadius: 8,
    textTransform: 'none',
    boxShadow: '0 2px 12px rgba(175, 85, 214, 0.3)',
    '&:hover': {
      boxShadow: '0 4px 20px rgba(175, 85, 214, 0.5)',
    },
  },
}))

export default function QueryFormCard() {
    const classes = useStyles()
    const { simulation, loadQueryMetaData } = useSimulation()

    const [queryString, setQueryString] = useState("")
    const [queryErrorText, setQueryErrorText] = useState("")

    const getQuery = () => {
        setQueryErrorText('')

        if (!QueryStringValidate(queryString)) {
            setQueryErrorText('Query Invalid — must start with SELECT')
            return
        }

        const queryMetaData = QueryParse(queryString)

        if (!QueryTokenValidate(queryMetaData)) {
            setQueryErrorText('Query Invalid — check your columns and table name')
            return
        }

        queryMetaData.elements = BuildOperatorGraph(queryMetaData)
        queryMetaData.response = executeQuery(queryMetaData)

        loadQueryMetaData(queryMetaData)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            getQuery()
        }
    }

    if (simulation.isRunning) {
        return <Redirect to="/simulation" />
    }

    return (
        <Card className={classes.root} elevation={0}>
            <CardContent className={classes.content}>
                <Typography className={classes.label}>
                    Enter a SQL query to simulate
                </Typography>
                <TextField
                    className={classes.input}
                    label="e.g. select * from employee where salario > 5000"
                    onChange={(e) => setQueryString(e.target.value)}
                    onKeyPress={handleKeyPress}
                    variant="filled"
                    error={queryErrorText !== ''}
                    helperText={queryErrorText || ' '}
                    required
                    fullWidth
                />
                <Button
                    onClick={getQuery}
                    className={classes.button}
                    variant="contained"
                    size="large"
                    color="primary"
                >
                    Run Simulation
                </Button>
                <QueryExamplesCard />
            </CardContent>
        </Card>
    )
}
