import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import UserLogin from './UserLogin'
import Team from './Team'
import FetchSquad from './FetchSquad'
import createLogger from 'redux-logger';

const logger = createLogger();
const rootReducer = combineReducers({
	UserLogin,
	Team,
	FetchSquad
});

export default createStore(
	rootReducer,
	applyMiddleware(thunk, logger)
	);
