import { combineReducers } from 'redux';


const hasErrored = (state = false, action) => {
    switch (action.type) {
        case 'LOGIN_USER_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

const inProgress = (state = false, action) => {
    switch (action.type) {
        case 'LOGIN_USER_IN_PROGRESS':
            return action.inProgress;
        default:
            return state;
    }
}

const success = (state = false, action) => {
    switch (action.type) {
        case 'LOGIN_USER_SUCCESS':
            return action.succeeded;
        default:
            return state;
    }
}

export default combineReducers({
    success,
    inProgress,
    hasErrored
});