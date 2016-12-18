import { createStore, combineReducers } from 'redux';
import UserLogin from './UserLogin'

const rootReducer = combineReducers({
	UserLogin
});

export default createStore(rootReducer);
