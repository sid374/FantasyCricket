export const registerUserInProgress = (inProgress) => {
	return{
		type: 'REGISTER_USER_IN_PROGRESS',
		inProgress 
	};
};

export const registerUserErrored = (hasErrored) => {
	return{
		type: 'REGISTER_USER_ERRORED',
		hasErrored
	};
};

export const registerUserSuccess = (succeeded) => {
	return{
		type: 'REGISTER_USER_SUCCESS',
		succeeded
	};
};

export const registerUserReturnToDefaults = () =>{
	return{
		type: 'REGISTER_USER_RETURN_TO_DEFAULT',
	}
}

export function registerUser(username, password, email) {
    return (dispatch) => {
        dispatch(registerUserInProgress(true));
		fetch('/register', {
			method: 'post',
			headers: {
			    "Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				email: email,
				password: password
			})
		})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => dispatch(registerUserSuccess(true)))
            .then(() =>  dispatch(registerUserInProgress(false)))
            .catch(() => dispatch(registerUserErrored(true)));
    };
}

export const signInUser = (username, password) => {
	return{
		type: 'LOGIN_USER',
		username,
		password
	};
}
