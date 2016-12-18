const defaultState = [{
            playerName: "Virat Kohli",
            cost: 1200000,
            pid: 1
        }];

const Team = (state = [], action) => {
	switch(action.type){
		case 'ADD_PLAYER':
			console.log("Team Reducer adding player to team!" + action.player);
			return [
				...state,
				action.player];
		case 'REMOVE_PLAYER':
			console.log("Team Reducer removing player from team!");
			return state.filter((playerObj) => {return playerObj.pid != action.player.pid})
		default:
			console.log("Team Reducer returning default team");
			return state;
	}
}

export default Team