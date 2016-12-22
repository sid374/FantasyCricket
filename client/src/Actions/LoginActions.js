export const loginUserInProgress = (inProgress) => {
	return{
		type: 'LOGIN_USER_IN_PROGRESS',
		inProgress 
	};
};

export const loginUserFailed = (hasErrored) => {
	return{
		type: 'LOGIN_USER_ERRORED',
		hasErrored
	};
};

export const loginUserSuccess = (succeeded) => {
	return{
		type: 'LOGIN_USER_SUCCESS',
		succeeded
	};
};

export const loginUserReturnToDefaults = () =>{
	return{
		type: 'LOGIN_USER_RETURN_TO_DEFAULT'
	}
}

export const logout = () => {
	return {
			type: 'LOGOUT_USER'
		};
}

export const logoutUser = () => {
	return (dispatch) => {
		localStorage.removeItem('cricJwt');
		dispatch(logout());
	};
}

export function loginUser(username, password) {
    return (dispatch) => {
        dispatch(loginUserInProgress(true));
		fetch('/login', {
			method: 'post',
			headers: {
			    "Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				password: password,
			})
		})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((jsonResponse) =>  {
            	localStorage.setItem('cricJwt', jsonResponse.token)
            	console.log(localStorage['cricJwt']);
            })
            .then(() => dispatch(loginUserSuccess(true)))
            .then(() =>  dispatch(loginUserFailed(false)))
            .then(() =>  dispatch(loginUserInProgress(false)))
            .catch(() => {
            	dispatch(loginUserInProgress(false));
            	dispatch(loginUserSuccess(false));
            	dispatch(loginUserFailed(true));
        	});
    };
}