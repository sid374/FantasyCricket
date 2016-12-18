const defaultState = {
	isLoggedIn: false
}

const UserLogin = (state = defaultState, action) => {
	switch(action.type){
		case 'REGISTER_USER':
			console.log("Registering user!");
			return state;
		case 'LOGIN_USER':
			console.log("User signed in!");
			return {
				...state,
				isLoggedIn : true,
				username: action.username,
			};
		default:
			console.log("returning default state"+state.isLoggedIn+' '+action);
			return {isLoggedIn: false};
	}
}

export default UserLogin