export function submitTeamErrored(bool, e) {
    if(bool == true)
        console.log(e);
    return {
        type: 'SUBMITTEAM_HAS_ERRORED',
        hasErrored: bool
    };
}

export function submitTeamSuccess(bool) {
    return {
        type: 'SUBMITTEAM_SUCCESS',
        status: bool
    };
}

export function submitTeam(seriesId, squad, userToken) {
	debugger;
	let squadPids = squad.map(function(player){
		return player['_id'];
	})
	console.log("In submit team");
    return (dispatch) => {
        let authHeader = new Headers();
        authHeader.append("Authorization", "Bearer "+ userToken);
        authHeader.append("Content-Type", "application/json");
        fetch('/userSquad/'+seriesId, {
        	method: 'post',
        	headers:authHeader,
			body: JSON.stringify({
				squad: squadPids,
				seriesId: seriesId
			})
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) =>  dispatch(submitTeamSuccess(true)))
            .catch((e) => {
                dispatch(submitTeamErrored(true, e))
            });
    };
}