import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import QueryFormCard from '../components/QueryFormCard';
import { Container } from '@material-ui/core';
import DepartmentsTable from '../components/DepartmentsTable';
import EmployeesTable from '../components/EmployeesTable';
import DependentsTable from '../components/DependentsTable';


const useStyles = makeStyles({
  root: {
    textAlign: "center",
    height: '100vh'
  },
  h1: {
      fontSize: 40,
      margin: '15px auto'
  },
  tablesContainer: {
      display: 'flex',
      flexWrap: 'wrap'
  },
  queryCardsContainer: {
    display: 'flex',
    justifyContent: 'space-around'
  },
});

const HomePage = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
        <QueryFormCard />
        <div className={classes.tablesContainer}>
          {/* <DepartmentsTable/>
          <EmployeesTable/>
          <DependentsTable/> */}
        </div>
    </Container>
  );
}

export default HomePage;