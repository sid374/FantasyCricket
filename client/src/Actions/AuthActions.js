export const registerUser = (username, password) => {
	return{
		type: 'REGISTER_USER',
		username,
		password
	};
};

export const signInUser = (username, password) => {
	return{
		type: 'LOGIN_USER',
		username,
		password
	};
}
