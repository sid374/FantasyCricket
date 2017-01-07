
// state is a dictionary of arrays with seriesId as key
//so state[seriesId0] = [], state[seriesI]
const Team = (state = {}, action) => {
	let newState = {...state};
	switch(action.type){
		case 'ADD_PLAYER':
			//if we already have the userTeam created then simply append to the array else create an array
			if(action.seriesId in newState){
				newState[action.seriesId].push(action.player);
			}
			else{
				newState[action.seriesId] = [action.player];
			}
			return newState;
		case 'REMOVE_PLAYER':
			newState[action.seriesId] = newState[action.seriesId].filter((playerObj) => {return playerObj.pId !== action.player.pId})
			return newState;
		default:
			return state;
	}
}

// const Team = (state = [], action) => {
// 	switch(action.type){
// 		case 'ADD_PLAYER':
// 			return [
// 				...state,
// 				action.player];
// 		case 'REMOVE_PLAYER':
// 			return state.filter((playerObj) => {return playerObj.pId !== action.player.pId})
// 		default:
// 			return state;
// 	}
// }


export default Team