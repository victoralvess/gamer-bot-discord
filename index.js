require("dotenv").config();

const Discord = require("discord.js");
const discord = new Discord.Client();

const commands = require("./commands");

discord.on("ready", () => {
	console.log("I am ready!");
});

discord.on("message", message => {
	const { channel, content } = message;
	if (content.startsWith("!")) {
		if (content.startsWith("!name=")) {
			const name = content.slice(6);
			console.log(name);
			return commands["name"](name, channel);
		} else if (content === "!random") {
			return commands["random"](channel);
		}

		return channel.send(`Sorry, I can't recognize this command.`);
	}
	
});

discord.login(process.env.DISCORD_BOT_TOKEN);
