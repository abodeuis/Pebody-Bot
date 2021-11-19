// External Package Requirements
const fs = require('fs');
// Internal Files
const sendMessage = require('./send-message');
const Client = require('./client.js');
const CommandMap = require('./commandMap.js');

// Load Config
const { prefix, } = require('./config.json');

// Load global variables
const client = Client.Singleton.getInstance();
const command_map = CommandMap.Singleton.getInstance();

// Main Function. Activates whenever a message is posted in any channel it has access to
client.on('messageCreate', async message => {
    // Ignore non commands and bots
  	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
  	const args = message.content.slice(prefix.length).trim().split(' ');
  	const msg_command = args.shift().toLowerCase();

    // Log message in console
	const timestamp = new Date(message.createdTimestamp);
	console.log(`[${message.guild} : ${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}] ${message.member.displayName} issued command ${msg_command}`);
	console.log(`Full Message : ${message.content}`);

	try {
		// Check for command in map
		if (command_map.has(msg_command)){
			// Get command
			cmd = command_map.get(msg_command)

			// Check requirements for using the command
			if (typeof cmd.requirements !== 'undefined'){
				// User in voice
				if (cmd.requirements.includes('user_in_voice_channel')){
					if (!message.member.voice.channel){
						sendMessage(message.channel, `You need to be in a voice channel to use ${msg_command} command!`, 30)
						return;
					}
				}
			}

			// Execute the command
			cmd.execute(message)
		}
		else {
			// Command wasn't in Map
			sendMessage(message.channel, "You entered my command prefix, but i don't recognize the command", -1)
		}
	}
	// General Error catch so that the bot doesn't crash
	catch (err) {
		console.log(message, `ERROR : ${err}`)
		// Default message
		sendMessage(message.channel, `ERROR : ${err} \n Well thats not good :(`, -1)
	}
})

// Console Logs
client.once('ready', () => {
 const timestamp = new Date();
 console.log(`[${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}] Logged In!`);
});
client.once('reconnecting', () => {
 console.log('Reconnecting!');
});
client.once('disconnect', () => {
 console.log('Disconnect!');
});