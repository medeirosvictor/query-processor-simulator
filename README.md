# Query Processor Simulator

A fully client-side interactive tool that simulates how a database query processor works. Enter SQL queries and see the relational algebra operator graph (σ selection, Π projection) visualized in real time, alongside query results executed against in-memory seed data. No backend required.

## Features

- **SQL Query Input** — supports `SELECT`, `WHERE`, and `JOIN` queries
- **Operator Graph Visualization** — renders the query execution plan as an interactive node graph
- **Client-side Query Engine** — executes queries against in-memory seed data (10K employees, 20 departments, 3K dependents)
- **Results Table** — displays query results in a dynamic table
- **Example Queries** — built-in examples for table scans, index seeks, index scans, and joins

## Tech Stack

- React 16 + Redux + React Router
- Material UI v4
- react-flow-renderer (operator graph)
- Vite (build tool)

## Getting Started

### Prerequisites

- Node.js (v16+)
- pnpm

### Install & Run

```bash
# Install dependencies
pnpm install

# Start the dev server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Preview the production build
pnpm preview

# Run tests
pnpm test

# Lint
pnpm lint
```

## Example Queries

| Type | Query |
|------|-------|
| Table scan (linear) | `select * from department` |
| Table scan (ordered) | `select * from employee` |
| Index seek | `select name, salario from employee where salario = 5000` |
| Index scan | `select name, salario from employee where salario > 5000` |
| Join | `select employee.id, employee.salario, department.cod_dep from employee join department on department.cod_dep=employee.capacity` |

## Project Structure

```
src/
├── actions/          # Redux actions
├── components/       # React UI components
├── helpers/          # Query parser, validator, graph builder, query engine
├── pages/            # HomePage, SimulationPage
├── reducers/         # Redux reducers
├── simulation_data/  # Seed data (departments, employees, dependents)
├── store/            # Redux store configuration
├── main.jsx          # App entry point
└── theme.js          # Material UI theme
```
