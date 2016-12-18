export const registerUser = (username, password, email) => {
	return{
		type: 'REGISTER_USER',
		username,
		password,
		email
	};
};

export const signInUser = (username, password) => {
	return{
		type: 'LOGIN_USER',
		username,
		password
	};
}
