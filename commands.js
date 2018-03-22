// const Discord = require('discord.js');

const _igdb = require("igdb-api-node").default;
const igdb = _igdb(process.env.IGDB_API_KEY);

/**
	@param {TextChannel} channel
	@returns A random game
*/
function getRandomGame(channel) {
	const limit = 30;
	igdb
		.games(
			{
				fields: "id",
				limit,
				order: "popularity:desc&total_rating_count:desc&rating:desc",
				search:
					Math.round(Math.random() * 5000) + Math.round(Math.random() * limit)
			},
			["name"]
		)
		.then(({ body }) => {
			channel.send(
				`I think this is a good option: ${
					body[Math.round(Math.random() * body.length)].name
				}. Play it or not.`
			);
		})
		.catch(error => {
			channel.send("An error occurred.\n" + error);
		});
}

/**
	@param {string} name
	@param {TextChannel} channel
	@returns A game
*/
function getGameByName(name, channel) {
	igdb
		.games(
			{
				fields: "name",
				limit: 1,
				search: name
			},
			["name", "rating", "first_release_date"]
		)
		.then(({ body }) => {
			console.log(body);
			const isGood = body[0].rating >= 80;

			channel.send(
				`I found ${body[0].name}. I think that is a ${
					isGood ? "good" : "bad"
				} game.`
			);
		});
}

const commands = {
	random: getRandomGame,
	name: getGameByName
};

module.exports = commands;
