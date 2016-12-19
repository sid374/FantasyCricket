const defaultState = [{
            playerName: "Virat Kohli",
            cost: 1200000,
            pid: 1
        }];

const Team = (state = [], action) => {
	switch(action.type){
		case 'ADD_PLAYER':
			return [
				...state,
				action.player];
		case 'REMOVE_PLAYER':
			return state.filter((playerObj) => {return playerObj.pId != action.player.pId})
		default:
			return state;
	}
}

export default Team