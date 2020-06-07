import { initialState as InitialTablesContent } from '../simulation_data/InitialState'

const initialSimulationState = {
    isRunning: false,
    tables: InitialTablesContent,
    queryMetaData: {}
}

export const simulationReducer = (
    state = initialSimulationState,
    action
) => {
    switch(action.type) {
        case 'LOADQUERYMETADATA': {
            return {
                ...state,
                queryMetaData: action.queryMetaData,
                isRunning: true,
            }
        }

        default:
            return state
    }
}