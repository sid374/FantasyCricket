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
