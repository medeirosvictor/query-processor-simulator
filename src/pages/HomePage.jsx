import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Card, CardContent, Chip } from '@material-ui/core'
import QueryFormCard from '../components/QueryFormCard'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 800,
        margin: '0 auto',
        padding: '16px 16px 40px',
    },
    intro: {
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 1.7,
        fontSize: 15,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 500,
        marginBottom: 12,
        marginTop: 28,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    sectionIcon: {
        color: theme.palette.primary.main,
        fontSize: 22,
    },
    conceptGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 12,
        marginBottom: 24,
    },
    conceptCard: {
        backgroundColor: 'rgba(175, 85, 214, 0.08)',
        border: '1px solid rgba(175, 85, 214, 0.2)',
        borderRadius: 8,
        transition: 'border-color 0.2s',
        '&:hover': {
            borderColor: 'rgba(175, 85, 214, 0.5)',
        },
    },
    conceptTitle: {
        color: theme.palette.primary.main,
        fontSize: 15,
        fontWeight: 600,
        marginBottom: 4,
    },
    conceptBody: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 13,
        lineHeight: 1.5,
    },
    symbol: {
        fontWeight: 700,
        color: '#fff',
        marginRight: 4,
    },
    tablesSection: {
        marginTop: 20,
        marginBottom: 24,
    },
    tableChips: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        marginTop: 8,
    },
    chip: {
        backgroundColor: 'rgba(175, 85, 214, 0.15)',
        color: '#fff',
        border: '1px solid rgba(175, 85, 214, 0.3)',
    },
    howItWorks: {
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: '16px 20px',
        marginBottom: 28,
    },
    step: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 14,
        marginBottom: 6,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
    },
    stepNumber: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        borderRadius: '50%',
        minWidth: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 700,
        flexShrink: 0,
    },
    divider: {
        height: 1,
        background: 'linear-gradient(to right, transparent, rgba(175, 85, 214, 0.3), transparent)',
        margin: '20px 0',
    },
}))

const HomePage = () => {
    const classes = useStyles()

    return (
        <Container className={classes.root}>
            <Typography className={classes.intro}>
                This simulator helps you understand how a database query processor works internally.
                Enter a SQL query and watch it get broken down into <strong style={{ color: '#af55d6' }}>relational algebra operators</strong> — the same way a real database engine plans and executes your queries.
            </Typography>

            <QueryFormCard />

            <div className={classes.divider} />

            <Typography className={classes.sectionTitle}>
                <span className={classes.sectionIcon}>⚡</span> How It Works
            </Typography>
            <div className={classes.howItWorks}>
                <div className={classes.step}>
                    <span className={classes.stepNumber}>1</span>
                    <span>You write a SQL <code>SELECT</code> query in the input above</span>
                </div>
                <div className={classes.step}>
                    <span className={classes.stepNumber}>2</span>
                    <span>The <strong>parser</strong> breaks it into tokens — identifying the statement, columns, tables, and conditions</span>
                </div>
                <div className={classes.step}>
                    <span className={classes.stepNumber}>3</span>
                    <span>A <strong>relational algebra graph</strong> is built showing the execution plan with σ (selection) and Π (projection) operators</span>
                </div>
                <div className={classes.step}>
                    <span className={classes.stepNumber}>4</span>
                    <span>The <strong>query engine</strong> executes your query against the in-memory database and returns the results</span>
                </div>
            </div>

            <Typography className={classes.sectionTitle}>
                <span className={classes.sectionIcon}>📖</span> Relational Algebra Concepts
            </Typography>
            <div className={classes.conceptGrid}>
                <Card className={classes.conceptCard} elevation={0}>
                    <CardContent>
                        <Typography className={classes.conceptTitle}>
                            <span className={classes.symbol}>σ</span> Selection
                        </Typography>
                        <Typography className={classes.conceptBody}>
                            Filters rows based on a condition. Like the <code>WHERE</code> clause — only rows matching the predicate pass through.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={classes.conceptCard} elevation={0}>
                    <CardContent>
                        <Typography className={classes.conceptTitle}>
                            <span className={classes.symbol}>Π</span> Projection
                        </Typography>
                        <Typography className={classes.conceptBody}>
                            Picks specific columns from the result. When you write <code>SELECT name, salario</code> instead of <code>SELECT *</code>, that is a projection.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={classes.conceptCard} elevation={0}>
                    <CardContent>
                        <Typography className={classes.conceptTitle}>
                            <span className={classes.symbol}>⋈</span> Join
                        </Typography>
                        <Typography className={classes.conceptBody}>
                            Combines rows from two tables based on a matching condition. The <code>JOIN ... ON</code> clause links related data together.
                        </Typography>
                    </CardContent>
                </Card>
            </div>

            <Typography className={classes.sectionTitle}>
                <span className={classes.sectionIcon}>🗄️</span> Available Tables
            </Typography>
            <div className={classes.tablesSection}>
                <Typography className={classes.conceptBody} style={{ color: 'rgba(255,255,255,0.7)', marginBottom: 8, fontSize: 14 }}>
                    The simulator has three in-memory tables you can query:
                </Typography>
                <div className={classes.tableChips}>
                    <Chip className={classes.chip} label="department — cod_dep, name (20 rows)" variant="outlined" />
                    <Chip className={classes.chip} label="employee — id, name, salario, capacity (10,000 rows)" variant="outlined" />
                    <Chip className={classes.chip} label="dependent — id_resp, name (3,000 rows)" variant="outlined" />
                </div>
                <Typography className={classes.conceptBody} style={{ color: 'rgba(255,255,255,0.5)', marginTop: 10, fontSize: 13 }}>
                    The <code>capacity</code> field in employees links to <code>cod_dep</code> in departments — use this for JOIN queries.
                </Typography>
            </div>
        </Container>
    )
}

export default HomePage
