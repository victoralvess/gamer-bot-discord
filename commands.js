// const Discord = require('discord.js');

const _igdb = require('igdb-api-node').default;
const igdb = _igdb(process.env.IGDB_API_KEY);

/**
	@param {TextChannel} channel
	@returns A random game
*/
function getRandomGame(channel) {
	igdb.games({
		fields: '*',
		limit: 1
	}).then((response) => {
		channel.send('Game');
	}).catch((error) => {
		channel.send('An error occurred.\n' + error);
	});
}

const commands = {
	'any': getRandomGame
};

module.exports = commands;