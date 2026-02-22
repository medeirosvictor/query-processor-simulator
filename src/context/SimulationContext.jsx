import React, { createContext, useContext, useState } from 'react'

const SimulationContext = createContext()

export function SimulationProvider({ children }) {
  const [simulation, setSimulation] = useState({
    isRunning: false,
    queryMetaData: {},
  })

  const loadQueryMetaData = (queryMetaData) => {
    setSimulation({
      isRunning: true,
      queryMetaData,
    })
  }

  const resetSimulation = () => {
    setSimulation({
      isRunning: false,
      queryMetaData: {},
    })
  }

  return (
    <SimulationContext.Provider value={{ simulation, loadQueryMetaData, resetSimulation }}>
      {children}
    </SimulationContext.Provider>
  )
}

export function useSimulation() {
  const context = useContext(SimulationContext)
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider')
  }
  return context
}
