const defaultState = {
	isLoggedIn: false
}

const UserLogin = (state = defaultState, action) => {
	switch(action.type){
		case 'REGISTER_USER':
			return state;
		case 'LOGIN_USER':
			return {
				...state,
				isLoggedIn : true,
				username: action.username,
			};
		default:
			return {isLoggedIn: false};
	}
}

export default UserLogin