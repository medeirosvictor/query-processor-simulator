import React, { useState } from 'react';
import { LoadQueryMetaData } from '../actions/simulationActions'
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { QueryParse } from '../helpers/QueryParser'
import { QueryStringValidate, QueryTokenValidate } from '../helpers/QueryValidator'
import { TextField } from '@material-ui/core';
import QueryExamplesCard from './QueryExamplesCard'
import { Redirect } from 'react-router-dom';
import { BuildOperatorGraph } from '../helpers/OperatorGraphBuilder'

const useStyles = makeStyles({
  root: {
    maxWidth: 600,
    margin: '0 auto'
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2vh',
    padding: '5px'
  },
  button: {
    marginTop: '10px',
    height: '5vh',
    maxWidth: 200,
    fontSize: 13
  },
  input: {
    width: '90%'
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
});

export default function QueryFormCard() {
    //this object represents the classes that we defined 
    const classes = useStyles();
    //this hook allows us to access the dispatch function
    const dispatch = useDispatch();

    const [queryString, setQueryString] = useState("")
    const [queryErrorText, setQueryErrorText] = useState("")
    const [res, setRes] = useState()
    const isRunning = useSelector((state) => state.simulationState.isRunning)
    let queryMetaData

    //a function to dispatch multiple actions
    const getQuery = () => {
        if (QueryStringValidate(queryString)) {
            queryMetaData = QueryParse(queryString)
            if (QueryTokenValidate(queryMetaData)) {
                queryMetaData.elements = BuildOperatorGraph(queryMetaData)
                queryMetaData.response = []
                dispatch(LoadQueryMetaData(queryMetaData))
            } else {
                setQueryErrorText('Query Invalid')
            }
        } else {
            setQueryErrorText('Query Invalid')
        }

        fetch('http://localhost:8080/query', {
          method: 'POST',
          body: JSON.stringify({query: queryMetaData.query}),
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
          },
          mode: 'cors'
        }).then(function (response) {
          if (response.ok) {
            console.log(response)
            return response.json();
          }
          return Promise.reject(response);
        }).then(function (data) {
          console.log(data);
          setRes(data)
          queryMetaData.response = data
          dispatch(LoadQueryMetaData(queryMetaData))
        }).catch(function (error) {
          console.warn('Something went wrong.', error);
        })
    }

    const handleChange = (e) => {
        if (e.target.value === null || e.target.value === "" || e.target.value === " ") {
            return (
                console.log("query input cannot be empty!")
            )
        }
        setQueryString(e.target.value)
    }

    if (isRunning) {
        return (
            <Redirect to="/simulation"/>
        )
    }

  return (

    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <TextField 
          className={classes.input + " query-input"}
          label="Query Input"
          onChange={handleChange}
          variant="filled"
          error={queryErrorText === "Query Invalid"}
          helperText={queryErrorText === "Query Invalid" ? 'Query Invalid' : ' '}
          required></TextField>
        <Button onClick={() => getQuery()} className={classes.button} variant="contained" size="large" color="primary"> 
          Start Simulation
        </Button>
        <QueryExamplesCard />
      </CardContent>
    </Card>
  );
}