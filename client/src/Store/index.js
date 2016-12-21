import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import UserLogin from './UserLogin'
import RegisterUser from './RegisterUser'
import Team from './Team'
import FetchSquad from './FetchSquad'
import createLogger from 'redux-logger';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();
const logger = createLogger();
const rootReducer = combineReducers({
	UserLogin,
	Team,
	FetchSquad,
	RegisterUser
});

export default createStore(
	rootReducer,
	applyMiddleware(thunk, logger)
	);
