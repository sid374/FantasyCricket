import { combineReducers } from 'redux';


const submitTeamHasErrored = (state = false, action) => {
    switch (action.type) {
        case 'SUBMITTEAM_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

const submitTeamSuccessfull = (state = true, action) => {
    switch (action.type) {
        case 'SUBMITTEAM_SUCCESS':
            return action.status;
        default:
            return state;
    }
}


export default combineReducers({
    submitTeamHasErrored,
    submitTeamSuccessfull,
});