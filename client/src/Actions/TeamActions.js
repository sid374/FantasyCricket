export const addPlayerToTeam = (player) => {
	return{
		type: 'ADD_PLAYER',
		player
	};
};

export const removePlayerFromTeam = (player) => {
	return{
		type: 'REMOVE_PLAYER',
		player
	};
}
