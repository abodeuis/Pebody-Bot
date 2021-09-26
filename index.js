// Requirements
const { Client, Intents } = require('discord.js');
const DisTube = require('distube')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { SpotifyPlugin } = require('@distube/spotify')
const sendMessage = require('./send-message')

// Config
const {
	prefix,
	token,
} = require('./config.json');

// Connect to discord
const client = new Client({intents: ["GUILDS", 'GUILD_VOICE_STATES', "GUILD_MESSAGES"]});
client.login(token);
const distube = new DisTube.default(client,{
	emitNewSongOnly: true,
	plugins: [new SpotifyPlugin(), new SoundCloudPlugin()],
	/* // If you want more then a 100 spotify songs at once you need to sign in with a client id
	plugins: [new SpotifyPlugin({
		parallel : true,
		api : {
			clientId: "",
			clientSecret: "",
		}
	})],
	*/
});

// Populate Commands
const command_map = new Map();
{
	command_map.set("ping",ping)
	command_map.set("pong",pong)
	command_map.set("echo",echo)
	command_map.set("p",playwrapper)
	command_map.set("play",playwrapper)
	command_map.set("stop",stopwrapper)
	command_map.set("skip",skipwrapper)
	command_map.set("pause",pausewrapper)
	command_map.set("resume",resumewrapper)
	command_map.set("seek",seekwrapper)
}

// Check every message for commands
client.on('messageCreate', async message => {
    // Ignore non commands and bots
  	if (!message.content.startsWith(prefix) || message.author.bot) return;
    
  	const args = message.content.slice(prefix.length).trim().split(' ')
  	const msg_command = args.shift().toLowerCase()

    // Log command in console
    log(message, `${message.member.displayName} issued command ${msg_command}`)

	// Check for command in map
	try {
		if (command_map.has(msg_command)){
			cmd_func = command_map.get(msg_command)
			cmd_func(message)
		}
		else {
			sendMessage(message.channel, "You entered my command prefix, but i don't recognize the command", -1)
		}
	}
	catch (err) {
		console.log(message, `ERROR : ${err}`)
		// Default m essage
		sendMessage(message.channel, `ERROR : ${err} \n Well thats not good :(`, -1)
	}
})

// ##### Command Functions #####
function pong(message){
	sendMessage(message.channel, "Pong", 30)
	return;
}
function ping(message){
	sendMessage(message.channel, "Ping", 30)
	return;
}
function echo(message){
	const args = message.content.slice(prefix.length).trim().split(' ')
  	const msg_command = args.shift().toLowerCase()
	sendMessage(message.channel, args.join(' '), -1)
	return;
}

function playwrapper(message){
	const args = message.content.slice(prefix.length).trim().split(' ')
  	const msg_command = args.shift().toLowerCase()
	distube.play(message, args.join(' '))
}

function stopwrapper(message){
	distube.stop(message)
}

function skipwrapper(message){
	distube.skip(message)
}

function pausewrapper(message){
	distube.pause(message)
}

function resumewrapper(message){
	distube.resume(message)
}

function seekwrapper(message){
	const args = message.content.slice(prefix.length).trim().split(' ')
  	const msg_command = args.shift().toLowerCase()
	time = timestampToSec(args[0])
	distube.seek(message, timestampToSec(args[0]))
}

// ##### Utility Functions #####
function log(message, string){
  const timestamp = new Date(message.createdTimestamp)
  console.log(`[${message.guild} : ${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}] ${string}`)
  console.log(`Full Message : ${message.content}`)
}

function timestampToSec(timestring){
	const peices = timestring.split(':');
	var minutes = Number(peices[0]);
	var seconds = Number(peices[1]); 
	return (minutes*60 + seconds);
}

// Console Logs
client.once('ready', () => {
 console.log('Logged In!');
});
client.once('reconnecting', () => {
 console.log('Reconnecting!');
});
client.once('disconnect', () => {
 console.log('Disconnect!');
});