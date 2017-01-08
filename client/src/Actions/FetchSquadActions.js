export function getSquadsErrored(bool, e) {
    if(bool == true)
        console.log(e);
    return {
        type: 'GETSQUAD_HAS_ERRORED',
        hasErrored: bool
    };
}

export function getSquadsIsLoading(bool) {
    return {
        type: 'GETSQUAD_IS_LOADING',
        isLoading: bool
    };
}

export function getSquadsFetchDataSuccess(items) {
    return {
        type: 'GETSQUAD_FETCH_DATA_SUCCESS',
        items
    };
}

export function getSquadsFetchData(url = '/squad', userToken) {
    return (dispatch) => {
        dispatch(getSquadsIsLoading(true));

        let authHeader = new Headers();
        authHeader.append("Authorization", "Bearer "+ userToken);
        fetch(url, {headers:authHeader})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((items) =>  dispatch(getSquadsFetchDataSuccess(items)))
            .then(() =>  dispatch(getSquadsIsLoading(false)))
            .catch((e) => {
                dispatch(getSquadsErrored(true, e))
            });
    };
}