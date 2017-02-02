export const addPlayerToTeam = (player, seriesId) => {
	return{
		type: 'ADD_PLAYER',
		player,
		seriesId
	};
};

export const removePlayerFromTeam = (player, seriesId) => {
	return{
		type: 'REMOVE_PLAYER',
		player,
		seriesId
	};
}

//items is the array of players
export function getUserTeamsFetchDataSuccess(items, seriesId) {
    return {
        type: 'GET_USER_TEAM_FETCH_DATA_SUCCESS',
        items,
        seriesId
    };
}

export function getUserTeamsFetchData(seriesId, userToken) { //url = '/userSquad',
    return (dispatch) => {
        let authHeader = new Headers();
        authHeader.append("Authorization", "Bearer "+ userToken);
        fetch('/userSquad/'+seriesId, {headers:authHeader})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json()) //what if response is empty?
            .then((items) =>  dispatch(getUserTeamsFetchDataSuccess(items, seriesId)))
            .catch((e) => {
                dispatch(getUserTeamsFetchDataSuccess(null, seriesId))
            });
    };
}