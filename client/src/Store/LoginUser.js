import { combineReducers } from 'redux';

const parseJwt = (jwt) => {
    console.log("Parsing JWT");
    if(jwt === null){
        console.log("No token found")
        return null;
    }
    let claim = JSON.parse(atob(jwt.split('.')[1]));
    let today = new Date();
    if(today.getTime()/1000 < claim.exp){
        console.log("Valid token");
        return true;
    }
    console.log("Invalid token");
    return false;
}


const hasErrored = (state = false, action) => {
    switch (action.type) {
        case 'LOGIN_USER_ERRORED':
            return action.hasErrored;
        case 'LOGOUT_USER':
            return false;
        default:
            return state;
    }
}

const inProgress = (state = false, action) => {
    switch (action.type) {
        case 'LOGIN_USER_IN_PROGRESS':
            return action.inProgress;
        case 'LOGOUT_USER':
            return false;
        default:
            return state;
    }
}

const success = (state = false, action) => {
    if(parseJwt(localStorage.getItem('cricJwt')) != null){ //need to check if this jwt is valid by contacting the server, but for now we just check if it exists
        return true;
    }
    switch (action.type) {
        case 'LOGIN_USER_SUCCESS':
            return action.succeeded;
        case 'LOGOUT_USER':
            return false;
        default:
            return state;
    }
}


export default combineReducers({
    success,
    inProgress,
    hasErrored
});