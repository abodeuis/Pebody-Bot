const { Client, Intents } = require('discord.js');
const DisTube = require('distube')
const SoundCloudPlugin = require('@distube/soundcloud')
const SpotifyPlugin = require('@distube/spotify')
const {
	prefix,
	token,
} = require('./config.json');

const client = new Client({intents: ["GUILDS", 'GUILD_VOICE_STATES', "GUILD_MESSAGES"]});
// Connect to discord
client.login(token);
const distube = new DisTube.default(client)

const queue = new Map();

client.on('messageCreate', async message => {
  	if (!message.content.startsWith(prefix) || message.author.bot) return;
  	const args = message.content.slice(prefix.length).trim().split(' ')
  	const command = args.shift().toLowerCase()

  	if (command === 'ping'){
  		pong(message);
  		return;
  	} else if (command === 'echo'){
  		echo(message);
  		return;
  	} else if (command === 'play'){
  		distube.play(message, args.join(' '))
  	} else if (command === 'stop'){
  		distube.stop(message)
  	} else if (command === 'resume'){
  		distube.resume(message)
	} else if (command === 'pause'){
		distube.pause(message)
	} else if (command === 'skip'){
		distube.skip(message)
  	} else if (command === 'seek'){
  		time = timestampTomillisec(args[0])
  		console.log(`Arg 1 :${time}`)

		distube.seek(message, timestampTomillisec(args[0]))
  	} else {
  		message.channel.send("You entered my command prefix, but i don't recognize the command");
  		return;
  	}
})

function timestampTomillisec(timestring){
	const peices = timestring.split(':');
	var minutes = Number(peices[0]);
	var seconds = Number(peices[1]); 
	return ((minutes*60 + seconds)*1);
}

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

function pong(message){
	message.channel.send("Pong");
	return;
}
function ping(message){
	message.channel.send("Ping");
	return;
}
function echo(message){
	message.channel.send(message.content);
	return;
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