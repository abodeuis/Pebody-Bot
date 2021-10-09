// Requirements
const fs = require('fs');
const myDistube = require('./myDistube.js')
const clients = myDistube.distubeSingleton.getInstance()
const client = clients[0]
const distube = clients[1]

// Internal Files
const sendMessage = require('./send-message')

// Config
const {prefix,token,} = require('./config.json');
const { send } = require('process');

// Load Commands from commands directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const command_map = new Map();
for (const file of commandFiles){
	const cmd = require(`./commands/${file}`);
	for (i = 0; i < cmd.name.length; i++){
		console.log(cmd.name)
		command_map.set(cmd.name[i], cmd)
	}
}

// Add help command here as it needs access to the command_map and i dont know how to scope that correctly
const help_wrapper = {
	name : ['help'],
    desc : 'Provides Usage information about the avaliable commands',
    help : 'Example usage \`{prefix}help\`', // Replace prefix later
    execute(message) {
		const args = message.content.slice(prefix.length).trim().split(' ')

		if (args.length < 2){
			sendMessage(message.channel,`Default help message`, -1)
		}
		else {
			try {
				if (command_map.has(args[1])){
					cmd_func = command_map.get(args[1])
					sendMessage(message.channel,`${cmd_func.desc}\n${cmd_func.help}`, -1)
				}
				else {
					sendMessage(message.channel,`${args[1]} is not a command`)
				}
			}
			catch (err) {
				console.log(message, `ERROR : ${err}`)
				// Default m essage
				sendMessage(message.channel, `ERROR : ${err} \n Well thats not good :(`, -1)
			}
		}
	}
}
command_map.set('help', help_wrapper)

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
			cmd_func.execute(message)
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

// ##### Utility Functions #####
function log(message, string){
  const timestamp = new Date(message.createdTimestamp)
  console.log(`[${message.guild} : ${timestamp.toLocaleDateString()} ${timestamp.toLocaleTimeString()}] ${string}`)
  console.log(`Full Message : ${message.content}`)
}

// Console Logs
client.once('ready', () => {
 console.log(`Ready with ${command_map.size} commands loaded :`)
 for (const [key, value] of command_map.entries()) {
	 console.log(`\t${key}`)
 }
 console.log('Logged In!');
});
client.once('reconnecting', () => {
 console.log('Reconnecting!');
});
client.once('disconnect', () => {
 console.log('Disconnect!');
});