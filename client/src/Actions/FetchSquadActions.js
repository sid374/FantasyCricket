export function getSquadsErrored(bool) {
    console.log("Error occured");
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function getSquadsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function getSquadsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function getSquadsFetchData(url = '/squad') {
    return (dispatch) => {
        dispatch(getSquadsIsLoading(true));
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((items) =>  dispatch(getSquadsFetchDataSuccess(items)))
            .then(() =>  dispatch(getSquadsIsLoading(false)))
            .catch(() => dispatch(getSquadsErrored(true)));
    };
}