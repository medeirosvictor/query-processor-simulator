# Query Processor Simulator

## Project Overview

A fully client-side educational tool that simulates a database query processor. Users enter SQL-like queries (SELECT with WHERE/JOIN), the frontend parses them into tokens, builds a relational algebra operator graph (σ selection, Π projection) visualized using `react-flow-renderer`, and executes the query against in-memory seed data (departments, employees, dependents) via a built-in query engine. Results are displayed in a dynamic table.

## Key Files

| Path | Purpose |
|------|---------|
| `index.html` | Vite entry HTML (root level) |
| `vite.config.js` | Vite configuration (React plugin, port 3000) |
| `src/main.jsx` | App entry point (React render, SimulationProvider, Router, Theme) |
| `src/context/SimulationContext.jsx` | React Context for simulation state (`isRunning`, `queryMetaData`) |
| `src/App.jsx` | Root component, routes `/` → HomePage, `/simulation` → SimulationPage |
| `src/pages/HomePage.jsx` | Landing page with the query input form |
| `src/pages/SimulationPage.jsx` | Shows operator graph + results; redirects home if no simulation running |
| `src/helpers/QueryParser.js` | Tokenizes SQL string → `queryMetaData` (statement, columns, table, conditional, join info) |
| `src/helpers/QueryValidator.js` | Validation — checks for `select` and non-empty columns/table |
| `src/helpers/OperatorGraphBuilder.js` | Converts `queryMetaData` into react-flow nodes/edges for the operator graph |
| `src/helpers/QueryEngine.js` | Client-side query engine — executes parsed queries against in-memory seed data (SELECT, WHERE, JOIN, projection) |
| `src/components/QueryFormCard.jsx` | Query input card — orchestrates parse → validate → build graph → execute → set state |
| `src/components/GraphOperatorSection.jsx` | Renders the `ReactFlow` operator graph |
| `src/components/ResultsTable.jsx` | Dynamic table rendering query results |
| `src/components/QueryExamplesCard.jsx` | Shows example queries (table scan, filters, join) |
| `src/components/SimulationInfoCard.jsx` | Displays the currently running query |
| `src/components/{Departments,Employees,Dependents}Table.jsx` | Static table components (currently commented out in HomePage) |
| `src/simulation_data/*.json` | Seed data: departments (20 rows), employees (10K rows), dependents (3K rows) |
| `src/theme.js` | Material UI theme (purple primary, dark background) |

## Pipeline / Architecture

```
User enters SQL query
        ↓
QueryFormCard.jsx
  1. QueryStringValidate() — checks string contains "select"
  2. QueryParse() — tokenizes into queryMetaData
  3. QueryTokenValidate() — validates tokens
  4. BuildOperatorGraph() — creates react-flow elements
  5. executeQuery() — runs query against in-memory seed data
  6. loadQueryMetaData() — updates SimulationContext
        ↓
SimulationPage renders:
  - SimulationInfoCard (shows query)
  - GraphOperatorSection (react-flow operator graph)
  - ResultsTable (query results)
```

State management: React Context (`SimulationContext`) with `useState`. Tracks `isRunning` flag and `queryMetaData` (parsed query + graph elements + query results).

## Tech Stack

- **Language:** JavaScript (React 16)
- **UI:** Material UI v4 (`@material-ui/core`)
- **Graph Visualization:** `react-flow-renderer` v3
- **State Management:** React Context
- **Routing:** React Router DOM v5
- **Linting:** ESLint (Airbnb + Prettier config), no semicolons
- **Build:** Vite 6 with @vitejs/plugin-react
- **Query Engine:** Client-side, in-memory (no backend required)
- **Package Manager:** pnpm (pnpm-lock.yaml)

## Conventions

- Functional components with hooks (`useState`, `useContext`)
- `makeStyles` for component-scoped CSS-in-JS
- No semicolons (Prettier config: `"semi": false`)
- `.jsx` extension for files containing JSX, `.js` for pure logic
- PascalCase component files, camelCase helper files
- Unit tests with Vitest in `src/helpers/__tests__/`

## How to Run

```bash
# Install dependencies
pnpm install

# Start Vite dev server (port 3000)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test

# Lint
pnpm lint

# No backend required — queries run against in-memory seed data
```
