// Requirements
const { Client, Intents } = require('discord.js');
const DisTube = require('distube')
const SoundCloudPlugin = require('@distube/soundcloud')
const SpotifyPlugin = require('@distube/spotify')
const sendMessage = require('./send-message')

// Config
const {
	prefix,
	token,
} = require('./config.json');

// Connect to discord
const client = new Client({intents: ["GUILDS", 'GUILD_VOICE_STATES', "GUILD_MESSAGES"]});
client.login(token);
const distube = new DisTube.default(client)

const command_map = new Map();

// Populate Commands
{
	command_map.set("ping",ping)
	command_map.set("pong",pong)
	command_map.set("echo",echo)
	command_map.set("play",playwrapper)
	command_map.set("stop",stopwrapper)
	command_map.set("skip",skipwrapper)
	command_map.set("pause",pausewrapper)
	command_map.set("resume",resumewrapper)
	command_map.set("seek",seekwrapper)
}

const queue = new Map();

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
		cmd_func = command_map.get(msg_command)
		cmd_func(message)
	}
	catch (err) {
		console.log(message, `ERROR : ${err}`)
		// Default message
		sendMessage(message.channel, "You entered my command prefix, but i don't recognize the command or some other unknown error occured :(", -1)
	}
})

// ##### Command Functions #####
function pong(message){
	sendMessage(message.channel, "Pong", 10)
	return;
}
function ping(message){
	sendMessage(message.channel, "Ping", 10)
	return;
}
function echo(message){
	const args = message.content.slice(prefix.length).trim().split(' ')
  	const msg_command = args.shift().toLowerCase()
	sendMessage(message.channel, args.join(' '), 10)
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

/*
async function play_request(message, serverQueue){
	const args = message.content.split(" ");

	const voiceChannel = message.member.voice.channel;
	if(!voiceChannel)
		 return message.channel.send(
      		"You need to be in a voice channel to play music!"
    	);
    const permissions = voiceChannel.permissionsFor(message.client.user);
  	if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    	return message.channel.send(
      		"I need the permissions to join and speak in your voice channel!"
    	);
  	}

  	const songInfo = await ytdl.getInfo(args[1]);
  	const song = {
    	title: songInfo.title,
    	url: songInfo.video_url
  	};

  	message.channel.send(`you wanted to play ${song.url}`)
  	return;
}
*/

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