import { createStore, combineReducers } from 'redux';
import UserLogin from './UserLogin'
import Team from './Team'

const rootReducer = combineReducers({
	UserLogin,
	Team
});

export default createStore(rootReducer);
