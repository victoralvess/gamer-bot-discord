require('dotenv').config();

const Discord = require('discord.js');
const discord = new Discord.Client();

const commands = require('./commands');


discord.on('ready', () => {
	console.log('I am ready!');
});

discord.on('message', (message) => {

	if (message.content.startsWith('!')) {
		const command = message.content.slice(1).toLowerCase();
		
		if (commands[command]) {
			commands[command](message.channel);
		}

	}
	
	return;
	
});


discord.login(process.env.DISCORD_BOT_TOKEN);