import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { useSimulation } from '../context/SimulationContext'

const useStyles = makeStyles({
  root: {
    margin: '40px auto',
  },
  card: {
    maxWidth: 400,
    margin: '0 auto'
  },
  h2: {
      fontSize: 30,
      textAlign: 'center',
      color: '#000'
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2vh',
    padding: '5px'
  },
})

const SimulationInfoCard = () => {
    const classes = useStyles()
    const { simulation } = useSimulation()

    return (
        <Container className={classes.root}>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Typography className={classes.h2} variant="h2" component="h2" color="secondary">
                        Simulation running
                    </Typography>
                    <strong>Query:</strong> {simulation.queryMetaData.query}
                </CardContent>
            </Card>
        </Container>
    )
}

export default SimulationInfoCard
