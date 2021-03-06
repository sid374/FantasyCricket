import { combineReducers } from 'redux';


const hasErrored = (state = false, action) => {
    switch (action.type) {
        case 'GETSQUAD_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

const isLoading = (state = true, action) => {
    switch (action.type) {
        case 'GETSQUAD_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

const squad = (state = [], action) => {
    switch (action.type) {
        case 'GETSQUAD_FETCH_DATA_SUCCESS':
            return action.items;
        default:
            return state;
    }
}

const userSquad = (state = {}, action) => {
    let newState = {...state};
    switch(action.type){
        case 'GET_USER_SQUAD_FETCH_DATA_SUCCESS':
            newState[action.seriesId] = action.items;
            return newState;
        default:
            return state;
    }
}

export default combineReducers({
    userSquad,
    squad,
    isLoading,
    hasErrored
});